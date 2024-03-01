"use server"

import { userManager } from "@/prisma/user-manager"
import { genSaltSync, hashSync } from "bcrypt-ts"

export async function register(
  prevState:
    | {
        success: boolean
        message: string
      }
    | undefined,
  formData: FormData
) {
  try {
    let name = formData.get("name") as string
    let email = formData.get("email") as string
    let password = formData.get("password") as string

    const existingUser = await userManager.findByEmail(email)

    if (existingUser) {
      return {
        success: false,
        message: "User already exists.",
      }
    } else {
      let salt = genSaltSync(10)
      let hash = hashSync(password, salt)
      await userManager.create({ email, name, password: hash })

      return {
        success: true,
        message: "Registration successful.",
      }
    }
  } catch (error) {
    console.error("Error during registration:", error)
    return {
      success: false,
      message: "Something went wrong.",
    }
  }
}
