'use client'
import React from 'react'
import Image from 'next/image';
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';

export const dynamic = "force-dynamic";

interface FlashCard {
    front: string;
    back: string;
    notes: string;
    imageFront: string;
    imageBack: string;
}

export default function Deck() {
    const { id } = useParams();
    const [cards, setCards] = useState<FlashCard[]>([]);
    const [cardsIndex, setCardsIndex] = useState(0);
    const router = useRouter();
    
    useEffect(() => {
        const fetchDecks = async (userId: string, deckId: string) => {
            try {
                const userDocRef = doc(db, "users", userId, "flashcards", deckId);
                const snapshot = await getDoc(userDocRef);
                console.log(id);
                console.log(userDocRef.path);
                
                if (snapshot.exists()) {
                    const deckData = snapshot.data();
                    setCards(deckData.cards || []);
                    console.log("Catching cards for ", userId)
                }
            } catch (error) {
                console.log(error);
            }
        }

        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                fetchDecks(currentUser.uid, id as string)
            } else {
                auth.signOut();
            }
        });

        return () => unsubscribe();
    }, [id]);



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
            <div>
                <div>
                    {cards.length > 0 ? (
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <p>{cards[cardsIndex].front}</p>
                                    {(cards[cardsIndex].imageFront) ? (
                                        <Image src={cards[cardsIndex].imageFront} alt="image" height={100} width={100} unoptimized/>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                                <div className="flip-card-back">
                                    <p>{cards[cardsIndex].back}</p>
                                    <p>{cards[cardsIndex].notes}</p>
                                    {(cards[cardsIndex].imageBack) ? (
                                        <Image src={cards[cardsIndex].imageBack} alt="image" height={100} width={100} unoptimized/>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ): (
                        <p>No Cards</p>
                    )}
                
                    <div className="cb1">
                        <button type="button" onClick={previousCard} className="ib1">Previous Card</button>
                        <button type="button" onClick={nextCard} className="ib2">Next Card</button>
                    </div>
                </div>  
                    <button onClick={() => router.push("../Pages/HomePage")}>Back Home</button>
                    <button onClick={() => router.push("../..")}>Logout</button>
            </div>
        </div>
    )
}
