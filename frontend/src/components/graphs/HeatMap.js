import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useThemeStore } from '../../context/ThemeContext';

function HeatMap(props) {
  const { title, categories, data } = props;
  const [theme] = useThemeStore();

  const options = {
    chart: {
      type: 'heatmap',
      background: 'none'
    },
    theme: {
      mode: theme
    },
    colors: [theme === 'dark' ? '#f8ff32' : '#008FFB'],
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
    stroke: {
      width: 1,
      colors: [theme === 'dark' ? '#fff' : '#ddd']
    }
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
