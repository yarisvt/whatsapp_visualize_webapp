import React, { useState } from 'react';

import '../../styles/copy-graph.scss';

import ApexCharts from 'apexcharts';

function CopyGraphButton({ chartId }) {
  const [showPopup, setShowPopup] = useState(false);
  const [copyText, setCopyText] = useState('');
  
  const handleCopied = (text) => {
    setCopyText(text);
    setShowPopup(prev => !prev);
    setTimeout(() => {
      setShowPopup(prev => !prev);
      setCopyText('');
    }, 2000);
  };
  
  const copyGraph = () => {
    ApexCharts.exec(chartId, 'dataURI').then(({ imgURI }) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1100;
      canvas.height = 400;

      const ctx  = canvas.getContext('2d');
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      img.src = imgURI;
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
          navigator.clipboard.write([
            // eslint-disable-next-line no-undef
            new ClipboardItem({
              [blob.type]: blob
            })
          ])
            .then(() => {
              handleCopied('Chart copied!');
            })
            .catch(() => {
              handleCopied('Something went wrong');
            });
        });
      };
    });
  };
  
  return (
    <button className='popup' onClick={copyGraph}>
      Copy chart
      <span className={`popuptext ${showPopup ? 'show' : ''}`}>{copyText}</span>
    </button>
  );
  
}

export default CopyGraphButton;
