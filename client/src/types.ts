export type AppStatus =
    | 'idle'
    | 'loading_ffmpeg'
    | 'ready'
    | 'converting'
    | 'uploading'
    | 'complete'
    | 'error';

export interface SubtitleResponse {
    message: string;
    filename: string;
    download_links: Record<string, string>;
}

export interface ProcessError {
    message: string;
    code?: string;
}

export interface ProcessingState {
    status: AppStatus;
    progress: number; // 0-100
    message?: string;
    error?: string | null;
    result?: SubtitleResponse | null;
}
