import ReactApexChart from "react-apexcharts";

function HeatMap(props) {
  const { words, data } = props.data;

  // dropdown menu to select the person

  // useEffect when name changes to rerun the graph

  const series = [];
  for (const monthData in data["Yaris Van Thiel"]) {
    series.push({
      name: monthData,
      data: Object.values(data["Yaris Van Thiel"][monthData]),
    });
  }
  console.log(series);

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
