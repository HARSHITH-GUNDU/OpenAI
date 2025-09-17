import React, { useRef, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';

const AudioFileUpload = ({ onAudioFileReady }) => {
  const toast = useRef(null);
  const fileUploadRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileReady, setIsFileReady] = useState(false);

  const onSelect = (e) => {
    setSelectedFile(e.files[0]);
    setIsFileReady(false);
  };

  const prepareFile = () => {
    if (!selectedFile) {
      toast.current.show({ severity: 'warn', summary: 'No file', detail: 'Please select a file first.', life: 3000 });
      return;
    }
    setIsFileReady(true);
    toast.current.show({ severity: 'info', summary: 'Ready', detail: `File "${selectedFile.name}" ready.` , life: 3000 });

    if (onAudioFileReady) {
      onAudioFileReady(selectedFile);
    }

    setSelectedFile(null);
    setIsFileReady(false);
    if (fileUploadRef.current) {
      fileUploadRef.current.clear();
    }
  };

  const onClear = () => {
    setSelectedFile(null);
    setIsFileReady(false);
    // Toast removed here as per your request
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, cancelButton } = options;
    return (
      <div
        className={className}
        style={{
          backgroundColor: '#f4f4f4',
          borderBottom: '1px solid #dee2e6',
          borderRadius: '4px 4px 0 0',
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        {chooseButton}
        <button
          type="button"
          className="custom-upload-btn p-button-text"
          onClick={prepareFile}
          title="Prepare audio file"
        >
          <i className="pi pi-upload" />
          <span className="p-button-label">Upload</span>
        </button>
        {cancelButton}
      </div>
    );
  };

  const itemTemplate = (file, props) => (
    <div className="p-d-flex p-ai-center p-jc-between" style={{ width: '100%' }}>
      <div>
        <i className="pi pi-file-audio" style={{ fontSize: '2rem', marginRight: '0.5rem' }}></i>
        <span>{file.name}</span>
      </div>
      <button type="button" className="p-fileupload-remove p-link" onClick={() => props.onRemove(file)}>
        <i className="pi pi-times"></i>
      </button>
    </div>
  );

  const emptyTemplate = () => <div className="p-p-3">Choose an audio file to upload.</div>;

  const chooseOptions = { className: 'custom-choose-btn p-button-text', icon: 'pi pi-plus', tooltipOptions: { position: 'bottom' } };
  const cancelOptions = { className: 'custom-cancel-btn p-button-text', icon: 'pi pi-times', tooltipOptions: { position: 'bottom' } };

  return (
    <div style={{ textAlign: 'center' }}>
      <Toast ref={toast} />

      <Tooltip target=".custom-choose-btn" content="Choose audio file" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Prepare audio file" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear selection" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name="audioFile"
        accept="audio/*"
        maxFileSize={10000000}
        onSelect={onSelect}
        onClear={onClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        cancelOptions={cancelOptions}
        auto={false}
        multiple={false}
        customUpload={true}
      />
    </div>
  );
};

export default AudioFileUpload;
