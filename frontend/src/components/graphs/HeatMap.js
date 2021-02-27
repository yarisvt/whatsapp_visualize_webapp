import { useState, useEffect } from "react";

import ReactApexChart from "react-apexcharts";

function HeatMap(props) {
  const { data } = props.data;
  const names = Object.keys(data);

  const [name, setName] = useState(names[0]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    setSeries([]);
    for (const monthData in data[name]) {
      const serie = {
        name: monthData,
        data: Object.values(data[name][monthData]),
      };
      setSeries((prev) => [...prev, serie]);
    }
  }, [name, data]);

  const options = {
    chart: {
      type: "heatmap",
      height: 350,
      width: "100%",
    },
    colors: ["#008FFB"],
    xaxis: {
      type: "category",
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    title: {
      text: props.title,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="heatmap"
        height={350}
        width={600}
      />
    </div>
  );
}

export default HeatMap;
