"use client"
import { useRouter } from "next/navigation";
import { HomeFlashcard } from "./FlashCard/components/Flashcard";

export default function Home() {
  const router = useRouter();
  
  return (
    <div>
      <h1 style={{textAlign: "center"}}>Welcome to Memorize!</h1>
        <div className="flip-card-home">
          <HomeFlashcard front="Create. Study. Practice" back="Create your own digitial flashcards so you can study on the go."/>
        </div>
      <h3 style={{textAlign: "center"}}>Sign Up and Start Studying Here</h3>
      <button style={{display: "block", margin: "auto"}} onClick={() => {router.push("./Pages/SignupPage")}}>Sign Up!</button>
    </div>
  );
}
