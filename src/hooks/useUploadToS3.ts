import { useState } from 'react';
import axios from 'axios';

export const useUploadToS3 = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [progress, setProgress] = useState(0);

    const uploadToS3 = async (signedUrl: string, file: File) => {
        await axios.put(signedUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
            onUploadProgress: (progressEvent) => {
                const progress = (progressEvent.loaded / (progressEvent?.total ?? 1)) * 50;
                setProgress(progress);
            },
            // onDownloadProgress: (progressEvent) => {
            //     const progress = 50 + (progressEvent.loaded / (progressEvent?.total ?? 1)) * 50;
            //     console.log(progress);
            //     setProgress(progress);
            // },
        });
        setIsSuccess(true);
    };

    return { uploadToS3, isSuccess, progress };
};
