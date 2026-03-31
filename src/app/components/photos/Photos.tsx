import { trpc } from '@/api/trpc';

export const Photos = () => {
    const { data, isLoading, error } = trpc.getPhotos.useQuery({});
    console.log(data);

    if (isLoading) return <div>Loading photos...</div>;
    if (error) return <div>Error loading photos: {error.message}</div>;
    if (!data) return <div>No photos found.</div>;
    if (data.length === 0) return <div>No photos available.</div>;

    return (
        <div>
            <h2>Photos</h2>
            <ul>
                {data.map((photo) => (
                    <li key={photo.id}>
                        <img src={photo.url} alt={photo.title || 'Photo'} width={100} />
                        <div>{photo.title}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
