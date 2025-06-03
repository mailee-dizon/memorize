'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/app/firebase/config';
import { useRouter, useSearchParams } from 'next/navigation';
import Flashcard from '../components/Flashcard';

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
    const [title, setTitle] = useState("");
    const router = useRouter();

    const [resolvedUserId, setResolvedUserId] = useState<string | null>(null);
    const searchParams = useSearchParams();

     useEffect(() => {
        const queryUserId = searchParams.get("user");
        console.log("Retrieved user param:", queryUserId);

        if (queryUserId) {
        setResolvedUserId(queryUserId);
        } else {
        // Fallback to current auth user
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
            setResolvedUserId(user.uid);
            } else {
            auth.signOut();
            }
        });
        return () => unsubscribe();
        }
    }, [searchParams]);
    
    useEffect(() => {
        if (!resolvedUserId || !id) return;

        const fetchDecks = async () => {
                console.log("Search param resovledUserId:", resolvedUserId);
                console.log("Route param id:", id);

                 
            try {
                const userDocRef = doc(db, "users", resolvedUserId, "flashcards", id as string);
                const snapshot = await getDoc(userDocRef);

                console.log(userDocRef.path);
                
                if (snapshot.exists()) {
                    const deckData = snapshot.data();
                    setCards(deckData.cards || []);
                    setTitle(deckData.title);
                    console.log("Catching cards for ", resolvedUserId)
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchDecks();

    }, [id, resolvedUserId]);



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

    /*
    <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        {(cards[cardsIndex].imageFront) && cards[cardsIndex].front === "" ? (
                                            <div className="imageOnly">
                                                <Image src={cards[cardsIndex].imageFront} alt="image" layout="fill" objectFit="contain" unoptimized/>
                                            </div>
                                        ) : cards[cardsIndex].imageFront ? (
                                            <div className="wordsAndImage">
                                                <p>{cards[cardsIndex].front}</p>
                                                <Image src={cards[cardsIndex].imageFront} alt="image" width={200} height={200} objectFit="contain" unoptimized/>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>{cards[cardsIndex].front}</p>
                                            </div>
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
    */

    return (
        <div>
            <div>
                <div>

                    <h2 style={{textAlign: "center"}}>{title}</h2>
                    
                    {cards.length > 0 ? (
                        <div style={{display: "flex"}}>
                            <button style={{backgroundColor: "darkolivegreen", margin: "auto", marginLeft: "5px", border: "none", color: "white", fontSize: "30px", height: "50px", width: "50px", flexShrink: "30", textAlign: "center"}} type="button" onClick={previousCard} className="ib1">&#8592;</button>
                            <Flashcard 
                                front={cards[cardsIndex].front} 
                                back={cards[cardsIndex].back} 
                                notes={cards[cardsIndex].notes} 
                                imageFront={cards[cardsIndex].imageFront} 
                                imageBack={cards[cardsIndex].imageBack}
                            />
                            <button style={{backgroundColor: "darkolivegreen", margin: "auto", marginRight: "5px", border: "none", color: "white", fontSize: "30px", height: "50px", flexShrink: "30", textAlign: "center"}} type="button" onClick={nextCard} className="ib2">&#8594;</button>
                        </div>
                    ): (
                        <p>No Cards</p>
                    )}
                    
                </div>  
                    <button onClick={() => router.push("../Pages/HomePage")}>Back Home</button>
            </div>
        </div>
    )
}
