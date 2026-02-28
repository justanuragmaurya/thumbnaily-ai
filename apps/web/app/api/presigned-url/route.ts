import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

const getR2Config = () => {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME;
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicBaseUrl) {
    throw new Error(
      "Missing one or more R2 env vars: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_BASE_URL"
    );
  }

  return {
    bucketName,
    publicBaseUrl: publicBaseUrl.replace(/\/+$/, ""),
    client: new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      forcePathStyle: true,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    }),
  };
};

export async function POST(request: NextRequest) {
  try {
    const { client, bucketName, publicBaseUrl } = getR2Config();
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
      Bucket: bucketName,
      Key: key, 
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(client, cmd, { expiresIn: 3600 });
    const fileUrl = `${publicBaseUrl}/${key}`;

    return NextResponse.json({ signedUrl, fileUrl, key });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json({ 
      error: 'Failed to generate presigned URL', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}