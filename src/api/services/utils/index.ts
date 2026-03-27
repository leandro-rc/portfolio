import client from '../../client';

const getQueryFnFactory = async (path: string) => {
    try {
        const response = await client.get(path, { throwHttpErrors: false });
        if (!response.ok) {
            // Try to parse error message from body, fallback to status text
            let errorMsg = response.statusText;
            try {
                const errorData = await response.json();
                if (errorData && typeof errorData === 'object' && 'message' in errorData) {
                    errorMsg = errorData.message;
                }
            } catch {
                // Ignore JSON parse errors
            }
            throw new Error(errorMsg || `HTTP error ${response.status}`);
        }
        const data: unknown = await response.json();
        if (typeof data === 'object' && data !== null && 'error' in data) {
            const errData = data as { error?: string };
            if (errData.error) {
                throw new Error(errData.error);
            }
        }
        return data;
    } catch (error) {
        throw error instanceof Error ? error : new Error(String(error));
    }
};

const postQueryFnFactory = async (path: string, body: unknown) => {
    try {
        return await client.post(path, {
            body: JSON.stringify(body),
        });
    } catch (error) {
        console.error('Error in fn factory', error);
        return Promise.reject(error);
    }
};

export { getQueryFnFactory, postQueryFnFactory };
