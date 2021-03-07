import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useThemeStore } from '../../context/ThemeContext';
import CopyGraphButton from '../buttons/CopyGraphButton';

function TimeSeriesLineChart(props) {
  const { title, data } = props;
  const [theme] = useThemeStore();
  const [isMobile, setMobile] = useState(window.innerWidth < 992);
  const [animationEnded, setAnimationEnded] = useState(false);
  
  const updateMedia = () => {
    setMobile(window.innerWidth < 992);
  };
  
  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

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
      {!isMobile && <CopyGraphButton key={animationEnded} chartId='line-chart' animationEnded={animationEnded}/>}
    </>
  );
}

export default TimeSeriesLineChart;
