"use server";
import prisma from "@/lib/prisma";

// export const onCompleteSignupPending = async (email: string, name: string) => {
//   if (!email || !name)
//     return { status: 400, message: "Please provide all the details" };
//   try {
//     const user = await prisma.user.create({
//       data: {
//         email: email,
//         name: name,
//       },
//     });
//     return { status: 200, user: user };
//   } catch (error) {
//     console.log(error);
//     return { status: 400, message: (error as Error).message };
//   }
// };

export const onCompleteUserSignUp = async (email: string) => {
  if (!email) return { status: 400, message: "Please provide your email" };
  try {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        verified: true,
        // cognitoId: sub,
      },
    });
    await prisma.subscription.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return { status: 200, user };
  } catch (err) {
    console.log(err);
    return { status: 400, message: (err as Error).message };
  }
};

export const addCognitoIdtoDb = async (email: string, cognitoId: string) => {
  try {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        cognitoId,
      },
    });
    return { status: 200, user };
  } catch (err) {
    console.log(err);
    return { status: 400, message: (err as Error).message };
  }
};
