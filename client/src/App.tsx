import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { uploadFile } from './services/api';
import { UploadArea } from './components/UploadArea';
import { ProgressBar, LoadingButton } from './components/StatusComponents';
import { ResultList } from './components/ResultList';
import type { ProcessingState } from './types';
import './index.css';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<ProcessingState>({
    status: 'idle',
    progress: 0,
    message: 'Ready to upload'
  });

  const resetState = () => {
    setState({
      status: 'idle',
      progress: 0,
      message: 'Ready to upload',
      error: null,
      result: null
    });
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    resetState();
  };

  const handleProcess = async () => {
    if (!file) return;

    try {
      setState(prev => ({
        ...prev,
        status: 'uploading',
        progress: 0,
        message: 'Uploading to backend for processing...'
      }));

      const result = await uploadFile(file, (progress) => {
        setState(prev => ({ ...prev, progress }));
      });

      // Complete
      setState({
        status: 'complete',
        progress: 100,
        message: 'Processing complete!',
        result
      });

    } catch (error: any) {
      console.error(error);
      setState({
        status: 'error',
        progress: 0,
        error: error.message || 'An unexpected error occurred.',
        message: 'Failed.',
        result: null
      });
    }
  };

  const handleReset = () => {
    setFile(null);
    resetState();
  };

  const isProcessing = state.status === 'uploading';
  const isComplete = state.status === 'complete';

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#e2e8f0',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem'
    }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          background: 'linear-gradient(to right, #38bdf8, #818cf8, #c084fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          Subtitle Generator
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
          Upload a video or audio file to auto-generate multi-language subtitles.
        </p>
      </header>

      <div style={{
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#1e293b',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
      }}>

        {/* Upload Area */}
        {!isComplete && (
          <UploadArea
            file={file}
            onFileSelect={handleFileSelect}
            disabled={isProcessing}
          />
        )}

        {/* Progress Display */}
        {isProcessing && (
          <ProgressBar
            progress={state.progress}
            message={state.message}
          />
        )}

        {/* Error Display */}
        {state.error && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <AlertCircle size={20} />
            <span>{state.error}</span>
          </div>
        )}

        {/* Loading / Action Button */}
        {file && !isComplete && !isProcessing && (
          <LoadingButton
            loading={isProcessing}
            disabled={isProcessing}
            onClick={handleProcess}
            text="Generate Subtitles"
          />
        )}

        {/* Start Over Button when complete */}
        {isComplete && state.result && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              color: '#4ade80',
              justifyContent: 'center',
              marginTop: '1rem'
            }}>
              <CheckCircle size={24} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Success!</h3>
            </div>

            <ResultList links={state.result.download_links} />

            <button
              onClick={handleReset}
              style={{
                marginTop: '1.5rem',
                width: '100%',
                background: 'transparent',
                border: '1px solid #475569',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                color: '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#94a3b8'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = '#475569'}
            >
              Process Another File
            </button>
          </div>
        )}

        {/* Footer Status */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center', minHeight: '24px', fontSize: '0.875rem', color: '#64748b' }}>
          {!isProcessing && !state.error && !isComplete && (
            <p>{state.message}</p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .spin {
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;
