import Link from "next/link";

export default function Login() {
  return (
    <main>
      <div>Login Form</div>
      <div>
        <Link href="/register">register</Link>
        <Link href="/reset-password">reset password</Link>
      </div>
    </main>
  );
}
