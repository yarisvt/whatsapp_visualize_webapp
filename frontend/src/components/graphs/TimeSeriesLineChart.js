import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useThemeStore } from '../../context/ThemeContext';
import CopyGraphButton from './CopyGraphButton';

function TimeSeriesLineChart(props) {
  const { title, data } = props;
  const [theme] = useThemeStore();
  const [animationEnded, setAnimationEnded] = useState(false);

  const options = {
    chart: {
      id: 'line-chart',
      type: 'line',
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      background: theme === 'dark' ? '#121212' : '#FEF7FF',
      events: {
        animationEnd: () => setAnimationEnded(true),
      }
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
    }
  };

  return (
    <>
      <div id="chart" >
        <ReactApexChart
          options={options}
          series={data.series}
          type="line"
          height={400}
          width="100%"
        />
      </div>
      <CopyGraphButton key={animationEnded} chartId='line-chart' animationEnded={animationEnded}/>
    </>
  );
}

export default TimeSeriesLineChart;
