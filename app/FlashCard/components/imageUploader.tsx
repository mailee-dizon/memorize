import { useState } from "react";
import uploadImage from "../utils/uploadImage";
import Image from "next/image";

interface ImageUploaderProps {
    userId: string,
    deckId: string,
    value: string,
    onUploadComplete: (url: string) => void
}

export default function ImageUploader( {userId, deckId, value, onUploadComplete} : ImageUploaderProps ) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        setSelectedImage(file)
    }

    const handleUpload = async () => {
        if (!selectedImage) return;
        try {
            const url = await uploadImage(selectedImage, userId, deckId)
            console.log("Deck Id: ", deckId)
            onUploadComplete(url)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {value ? (
                <Image src={value} width={40} height={40} alt="image" unoptimized/>
            ) : (
                <div>
                    <input type="file" onChange={handleImageChange}/>
                    <button onClick={handleUpload}>Upload</button>
                </div>
            )}
        </div>
    )
}