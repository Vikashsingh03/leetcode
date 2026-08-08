"use server";

import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: "No authenticated user found" };
    }
    const { id, firstName, lastName, imageUrl, emailAddresses } = user;
    const newUser = await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        firstName: firstName,
        lastName: lastName,
        imageUrl: imageUrl,
        email: emailAddresses[0].emailAddress || "",
      },
      create: {
        clerkId: id,
        firstName: firstName,
        lastName: lastName,
        imageUrl: imageUrl,
        email: emailAddresses[0].emailAddress || "",
      },
    });
    return { success: true, user: newUser };
  } catch (error) {
    console.error("Error occurred while onboarding user:", error);
    throw new Error("Failed to onboard user");
  }
};

export const currentUserRole = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: "No authenticated user found" };
    }
    const { id } = user;
    const userRole = await prisma.user.findUnique({
      where: { clerkId: id },
      select: { role: true },
    });
    return { success: true, role: userRole?.role };
  } catch (error) {
    console.error("Error occurred while fetching user role:", error);
  }
};

// export const currentUserData = async () => {
//   try {
//     const user = await currentUser();
//     if (!user) {
//       return { success: false, message: "No authenticated user found" };
//     }
//     const userData = await prisma.user.findUnique({
//       where: { clerkId: user.id },
//       select: { firstName: true, lastName: true, imageUrl: true, email: true },
//     })
//     return { success: true, user: userData };
//   } catch (error) {
//     console.error("Error occurred while fetching user data:", error);
//     throw new Error("Failed to fetch user data");
//   }
// };
