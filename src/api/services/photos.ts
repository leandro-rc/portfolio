import { useQuery } from '@tanstack/react-query';
import { getQueryFnFactory } from './utils';

const photos = {
    // returns list of all photos
    useListPhotos: () =>
        useQuery({
            queryKey: ['photos'],
            queryFn: () => getQueryFnFactory('photos'),
            retry: false,
        }),
};

export default photos;
