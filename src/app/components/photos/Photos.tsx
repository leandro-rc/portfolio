import { PhotosAPI } from '@/api';

export const Photos = () => {
    const photosResponse = PhotosAPI.useListPhotos();
    console.log('photosResponse', photosResponse);
    return <div>Photos component</div>;
};
