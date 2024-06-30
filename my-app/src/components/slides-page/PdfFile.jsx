import React from 'react';

export default function PdfFile({ file }) {
  const fileUrl = `http://localhost:5000/uploads/${file}`;

  return (
    <div className="pfd-viewer-div" style={{height: innerHeight, borderRadius:'4px'}}>
      <h5 style={{margin: 'auto'}}>{file}</h5>
      <iframe src={fileUrl} width="100%" height="100%" title={file} />
    </div>
  );
}
