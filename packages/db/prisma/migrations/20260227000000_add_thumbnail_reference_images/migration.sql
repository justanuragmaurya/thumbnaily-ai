-- CreateTable
CREATE TABLE "ThumbnailReferenceImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnailId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ThumbnailReferenceImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ThumbnailReferenceImage" ADD CONSTRAINT "ThumbnailReferenceImage_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Thumbnails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
