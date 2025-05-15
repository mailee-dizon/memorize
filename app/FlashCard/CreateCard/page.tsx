'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/app/firebase/config';
import { doc, collection, addDoc } from 'firebase/firestore';
import ImageUploader from '../components/imageUploader';

type FlashCard = {
  front: string;
  back: string;
  notes: string;
  imageFront: string;
  imageBack: string;
}



export default function CreateCard() {
  const [cards, setCards] = useState<FlashCard[]>([{front: "", back: "", notes: "", imageFront: "", imageBack: ""}]);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(true);
  const [title, setTitle] = useState("")
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser.uid)
        setLoading(false)
      } else {
        router.push("../Pages/LoginPage");
      }
    })
    return () => unsubscribe()
  }, [router])

  if (loading) return (<></>)

  if (!user) {router.push("../Pages/LoginPage")}

  const updateFront = (input: string) => {
    const updatedCards = [...cards]
    updatedCards[cardIndex] = { ...updatedCards[cardIndex], front: input}
    setCards(updatedCards);
  }

  const updateBack = (input: string) => {
    const updatedCards = [...cards]
    updatedCards[cardIndex] = { ...updatedCards[cardIndex], back: input}
    setCards(updatedCards)
  }

  const updateNotes = (notes: string) => {
    const updatedCards = [...cards]
    updatedCards[cardIndex] = { ...updatedCards[cardIndex], notes: notes}
    setCards(updatedCards)
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const createNewCard = () => {
    const newCard: FlashCard = {front: "", back: "", notes: "", imageFront: "", imageBack: ""};
    setCards([...cards, newCard])
    setCardIndex(cards.length);
    setIsFlipped(true)
  }
  
  const nextCard = () => {

    if (cardIndex === cards.length - 1) {
      setCardIndex(0)
    } else {
      setCardIndex(cardIndex + 1);
    }

    setIsFlipped(true)

  }

  const previousCard = () => {
    if (cardIndex === 0) {
      setCardIndex(cards.length - 1)
    } else {
      setCardIndex(cardIndex - 1)
    }
    setIsFlipped(true)
  }

  const saveCards = async () => {
    if (title === "") {
      console.log("must have title")
    }

    try {
      const user = auth.currentUser

      if (user !== null) {
        addDoc(collection(doc(db, "users", user.uid), "flashcards"), {title, cards: cards})
        console.log("saved")
        router.push("../Pages/HomePage")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      
      <h1>Create Cards</h1>
      <label>Deck Name: </label>
      <input placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <div className="flip-card">
          {isFlipped ? (
            <div className="flip-card-create">
              <div className="flip-card-front">
                <p>{cardIndex + 1}</p>
                <input placeholder="" type="text" value={cards[cardIndex].front} onChange={(e) => updateFront(e.target.value)}/>
                <ImageUploader userId={auth.currentUser?.uid || ""} deckId={title} value={cards[cardIndex].imageFront}
                  onUploadComplete={(url) => {
                      const updatedCard = [...cards]
                      updatedCard[cardIndex] = { ...updatedCard[cardIndex], imageFront: url}
                      setCards(updatedCard)
                  }}/>
              </div>
            </div>
          ) : (
            <div className="flip-card">
              <div className="flip-card-create">
                <div className="flip-card-front">
                  <br/>
                  <label>Back</label>
                  <input placeholder="" type="text" value={cards[cardIndex].back} onChange={(e) => updateBack(e.target.value)}/> 
                  <br/>
                  <label>Notes</label>
                  <input placeholder="" type="text" value={cards[cardIndex].notes} onChange={(e) => updateNotes(e.target.value)}/>
                  <ImageUploader userId={user} deckId={title} value={cards[cardIndex].imageBack}
                    onUploadComplete={(url) => {
                      const updatedCard = [...cards]
                      updatedCard[cardIndex] = { ...updatedCard[cardIndex], imageBack: url}
                      setCards(updatedCard)
                    }}/>
                </div>
              </div>
            </div>
          )}
        </div>

      <button onClick={handleFlip}>Flip Card</button>
      <button onClick={createNewCard}>New Card</button>
      <button onClick={previousCard}>Previous Card</button>
      <button onClick={nextCard}>Next Card</button>
      <button onClick={saveCards}>Save Cards</button>
    </div>
  )
}
