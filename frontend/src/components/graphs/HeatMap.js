import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useThemeStore } from '../../context/ThemeContext';

import CopyGraphButton from '../buttons/CopyGraphButton';

function HeatMap(props) {
  const { title, categories, data } = props;
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
      type: 'heatmap',
      background: theme === 'dark' ? '#121212' : '#FEF7FF',
      id: 'heatmap',
      events: {
        animationEnd: () => setAnimationEnded(true),
      }
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
    <>
      <div id="chart" className="mt-3">
        <ReactApexChart
          options={options}
          series={data}
          type="heatmap"
          height={400}
          width="100%"
        />
      </div>
      {!isMobile && <CopyGraphButton key={animationEnded} chartId='heatmap' animationEnded={animationEnded}/>}
    </>
  );
}

export default HeatMap;
