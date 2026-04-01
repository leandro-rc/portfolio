'use client';

import { trpc } from '@/api/trpc';
import 'dotenv/config';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useUploadToS3 } from '@/hooks/useUploadToS3';
import { useState } from 'react';
import Image from 'next/image';

type FormData = {
    file: FileList;
};

const UploadForm = () => {
    // Upload progress state (0-100)
    const { uploadToS3, isSuccess, progress } = useUploadToS3();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const savePhoto = trpc.savePhoto.useMutation();

    const getSignedUrl = trpc.getCustomSignedUrl.useMutation();

    const upload = async (url: string, file: File) => {
        try {
            await uploadToS3(url, file);
        } catch (error) {
            console.error('Error uploading to S3:', error);
            // TODO: Handle error (e.g., show notification to user)
        }
    };

    // Handler function called when user selects a file
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null; // Get the first selected file
        setSelectedFile(file);
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // Input type="file" returns a FileList, we only support single file uploads for now
        const file = data.file[0];

        if (!file) return;

        console.log('File', file);

        // 1. Get signed URL
        const { url, key } = await getSignedUrl.mutateAsync({
            fileName: file.name,
            fileType: file.type,
        });

        // console.log('Received signed URL:', url);
        // console.log('Key', key);

        //2. Upload directly to S3 using the signed URL
        await upload(url, file);

        // 3. Save photo metadata to DB (via tRPC + Tanstack Query mutation call)
        const fileUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`;
        await savePhoto.mutateAsync(
            {
                url: fileUrl,
                title: file.name,
            },
            {
                onSuccess: () => {
                    console.log('Photo metadata saved successfully');
                    alert('Photo uploaded and saved successfully!');
                },
                onError: (error) => {
                    console.error('Error saving photo metadata:', error);
                    alert('Photo uploaded but failed to save metadata.');
                },
            },
        );
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* include validation with required or other standard HTML validation rules */}
                <input
                    {...register('file', { required: true })}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                />
                {/* errors will return when field validation fails  */}
                {errors.file && <span>This field is required</span>}

                <input type="submit" />
            </form>
            {/* Display selected file information */}
            {selectedFile && (
                <div className="file-info">
                    <p>Selected file: {selectedFile.name}</p>
                    <p>File size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p>File type: {selectedFile.type}</p>
                    <Image
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected file preview"
                        width={200}
                        height={200}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            )}
            {isSuccess ? <p>Upload successful!</p> : null}
            {progress > 0 ? <p>Upload progress: {progress.toFixed(2)}%</p> : null}
        </div>
    );
};

export default UploadForm;
