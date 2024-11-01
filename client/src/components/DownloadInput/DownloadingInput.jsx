import React, { useState } from 'react';
import './DomnloadInput.css';

export const DownloadingInput = ({ onFileSelect }) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            onFileSelect(file);
        }
    };

    return (
        <div className="download-input">
            <label htmlFor="file-upload" className="custom-file-upload">
                Custom Upload
            </label>
            <input
                type="file"
                id="file-upload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div className="file-name">{fileName}</div>
        </div>
    );
};
