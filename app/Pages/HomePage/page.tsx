"use client";
import React from 'react'
import { useState } from 'react';
import { auth, db } from "@/app/firebase/config";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, collection, getDocs } from 'firebase/firestore';

export const dynamic = "force-dynamic";

export default function UserHome() {
    const [decks, setDecks] = useState<{ id: string; title: string }[]>([]);
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
                fetchDecks(currentUser.uid);
            } else {
                setDecks([]);
            }
        });

        return () => unsubscribe();
    }, []);
    

    const onLogOut = () => {
        auth.signOut()
        router.push("../")
    }


    return (
      <div style={{margin: "auto", width: "100%"}}>
        <h1 style={{textAlign: "center"}}>Flashcards</h1>
        <div style={{margin: "auto", display:"block"}}>
          <div style={{padding: "10px", justifyContent: "center", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", rowGap: "10px", columnGap: "5px"}}>
            {decks.length > 0 ? (
              decks.map((deck) => {
                return(
                    <div key={deck.id} >
                        <button style={{borderRadius: "5px", backgroundColor: "darkolivegreen", color: "white", border: "none", height: "55px", width: "110px", textAlign: "center"}} onClick={() => router.push(`../FlashCard/${deck.id}`)}>{deck.title}</button> <br/>
                    </div>
                );
              })
            ): (
                <div>
                    <p>No Decks</p>
                </div>
            )}
            </div>
          </div>
          
          <button onClick={() => router.push("../FlashCard/CreateCard")}>New Set</button> <br/>
          <button onClick={onLogOut}>Log Out</button>
        
      </div>
    )
}

