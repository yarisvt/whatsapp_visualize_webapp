import React from 'react';
import ReactApexChart from 'react-apexcharts';

import { useThemeStore } from '../../context/ThemeContext';
import { copyGraph } from '../../utils/copyGraph';

import '../../styles/graph.scss';

function HeatMap(props) {
  const { title, categories, data } = props;
  const [theme] = useThemeStore();
  let animationEnded = false;
  let copyQueued = false;
  
  const options = {
    chart: {
      type: 'heatmap',
      background: theme === 'dark' ? '#121212' : '#FEF7FF',
      id: 'heatmap',
      events: {
        animationEnd: () => {
          animationEnded = true;
          if (copyQueued) {
            copyQueued = false;
            copyGraph('heatmap');
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
                copyGraph('heatmap');
              }
            }
          }]
        }
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
    <div id="chart">
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
