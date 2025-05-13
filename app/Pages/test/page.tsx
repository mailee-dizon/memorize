'use client'

import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/app/firebase/config'; // adjust path if needed

const TestUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (!file) return;

    const storage = getStorage(app);
    const storageRef = ref(storage, `test/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.error('UPLOAD ERROR', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Download URL:', downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Test Upload</button>
    </div>
  );
};

export default TestUpload;
