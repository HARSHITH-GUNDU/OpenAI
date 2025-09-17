// src/components/AudioRecorder/AudioRecorder.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import MicRecorder from 'mic-recorder-to-mp3';

const AudioRecorder = ({ onAudioFileReady }) => {
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    setRecorder(new MicRecorder({ bitRate: 128 }));
  }, []);

  const startRecording = () => {
    setError(null);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        recorder
          .start()
          .then(() => setIsRecording(true))
          .catch((err) => setError('Recording failed: ' + err.message));
      })
      .catch((err) => setError('Microphone permission denied: ' + err.message));
  };

  const stopRecording = () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, 'recording.mp3', {
          type: blob.type,
          lastModified: Date.now(),
        });
        setIsRecording(false);
        setError(null);

        if (onAudioFileReady) {
          onAudioFileReady(file); // send file back to parent
        }

        toast.current.show({
          severity: 'info',
          summary: 'Ready',
          detail: `File "${file.name}" ready.`,
          life: 3000,
        });
      })
      .catch((err) => {
        setError('Failed to process audio: ' + err.message);
        setIsRecording(false);
      });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Toast ref={toast} />
      <div style={{ marginBottom: '1rem' }}>
        {isRecording ? (
          <Button
            icon="pi pi-stop"
            label="Stop Recording"
            className="p-button-danger"
            onClick={stopRecording}
          />
        ) : (
          <Button
            icon="pi pi-microphone"
            label="Start Recording"
            className="p-button-primary"
            onClick={startRecording}
          />
        )}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AudioRecorder;
