import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "@/app/firebase/config"

async function uploadImage (file: File, userId: string, deckId: string) : Promise<string> {
    const storageRef = ref(storage, `gs://flipcards-448722.firebasestorage.app/images/${userId}/${deckId}/${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    return await getDownloadURL(snapshot.ref)
}

export default uploadImage;