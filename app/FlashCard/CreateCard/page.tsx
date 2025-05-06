'use client'

import React from 'react'
import { useState } from 'react';

class FlashCard {
  private front: string;
  private back: string;

  public constructor(front: string, back: string) {
    this.front = front;
    this.back = back;
  }

  public getFront() {
    return this.front;
  }

  public getBack() {
    return this.back;
  }

  public setFront(front: string) {
    this.front = front;
  }

  public setBack(back: string) {
    this.back = back;
  }
}



export default function CreateCard() {
  const [cards, setCards] = useState<FlashCard[]>([new FlashCard("", "")]);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(true);
  const [title, setTitle] = useState("")

  const saveSet = () => {

  }

  const updateFront = (input: string) => {
    const updatedCards = [...cards]
    const currentCard = cards[cardIndex]
    const updatedCard = new FlashCard(input, currentCard.getBack())
    updatedCards[cardIndex] = updatedCard
    setCards(updatedCards);
  }

  const updateBack = (input: string) => {
    const updatedCards = [...cards]
    const currentCard = cards[cardIndex]
    const updatedCard = new FlashCard(currentCard.getFront(), input)
    updatedCards[cardIndex] = updatedCard
    setCards(updatedCards)
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const createNewCard = () => {
    const newCard = new FlashCard("", "");
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
              </div>
            </div>
          ) : (
            <div className="flip-card">
              <div className="flip-card-create">
                <div className="flip-card-front">
                  <p>{cardIndex + 1}</p>
                  <h1>back</h1>
                  <input placeholder="" type="text" value={cards[cardIndex].getBack()} onChange={(e) => updateBack(e.target.value)}/>
                </div>
              </div>
            </div>
          )}
        </div>

      <button onClick={handleFlip}>Flip Card</button>
      <button onClick={createNewCard}>New Card</button>
      <button onClick={previousCard}>Previous Card</button>
      <button onClick={nextCard}>Next Card</button>
      <button>Save Cards</button>
    </div>
  )
}
