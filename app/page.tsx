"use client"
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to Memorize!</h1>
      <button onClick={() => router.push("LoginPage")}>Log In</button>
      <button onClick={() => router.push("SignupPage")}>Sign Up</button>
    </div>
  );
}
