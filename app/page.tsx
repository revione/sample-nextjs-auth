import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <Link
          href="/login"
          className="block mb-4 text-blue-500 hover:underline"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="block mb-4 text-blue-500 hover:underline"
        >
          Register
        </Link>
        <Link
          href="/reset-password"
          className="block text-blue-500 hover:underline"
        >
          Reset Password
        </Link>
      </div>
    </main>
  );
}
