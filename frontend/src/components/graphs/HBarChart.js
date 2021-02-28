import { useState, useEffect } from "react";

import ReactApexChart from "react-apexcharts";

function HBarChart(props) {
  const { title, categories, data } = props;
  const [isMobile, setMobile] = useState(window.innerWidth >= 1200);
  const series = [{ name: "Count", data }];

  const updateMedia = () => {
    setMobile(window.innerWidth >= 1200);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const options = {
    chart: {
      type: "bar",
    },
    title: {
      text: title,
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
    colors: ["#f00", "#ffd700", "#c71585", "#0f0", "#117519", "#00f", "#0ff"],
  };

  return (
    <div id="chart">
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
