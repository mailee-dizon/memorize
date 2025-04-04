"use client";
import React from 'react'
import { useState } from 'react';
import { app, auth, db } from "@/app/firebase/config";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserHome() {
    const [decks, setDecks] = useState([]);
    const user = auth.currentUser;

    useEffect(() => {
    const fetchDecks = async () => {
      try {
        const ref = db.collection("users").doc(user.uid).collection("flashcards");
        const snapshot = await ref.get();
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title
        }));
        setDecks(list);
      } catch (error) {
        console.log(error)
      }
    }
    fetchDecks()
  }, [user]);



    


    return (
      <div>
        <h1>Flashcards</h1>
        {decks.length > 0 ? (
          decks.map((deck) => {
            return(
              <button key={deck.id} onClick={() => onSelect(deck.id) }>{deck.title}</button>
            );
          })
        ): (
          <p>No Decks</p>
        )}
        <button onClick={onNewSet}>New Set</button>
        <button onClick={onLogOut}>Log Out</button>
      </div>
    )
}

