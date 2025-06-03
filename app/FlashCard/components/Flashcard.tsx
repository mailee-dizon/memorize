import React from 'react'
import Image from 'next/image';

interface FlashcardProps {
    front: string;
    back: string;
    notes: string;
    imageFront: string;
    imageBack: string;
}

interface HomeFlashcardProps {
    front: string;
    back: string;    
}

export function Flashcard ( {front, back, notes, imageFront, imageBack} : FlashcardProps )  {
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    {imageFront && !front ? (
                        <div className="imageOnly" style={{ width: "auto", height: "100%" }}>
                            <Image src={imageFront} alt="image" layout="fill" objectFit="contain" unoptimized/>
                        </div>
                    ) : imageFront ? (
                        <div className="wordsAndImage">
                            <p>{front}</p>
                            <Image src={imageFront} alt="image" style={{ width: "auto", height: "100%" }} objectFit="contain" layout="fill" unoptimized/>
                        </div>
                    ) : (
                        <div>
                            <p>{front}</p>
                        </div>
                    )}
                </div>
                <div className="flip-card-back">
                    <p>{back}</p>
                    <p>{notes}</p>
                    {(imageBack) ? (
                        <Image src={imageBack} alt="image" style={{ width: "auto", height: "100%" }} objectFit="contain" layout="fill" unoptimized/>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    )
}

export function HomeFlashcard ( {front, back} : HomeFlashcardProps )  {
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <h1>{front}</h1>
                </div>
                <div className="flip-card-back">
                    <h1>{back}</h1>
                </div>
            </div>
        </div>
    )
}


