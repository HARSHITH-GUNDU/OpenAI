import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import MicRecorder from "mic-recorder-to-mp3";

const AudioRecorderAPI = ({ onAudioFileReady }) => {
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);

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
          .catch((err) => setError("Recording failed: " + err.message));
      })
      .catch((err) => setError("Microphone permission denied: " + err.message));
  };

  const stopRecording = () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "recording.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        const url = URL.createObjectURL(file);

        setAudioUrl(url);
        setIsRecording(false);
        setError(null);

        // Pass file up to parent
        if (onAudioFileReady) {
          onAudioFileReady(file);
        }
      })
      .catch((err) => {
        setError("Failed to process audio: " + err.message);
        setIsRecording(false);
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <div style={{ marginBottom: "1rem" }}>
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

      {audioUrl && (
        <div>
          <audio controls src={audioUrl} />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AudioRecorderAPI;
