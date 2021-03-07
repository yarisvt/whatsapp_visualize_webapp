import React, { useState, useEffect } from 'react';

import ReactApexChart from 'react-apexcharts';
import { useThemeStore } from '../../context/ThemeContext';
import CopyGraphButton from './CopyGraphButton';

function HBarChart(props) {
  const { title, categories, data } = props;
  const [theme] = useThemeStore();
  const [isMobile, setMobile] = useState(window.innerWidth >= 1200);
  const series = [{ name: 'Count', data }];
  const [animationEnded, setAnimationEnded] = useState(false);
  

  const updateMedia = () => {
    setMobile(window.innerWidth >= 1200);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const options = {
    chart: {
      type: 'bar',
      background: theme === 'dark' ? '#121212' : '#FEF7FF',
      id: 'bar-chart',
      events: {
        animationEnd: () => setAnimationEnded(true),
      }
    },
    title: {
      text: title,
    },
    theme: {
      mode: theme
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
    },
    legend: {
      show: !isMobile,
    },
    yaxis: {
      labels: {
        show: isMobile,
        style: {
          fontSize: '1rem',
        },
      }
    },
    colors: ['#f00', '#ffd700', '#c71585', '#0f0', '#117519', '#00f', '#0ff'],
  };

  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={400}
          width="100%"
        />
      </div>
      <CopyGraphButton key={animationEnded} chartId='bar-chart' animationEnded={animationEnded}/>
    </>
  );
}

export default HBarChart;
