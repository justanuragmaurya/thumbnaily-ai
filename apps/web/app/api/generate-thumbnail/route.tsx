import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import db from "@repo/db";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Replicate from "replicate";
import { enhancePrompt } from "@/lib/enhancePrompt";
import { auth } from "@/lib/auth";
import { error } from "console";
import { reduceCredit } from "@/lib/credits";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({
        error: true,
        message: "unauthenticated",
      });
    }

    const user = await db.user.findFirst({
      where: {
        email: session.user.email!,
      },
    });

      if(!user){
        return NextResponse.json(
          {
            error: true,
            message: "Can not fint the user",
          })
      }
      if (user.credits <= 0) {
        return NextResponse.json(
          {
            error: true,
            message: "Insufficient credits , please recharge to continue",
          }
        );
      }

      

    const { basicPrompt, image_url } = await req.json();

    console.log("Sending for Prompt");
    const response = await enhancePrompt(basicPrompt, image_url);

    if (!response) {
      return NextResponse.json(
        { error: "Failed to generate thumbnail" },
        { status: 500 }
      );
    }

    console.log("Got the prompt Prompt");

    const { prompt } = JSON.parse(response);

    const input = {
      aspect_ratio: "16:9",
      output_format: "jpg",
      output_quality: 100,
      disable_safety_checker: true,
      prompt: prompt,
    };

    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

    const s3 = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.ACCESSKEYID!,
        secretAccessKey: process.env.SECRETACCESSKEY!,
      },
    });

    const key = `thumbnails/generations/${Math.floor(Math.random() * 1000) + Date.now().toString()}.jpeg`;

    const cmd = new PutObjectCommand({
      Bucket: "thumbnaily-storage",
      Key: key,
      ContentType: "image/jpeg",
    });

    const url = await getSignedUrl(s3, cmd);

    console.log("Sending to Replicate");
    const output = (await replicate.run(
      "bytedance/hyper-flux-8step:16084e9731223a4367228928a6cb393b21736da2a0ca6a5a492ce311f0a97143",
      { input }
    )) as string[];

    if (!output[0]) {
      throw new Error("Output URL is undefined");
    }
    console.log("Got from Replicate");

    const imageResponse = await fetch(output[0]);
    const imageBuffer = await imageResponse.arrayBuffer();

    console.log("Sending to s3");
    await axios.put(url, imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
    console.log("Sent to s3");

    const imageURL = `https://thumbnaily-storage.s3.ap-south-1.amazonaws.com/${key}`;

    console.log("saving to db");

    await db.thumbnails.create({
      data: {
        creatorID: user?.id,
        link: imageURL,
        prompt: input.prompt,
      },
    });
    
    await reduceCredit({email:user.email,cost:1});

    console.log("saving to db done");
    
    return NextResponse.json({ imageURL });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to generate thumbnail" },
      { status: 500 }
    );
  }
}
