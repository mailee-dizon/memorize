"use client";
import React from "react";
import { useState, useEffect } from "react";
import { collectionGroup, query, where, getDocs } from "firebase/firestore"
import { db, auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

export default function PublicPage() {
    const [decks, setDecks] = useState<any[]>([])
    const router = useRouter();

    useEffect(() => {
        const fetchPublicDecks = async () => {
            const q = query(
                collectionGroup(db, "decks"),
                where("isPublic", "==", true)
            );

            const snapshot = await getDocs(q)
            const publicDecks = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            setDecks(publicDecks)
        }

        fetchPublicDecks()
    }, [])

    const onLogOut = () => {
        auth.signOut()
        router.push("../")
    }

    return (
        <div>
        <h1>Flashcards</h1>
        {decks.length > 0 ? (
          decks.map((deck) => {
            return(
                <div key={deck.id}>
                    <button onClick={() => router.push(`../FlashCard/${deck.id}`)}>{deck.title}</button> <br/>
                </div>
            );
          })
        ): (
            <div>
                <p>No Decks</p>
            </div>
        )}
        <button onClick={() => router.push("../FlashCard/CreateCard")}>New Set</button> <br/>
        <button onClick={onLogOut}>Log Out</button>
      </div>
    )
}