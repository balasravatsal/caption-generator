import { Upload, FileAudio, FileVideo } from 'lucide-react';
import React from 'react';

interface UploadProps {
    file: File | null;
    onFileSelect: (file: File) => void;
    disabled: boolean;
}

export const UploadArea: React.FC<UploadProps> = ({ file, onFileSelect, disabled }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <label
            htmlFor="file-upload"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #475569',
                borderRadius: '0.75rem',
                padding: '3rem 1rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                backgroundColor: file ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                borderColor: file ? '#38bdf8' : '#475569',
                opacity: disabled ? 0.5 : 1
            }}
        >
            {file ? (
                file.type.startsWith('video/') ?
                    <FileVideo size={48} color="#38bdf8" style={{ marginBottom: '1rem' }} /> :
                    <FileAudio size={48} color="#38bdf8" style={{ marginBottom: '1rem' }} />
            ) : (
                <Upload size={48} color="#94a3b8" style={{ marginBottom: '1rem' }} />
            )}

            <span style={{ fontSize: '1.1rem', fontWeight: '500', color: file ? '#38bdf8' : '#94a3b8' }}>
                {file ? file.name : "Click to select a file"}
            </span>
            <span style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
                {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "Supports MP4, AVI, MP3, WAV..."}
            </span>

            <input
                id="file-upload"
                type="file"
                onChange={handleChange}
                accept="video/*,audio/*"
                style={{ display: 'none' }}
                disabled={disabled}
            />
        </label>
    );
};
