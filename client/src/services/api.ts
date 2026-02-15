import axios from 'axios';
import type { SubtitleResponse } from '../types';

const API_URL = 'http://localhost:8000';

export const uploadFile = async (
    file: File,
    onProgress?: (progress: number) => void
): Promise<SubtitleResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post<SubtitleResponse>(`${API_URL}/upload`, formData, {
        onUploadProgress: (progressEvent) => {
            if (progressEvent.total && onProgress) {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onProgress(percentCompleted);
            }
        }
    });

    return response.data;
};
