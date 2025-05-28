import db from "@repo/db";                                    
import axios from "axios";                                    
import { z } from "zod/v4";                                  
import dotenv from "dotenv";                                 
import Replicate from "replicate";                           
import { inputType } from "@repo/types";                     
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

/**
 * Generates a thumbnail image based on provided prompt data
 * 
 * @param data - Input data containing prompt for image generation
 * @returns Object with success status and generated image URL or empty data on failure
 */
export async function generateThumbnail(data: z.infer<typeof inputType>){
  try {
    // Validate the input data against the defined schema
    const x = inputType.safeParse(data);

    // Return error response if validation fails
    if (!x.success) {
      return {
        success: false,
        data: {},
      };
    }

    // Initialize Replicate AI client with API token
    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

    // Initialize AWS S3 client with credentials
    const s3 = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.ACCESSKEYID!,            // AWS access key from env vars
        secretAccessKey: process.env.SECRETACCESSKEY!,    // AWS secret key from env vars
      },
    });

    // Generate a unique key for the thumbnail using timestamp
    const key = `thumbnails/generations/${Date.now().toString()+Math.floor(Math.random()*1000)}.jpeg`;

    // Create S3 put object command for storing the image
    const cmd = new PutObjectCommand({
      Bucket: "thumbnaily-storage",                      // Target S3 bucket name
      Key: key,                                          // Object key (file path)
      ContentType: "image/jpeg",                         // File content type
    });

    // Generate a pre-signed URL to allow temporary write access to S3
    const url = await getSignedUrl(s3, cmd);

    // Run the AI model to generate the thumbnail image
    const output = (await replicate.run(
      "bytedance/hyper-flux-8step:16084e9731223a4367228928a6cb393b21736da2a0ca6a5a492ce311f0a97143",
      {
        input: {
          aspect_ratio: "16:9",                          // Standard widescreen aspect ratio
          output_format: "jpg",                          // Output image format
          output_quality: 100,                           // Maximum image quality
          disable_safety_checker: true,                  // Bypass content safety filtering
          prompt: x.data.prompt,                         // User-provided text prompt for image generation
        },
      }
    )) as string[];

    // Verify that the model returned an output URL
    if (!output[0]) {
      throw new Error("Output URL is undefined");
    }

    // Fetch the generated image from the model's output URL
    const imageResponse = await fetch(output[0]);
    const imageBuffer = await imageResponse.arrayBuffer();

    // Upload the image data to S3 using the pre-signed URL
    await axios.put(url, imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",                    // Set content type for the upload
      },
    });

    // Construct the final public URL for the uploaded image
    const imageURL = `https://thumbnaily-storage.s3.ap-south-1.amazonaws.com/${key}`;

    // Store thumbnail metadata in the database
    await db.thumbnails.create({
      data: {
        creatorID: "cmb387bn60000jzcew55pblcs",          // Hardcoded creator ID (could be improved)
        link: imageURL,                                  // Public URL to the generated image
        prompt: x.data.prompt,                           // Store original prompt for reference
      },
    });

    // Return success response with the generated image URL
    return {
      success: true,
      data: {
        imageURL: imageURL,
      },
    };
  } catch (e) {
    // Return error response if any operation fails
    return {
      success: false,
      data: {},
    };
  }
}