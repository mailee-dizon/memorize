"use client"
import { useRouter } from "next/navigation";
import Flashcard from "./FlashCard/components/Flashcard";

export default function Home() {
  const router = useRouter();
  const cardsIndex = 0;

  const cards = [<Flashcard front="Create. Study. Practice" back="Create your own digitial flashcards so you can study on the go." notes="" imageFront="" imageBack=""/>, 
                 <Flashcard front="" back="" notes="" imageFront="" imageBack=""/>]
  
  return (
    <div>
      <h1 style={{textAlign: "center"}}>Welcome to Memorize!</h1>
      <div style={{display: "flex"}}>
        <button style={{backgroundColor: "darkolivegreen", margin: "auto", marginLeft: "5px", border: "none", color: "white", fontSize: "30px", height: "50px", width: "50px", flexShrink: "30", textAlign: "center"}} type="button" onClick={previousCard} className="ib1">&#8592;</button>
        {cards[cardsIndex]}
        <button style={{backgroundColor: "darkolivegreen", margin: "auto", marginRight: "5px", border: "none", color: "white", fontSize: "30px", height: "50px", flexShrink: "30", textAlign: "center"}} type="button" onClick={nextCard} className="ib2">&#8594;</button>
    </div>
      <h2 style={{textAlign: "center"}}>Create. Study. Practice</h2>
      <h3 style={{textAlign: "center"}}>Sign Up and Start Studying Here</h3>
      <button style={{display: "block", margin: "auto"}} onClick={() => {router.push("./Pages/SignupPage")}}>Sign Up!</button>
    </div>
  );
}
