import ApexCharts from 'apexcharts';

const copyGraph = async (chartId, cb) => {
  ApexCharts.exec(chartId, 'dataURI').then(({ imgURI }) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1500;
    canvas.height = 400;

    const ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = imgURI;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        navigator.clipboard
          .write([
            // eslint-disable-next-line no-undef
            new ClipboardItem({
              [blob.type]: blob,
            }),
          ])
          .then(cb)
          .catch(() => {
            alert('Something went wrong while copying the graph');
          });
      });
    };
  });
};

export { copyGraph };
