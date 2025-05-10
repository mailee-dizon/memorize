'use client'
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/app/firebase/config';
import { doc, collection, addDoc } from 'firebase/firestore';
import ImageUploader from '../components/imageUploader';

class FlashCard {
  private front: string;
  private back: string;
  private imageFront: string;
  private imageBack: string;

  public constructor(front: string, back: string, imageFront: string, imageBack: string) {
    this.front = front;
    this.back = back;
    this.imageFront = imageFront;
    this.imageBack = imageBack;
  }

  public getFront() {
    return this.front;
  }

  public getBack() {
    return this.back;
  }

  public getImageFront() {
    return this.imageFront;
  }

  public getImageBack() {
    return this.imageBack;
  }

  public setFront(front: string) {
    this.front = front;
  }

  public setBack(back: string) {
    this.back = back;
  }

  public setImageFront(imageFront: string) {
    this.imageFront = imageFront;
  }

  public setImageBack(imageBack: string) {
    this.imageBack = imageBack;
  }
}



export default function CreateCard() {
  const [cards, setCards] = useState<FlashCard[]>([new FlashCard("", "", "", "")]);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(true);
  const [title, setTitle] = useState("")
  const router = useRouter()

  const updateFront = (input: string) => {
    const updatedCards = [...cards]
    const currentCard = cards[cardIndex]
    const updatedCard = new FlashCard(input, currentCard.getBack(), currentCard.getImageFront(), currentCard.getImageBack())
    updatedCards[cardIndex] = updatedCard
    setCards(updatedCards);
  }

  const updateBack = (input: string) => {
    const updatedCards = [...cards]
    const currentCard = cards[cardIndex]
    const updatedCard = new FlashCard(currentCard.getFront(), input, currentCard.getImageFront(), currentCard.getImageBack())
    updatedCards[cardIndex] = updatedCard
    setCards(updatedCards)
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const createNewCard = () => {
    const newCard = new FlashCard("", "", "", "");
    setCards([...cards, newCard])
    setCardIndex(cardIndex + 1);
  }
  
  const nextCard = () => {

    if (cardIndex === cards.length - 1) {
      setCardIndex(0)
    } else {
      setCardIndex(cardIndex + 1);
    }

  }

  const previousCard = () => {
    if (cardIndex === 0) {
      setCardIndex(cards.length - 1)
    } else {
      setCardIndex(cardIndex - 1)
    }
  }

  const saveCards = async () => {
    if (title === "") {
      console.log("must have title")
    }

    try {
      const formattedCards = cards.map(card => ({
        front: card.getFront(),
        back: card.getBack(),
        imageFront: card.getImageFront(),
        imageBack: card.getImageBack()
      }))


      const user = auth.currentUser

      if (user !== null) {
        addDoc(collection(doc(db, "users", user.uid), "flashcards"), {title, cards: formattedCards})
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
                <h1>front</h1>
                <input placeholder="" type="text" value={cards[cardIndex].getFront()} onChange={(e) => updateFront(e.target.value)}/>
                <ImageUploader userId={auth.currentUser?.uid || ""} deckId={title} 
                  onUploadComplete={(url) => {
                    const updatedCards = [...cards] 
                    updatedCards[cardIndex].setImageFront(url)
                    setCards(updatedCards)
                  }}/>
              </div>
            </div>
          ) : (
            <div className="flip-card">
              <div className="flip-card-create">
                <div className="flip-card-front">
                  <p>{cardIndex + 1}</p>
                  <h1>back</h1>
                  <input placeholder="" type="text" value={cards[cardIndex].getBack()} onChange={(e) => updateBack(e.target.value)}/>
                  <ImageUploader userId={auth.currentUser?.uid || ""} deckId={title} 
                    onUploadComplete={(url) => {
                      const updatedCards = [...cards] 
                      updatedCards[cardIndex].setImageBack(url)
                      setCards(updatedCards)
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
