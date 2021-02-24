import * as React from "react";

import ReactApexChart from "react-apexcharts";

interface Props {
  data: {
    word: string;
    data: {};
  };
  title: string;
}

const HBarChart: React.FC<Props> = ({ data, title }) => {
  const series = [{ name: data.word, data: Object.values(data.data) }];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      width: "100%",
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
      categories: Object.keys(data.data),
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
        width={600}
      />
    </div>
  );
};

export default HBarChart;
