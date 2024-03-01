"use server"

import { userManager } from "@/prisma/user-manager"
import { genSaltSync, hashSync } from "bcrypt-ts"

export async function resetPassword(
  prevState:
    | {
        success: boolean
        message: string
      }
    | undefined,
  formData: FormData
) {
  try {
    let email = formData.get("email") as string
    const existingUser = await userManager.findByEmail(email)
    if (!existingUser)
      return {
        success: false,
        message: "User does not exist",
      }

    let password = formData.get("password") as string
    let salt = genSaltSync(10)
    let hash = hashSync(password, salt)
    await userManager.update(existingUser.id, { password: hash })

    return {
      success: true,
      message: "Password reset successful.",
    }
  } catch (error) {
    console.error("Error during password reset:", error)
    return {
      success: false,
      message: "Something went wrong.",
    }
  }
}
