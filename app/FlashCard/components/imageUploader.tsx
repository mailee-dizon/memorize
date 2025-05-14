import { useState } from "react";
import Image from "next/image";
import uploadImage from "../utils/uploadImage";

interface ImageUploaderProps {
    userId: string,
    deckId: string
    onUploadComplete: (url: string) => void
}

export default function ImageUploader( {userId, deckId, onUploadComplete} : ImageUploaderProps ) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imageUploaded, setImageUploaded] = useState(false)
    const [imageUrl, setImageUrl] = useState("")

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
            setImageUrl(url)
            setImageUploaded(true)
            
        } catch (error) {
            console.log(error)
        }
    }

    console.log("Image Url:", imageUrl)
    return (
        <div>
            <input type="file" onChange={handleImageChange}/>
            <button onClick={handleUpload}>Upload</button>
            {imageUploaded ? (
                <Image src={"https://firebasestorage.googleapis.com/v0/b/flipcards-448722.firebasestorage.app/o/images%2FaTmxw9m61VURvUuceomo3SKDVnC3%2Ft%2F9th-amendment.jpeg?alt=media&token=93464555-47ed-476d-9be2-b869aa3a95b3"} width="20" height="20" alt="image"/>
            ) : (
                <div></div>
            )}
        </div>
    )
}