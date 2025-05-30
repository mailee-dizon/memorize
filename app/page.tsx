"use client"
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Welcome to Memorize!</h1>
      <h2 style={{textAlign: "center"}}>Create. Study. Practice</h2>
      <h3 style={{textAlign: "center"}}>Sign Up and Start Studying Here</h3>
      <button style={{display: "block", margin: "auto"}} onClick={() => {router.push("./Pages/SignupPage")}}>Sign Up!</button>
    </div>
  );
}
