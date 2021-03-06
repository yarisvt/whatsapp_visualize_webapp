import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useThemeStore } from '../../context/ThemeContext';

function TimeSeriesLineChart(props) {
  const { title, data } = props;
  const [theme] = useThemeStore();

  const options = {
    chart: {
      type: 'line',
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      background: 'none'
    },
    theme: {
      mode: theme
    },
    xaxis: {
      type: 'categories',
      categories: data.categories,
    },
    title: {
      text: title,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#f00', '#ffd700', '#c71585', '#0f0', '#117519', '#00f', '#0ff'],
    stroke: {
      curve: 'straight',
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={data.series}
        type="line"
        height={400}
        width="100%"
      />
    </div>
  );
}

export default TimeSeriesLineChart;
