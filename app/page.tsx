"use client"
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to Memorize!</h1>
      <button onClick={() => router.push("Pages/LoginPage")}>Log In</button>
      <button onClick={() => router.push("Pages/SignupPage")}>Sign Up</button>
      <button onClick={() => router.push("Pages/PublicPage")}>Public Decks</button>
    </div>
  );
}
