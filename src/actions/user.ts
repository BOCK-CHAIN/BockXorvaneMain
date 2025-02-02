"use server";
import prisma from "@/lib/prisma";
import { s3 } from "@/utils/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const fetchCurrentUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        verified: true,
        profileImage: true,
        cognitoId: true,
        subscription: {
          select:{
            plan: true,
            startDate: true,
            expiryDate: true,
            transaction:{
              select:{
                paymentId: true,
                orderId: true,
                amount: true,
                createdAt: true,
              },
            }
          }
        },
        transactions:{
          select:{
            paymentId: true,
            orderId: true,
            amount: true,
            createdAt: true,
          },
          take: 5,
        },
        webBuild: true,
        autoWork: true,
        workMan: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateName = async (name: string, email: string) => {
  try {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
      },
    });
    return { user };
  } catch (error) {
    console.log(error);
    return { error: (error as Error).message };
  }
};

export async function uploadToS3(fileType: string, id: string) {
  const allowedImageTypes = [
    "png",
    "jpg",
    "jpeg",
    "webp",
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp",
  ];
  if (!allowedImageTypes.includes(fileType)) {
    console.error("Invalid file type");
    return null;
  }
  try {
    const s3Command = new PutObjectCommand({
      Key: `profile/${id}`,
      Bucket: process.env.AWS_BUCKET_NAME,
      ContentType: fileType,
    });
    const signedUrl = await getSignedUrl(s3, s3Command);

    return signedUrl;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const updateUserProfileImage = async (
  email: string,
  profileImage: string
) => {
  try {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        profileImage,
      },
    });
    return { user };
  } catch (error) {
    console.log(error);
    return { error: (error as Error).message };
  }
};

export const removeProfileImage = async (id: string) => {
  try {
     await prisma.user.update({
      where: {
        id,
      },
      data: {
        profileImage: null,
      },
    });
    return { status: 200 };
  } catch (error) {
    console.log(error);
    return { status: 400, error: (error as Error).message };
  }
};
