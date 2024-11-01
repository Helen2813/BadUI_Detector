import React, { useState } from 'react';
import './App.css';
import { DownloadingInput } from './components/DownloadInput/DownloadingInput';
import ImageCanvas from './components/ScreenshotArea'

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className="app">
      <header className="header">
          <DownloadingInput onFileSelect={handleFileSelect} />
      </header>
      <main>
        <ImageCanvas file={selectedFile} />
      </main>
    </div>
  );
}

export default App;
