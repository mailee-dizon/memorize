"use client";
import React from "react";
import { useState, useEffect } from "react";
import { collectionGroup, query, where, getDocs } from "firebase/firestore"
import { db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

interface FlashCard {
    front: string;
    back: string;
    notes: string;
    imageFront: string;
    imageBack: string;
}

interface Deck {
  id: string;
  title: string;
  isPublic: boolean;
  userId: string;
  cards?: FlashCard[]
}

export default function PublicPage() {
    const [decks, setDecks] = useState<Deck[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPublicDecks = async () => {
            const q = query(
                collectionGroup(db, "flashcards"),
                where("isPublic", "==", true)
            );

            const snapshot = await getDocs(q)
            const publicDecks = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    title: data.title || "Untitled Deck",
                    isPublic: data.isPublic ?? false,
                    userId: data.userId,
                    ...data
                }
            })

            setDecks(publicDecks)
        }

        fetchPublicDecks()
    }, [])

    const backHome = () => {
        router.push("../")
    }

    return (
        <div>
        <h1>Flashcards</h1>
        {decks.length > 0 ? (
          decks.map((deck) => {
            return(
                <div key={deck.id}>
                    <button onClick={() => router.push(`/FlashCard/${deck.id}?user=${deck.userId}`)}>{deck.title}</button> <br/>
                </div>
            );
          })
        ): (
            <div>
                <p>No Decks</p>
            </div>
        )}
        <button onClick={backHome}>Back Home</button>
      </div>
    )
}