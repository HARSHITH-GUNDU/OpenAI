import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

import React, { useState } from 'react';
import AudioRecorder from './components/AudioRecorder/AudioRecorder';
import AudioFileUpload from './components/AudioFileUpload/AudioFileUpload';
import NavBar from './components/NavBar/NavBar';
import { Button } from 'primereact/button';
import { transcribeAudio } from './APIs';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import Spinner from './components/Spinner/Spinner';

function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  // Receive audio file from either recorder or uploader
  const handleAudioFile = (file) => {
    setAudioFile(file);
    setTranscript('');
  };

  const handleSubmit  = async() => {
    setLoading(true);
    try{
      const data = await transcribeAudio(audioFile);
      setTranscript(data.transcript || "No transcript returned");
      setDialogVisible(true);

    }catch (err){
console.log(err.message);
    } finally {
      setLoading(false);
    }

  }

  const headerContent = (
        <div>
           We have analysed the audio, for you!! 
        </div>
    );

  const footerContent = (
        <div>
            <Button label="Ok" icon="pi pi-check" onClick={() => setDialogVisible(false)} autoFocus />
        </div>
    );

  return (
    <div className="App">
      <NavBar />
      <div style={{ padding: '1rem', maxWidth: 700, margin: 'auto' }}>
        <h3>Create Summary of your meetings in a click!</h3>

        {/* Recorder and uploader just send file back */}
        <div style={{ border: '1px dashed', padding: '20px', backgroundColor: "var(--primary-100)", borderRadius: '5px'}}>
          <AudioRecorder onAudioFileReady={handleAudioFile} />
        
          <div style={{ margin: '2rem 0', fontWeight: 'bold', textAlign: 'center' }}>
            OR
          </div>

          <AudioFileUpload onAudioFileReady={handleAudioFile} />

        </div>

        {/* Single playback & file info display here */}
        <div style={{ marginTop: '2rem' }}>
          <h4>Selected Audio File:</h4>
          {audioFile ? (
            <div>
              <p><strong>Name:</strong> {audioFile.name || 'Recorded Audio'}</p>
              <p><strong>Size:</strong> {(audioFile.size / 1024).toFixed(2)} KB</p>
              <audio controls src={URL.createObjectURL(audioFile)} />
            </div>
          ) : (
            <p>No audio file selected or recorded yet.</p>
          )}
        </div>
        <Button
          icon="pi pi-file-edit"
          label={loading ? "Transcribing..." : "Transcribe"}
          className="transcribe"
          disabled={loading || audioFile===null}
          onClick={handleSubmit}
        />{
          loading && (
            <Spinner/>
          )
        }
        {
          transcript && (
            <Dialog
              visible={dialogVisible}
              onHide={() => {if (!dialogVisible) return; setDialogVisible(false); }}
              header={headerContent}
              footer={footerContent}
              style={{ width: '70rem', minHeight: '40rem' }}
            >
              <TabView>
                <TabPanel header="Transcript">
                  <h3>Transcript:</h3>
                  <p>{transcript}</p>
                </TabPanel>
                <TabPanel header="AI Summary">
                  <h3>AI Summary:</h3>
                  <p>{transcript}</p>
                </TabPanel>
              </TabView>
            </Dialog>
          )
        }
      </div>
    </div>
  );
}

export default App;
