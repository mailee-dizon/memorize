import React from 'react'
import Image from 'next/image';

interface FlashcardProps {
    front: string;
    back: string;
    notes: string;
    imageFront: string;
    imageBack: string;
}

export default function Flashcard ( {front, back, notes, imageFront, imageBack} : FlashcardProps )  {


console.log("Front:", front);

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
