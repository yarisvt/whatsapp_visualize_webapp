import React from 'react';
import ReactApexChart from 'react-apexcharts';

function HeatMap(props) {
  const { title, categories, data } = props;

  const options = {
    chart: {
      type: 'heatmap',
    },
    colors: ['#008FFB'],
    xaxis: {
      type: 'category',
      categories,
    },
    title: {
      text: title,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div id="chart" className="mt-3">
      <ReactApexChart
        options={options}
        series={data}
        type="heatmap"
        height={400}
        width="100%"
      />
    </div>
  );
}

export default HeatMap;
