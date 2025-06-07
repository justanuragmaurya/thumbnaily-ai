import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESSKEYID!,
    secretAccessKey: process.env.SECRETACCESSKEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType } = await request.json();
    
    if (!fileName || !fileType) {
      return NextResponse.json({ error: 'fileName and fileType are required' }, { status: 400 });
    }

    // Get proper file extension from fileType or fileName
    const getFileExtension = (fileName: string, fileType: string) => {
      if (fileType.includes('jpeg') || fileType.includes('jpg')) return 'jpeg';
      if (fileType.includes('png')) return 'png';
      if (fileType.includes('webp')) return 'webp';
      if (fileType.includes('gif')) return 'gif';
      
      // Fallback to fileName extension
      const ext = fileName.split('.').pop()?.toLowerCase();
      return ext || 'jpeg';
    };

    const fileExtension = getFileExtension(fileName, fileType);
    const key = `thumbnails/uploads/${Math.floor(Math.random() * 1000) + Date.now().toString()}.${fileExtension}`;
    
    const cmd = new PutObjectCommand({
      Bucket: "thumbnaily-storage",
      Key: key, 
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
    const fileUrl = `https://thumbnaily-storage.s3.ap-south-1.amazonaws.com/${key}`;

    return NextResponse.json({ signedUrl, fileUrl, key });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json({ 
      error: 'Failed to generate presigned URL', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}