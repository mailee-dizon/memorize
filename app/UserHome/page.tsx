"use client";
import React from 'react'
import { useState } from 'react';
import { auth, db } from "@/app/firebase/config";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, collection, getDocs } from 'firebase/firestore';

export default function UserHome() {
    const [decks, setDecks] = useState<{ id: string; title: any }[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchDecks = async (userId: string) => {
            try {
              const userDocRef =  doc(db, "users", userId);
              const flashcardsRef = collection(userDocRef, "flashcards");
              const snapshot = await getDocs(flashcardsRef);
              const list = snapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title
              }));
      
              setDecks(list);
            } catch (error) {
              console.log(error)
            }
          }

        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchDecks(currentUser.uid);
            } else {
                setUser(null);
                setDecks([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    
    // const fetchDecks = async (userId: string) => {
    //   try {
    //     const userDocRef =  doc(db, "users", userId);
    //     const flashcardsRef = collection(userDocRef, "flashcards");
    //     const snapshot = await getDocs(flashcardsRef);
    //     const list = snapshot.docs.map(doc => ({
    //       id: doc.id,
    //       title: doc.data().title
    //     }));

    //     setDecks(list);
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }


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
        <button onClick={() => router.push("../CreateCard")}>New Set</button> <br/>
        <button>Log Out</button>
      </div>
    )
}

