-- CreateTable
CREATE TABLE "WaitlistUsers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaitlistUsers_pkey" PRIMARY KEY ("id")
);
