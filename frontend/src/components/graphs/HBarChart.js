import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import { useThemeStore } from '../../context/ThemeContext';
import { useIsMobileStore } from '../../context/IsMobileContext';
import { copyGraph } from '../../utils/copyGraph';

import '../../styles/graph.scss';

function HBarChart(props) {
  const { title, categories, data } = props;
  const [theme] = useThemeStore();
  const [isMobile] = useIsMobileStore();
  const [success, setSuccess] = useState(false);
  const series = [{ name: 'Count', data }];

  let resultAnimationTimeout = null;
  let animationEnded = false;
  let copyQueued = false;

  useEffect(() => () => clearTimeout(resultAnimationTimeout), [resultAnimationTimeout]);
  
  const options = {
    chart: {
      type: 'bar',
      background: theme === 'dark' ? '#121212' : '#FEF7FF',
      id: 'bar-chart',
      events: {
        animationEnd: () => {
          animationEnded = true;
          if (copyQueued) {
            copyQueued = false;
            copyGraph('line-chart', () => {
              setSuccess(true);
              resultAnimationTimeout = setTimeout(() => setSuccess(false), 2000);
            });
          }
        }
      },
      toolbar: {
        tools: {
          customIcons: [{
            icon: '<svg style="margin-top: 2px;" width="18" height="18" viewBox="-40,0,512,512"><path d="m271,512H80c-44.11,0-80-35.89-80-80V161c0-44.11,35.89-80,80-80h191c44.11,0,80,35.89,80,80v271c0,44.11-35.89,80-80,80zM80,121c-22.05,0-40,17.95-40,40v271c0,22.05,17.95,40,40,40h191c22.05,0,40-17.95,40-40V161c0-22.05-17.95-40-40-40zm351,261V80c0-44.11-35.89-80-80-80H129c-11.05,0-20,8.95-20,20s8.95,20,20,20h222c22.05,0,40,17.95,40,40v302c0,11.05,8.95,20,20,20s20-8.95,20-20z"/></svg>',
            title: 'Copy graph',
            class: 'copy-icon',
            index: -6,
            click: () => {
              if (!animationEnded) {
                copyQueued = true;
              } else {
                copyGraph('line-chart', () => {
                  setSuccess(true);
                  resultAnimationTimeout = setTimeout(() => {
                    setSuccess(false);
                  }, 2000);
                });
              }
            }
          }]
        }
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
      show: isMobile,
    },
    yaxis: {
      labels: {
        show: !isMobile,
        style: {
          fontSize: '1rem',
        },
      }
    },
    colors: ['#f00', '#ffd700', '#c71585', '#0f0', '#117519', '#00f', '#0ff'],
  };

  return (
    <div id="chart" className={success ? 'success' : ''}>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={400}
        width="100%"
      />
    </div>
  );
}

export default HBarChart;
