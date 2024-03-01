"use client"

import Link from "next/link"
import { useFormState } from "react-dom"
import { resetPassword } from "@/app/actions/reset-password"
import { SubmitButton } from "@/app/ui/SubmitButton"

export default function ResetPassword() {
  const [info, dispatch] = useFormState(resetPassword, undefined)

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Reset password</h3>
          <p className="text-sm text-gray-500">
            Reset your password by providing your email and creating a new
            password.
          </p>
        </div>

        {typeof info?.success === "boolean" && (
          <div
            className="flex h-8 items-end space-x-1 justify-center"
            aria-live="polite"
            aria-atomic="true"
          >
            <>
              <p
                className={`text-sm  ${
                  info?.success ? "text-green-500" : "text-red-500"
                }`}
              >
                {info?.message}
              </p>
            </>
          </div>
        )}

        <form
          action={dispatch}
          className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16 mb-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-xs text-gray-600 uppercase"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="user@acme.com"
              autoComplete="email"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="*********"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>

          <SubmitButton>Reset password</SubmitButton>
        </form>

        <div className="flex flex-col gap-3 mb-8 text-center text-sm text-gray-600">
          <p>
            {"Do you have an account? "}
            <Link href="/login" className="font-semibold text-gray-800">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
