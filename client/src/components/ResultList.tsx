import { Download } from 'lucide-react';
import React from 'react';

interface ResultListProps {
    links: Record<string, string>;
}

export const ResultList: React.FC<ResultListProps> = ({ links }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
            {Object.entries(links).map(([lang, url]) => (
                <a
                    key={lang}
                    href={url}
                    download
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#334155',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        textDecoration: 'none',
                        color: '#e2e8f0',
                        transition: 'background 0.2s',
                        border: '1px solid #475569'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#475569'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                >
                    <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{lang} Subtitles</span>
                    <Download size={18} />
                </a>
            ))}
        </div>
    );
};
