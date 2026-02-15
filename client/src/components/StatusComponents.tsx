import React from 'react';
import { Loader2 } from 'lucide-react';

interface ProgressProps {
    progress: number;
    message?: string;
}

export const ProgressBar: React.FC<ProgressProps> = ({ progress, message }) => {
    return (
        <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                color: '#94a3b8',
                fontSize: '0.875rem'
            }}>
                <span>{message || 'Processing...'}</span>
                <span>{progress}%</span>
            </div>
            <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#334155',
                borderRadius: '4px',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: '#3b82f6',
                    transition: 'width 0.3s ease'
                }} />
            </div>
        </div>
    );
};

export const LoadingButton: React.FC<{ loading: boolean; disabled: boolean; onClick: () => void; text: string }> = ({ loading, disabled, onClick, text }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: disabled ? '#475569' : '#3b82f6',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: disabled ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'background 0.2s',
                marginTop: '1.5rem'
            }}
        >
            {loading && <Loader2 className="spin" />}
            {text}
        </button>
    );
};
