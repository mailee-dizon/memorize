"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HomeFlashcard } from "./FlashCard/components/Flashcard";

export default function Home() {
  const router = useRouter();
  const [cardsIndex, setCardsIndex] = useState(0);

  const cards = [<HomeFlashcard front="Create. Study. Practice" back="Create your own digitial flashcards so you can study on the go."/>, 
                 <HomeFlashcard front="" back=""/>]
  const previousCard = () => {
    if (cardsIndex === 0) {
            setCardsIndex(cards.length - 1);
        } else {
            setCardsIndex(cardsIndex - 1);
        }
  }
  const nextCard = () => {
      if (cardsIndex === cards.length - 1) {
          setCardsIndex(0);
      } else {
          setCardsIndex(cardsIndex + 1);
      }
  }
  
  return (
    <div>
      <h1 style={{textAlign: "center"}}>Welcome to Memorize!</h1>
      <div style={{display: "flex",  width: "50%", aspectRatio: "3/2", margin: "auto"}}>
        <button style={{backgroundColor: "darkolivegreen", margin: "auto", marginLeft: "5px", border: "none", color: "white", fontSize: "30px", height: "50px", width: "50px", flexShrink: "30", textAlign: "center"}} type="button" onClick={previousCard} className="ib1">&#8592;</button>
        <div className="flip-card-home">{cards[cardsIndex]}</div>
        <button style={{backgroundColor: "darkolivegreen", margin: "auto", marginRight: "5px", border: "none", color: "white", fontSize: "30px", height: "50px", flexShrink: "30", textAlign: "center"}} type="button" onClick={nextCard} className="ib2">&#8594;</button>
      </div>
      <h3 style={{textAlign: "center"}}>Sign Up and Start Studying Here</h3>
      <button style={{display: "block", margin: "auto"}} onClick={() => {router.push("./Pages/SignupPage")}}>Sign Up!</button>
    </div>
  );
}
