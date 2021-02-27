import ReactApexChart from "react-apexcharts";

function HeatMap(props) {
  const { title, categories, data } = props;

  const options = {
    chart: {
      type: "heatmap",
      height: 350,
      width: "100%",
    },
    colors: ["#008FFB"],
    xaxis: {
      type: "category",
      categories
    },
    title: {
      text: title,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={data}
        type="heatmap"
        height={350}
        width={600}
      />
    </div>
  );
}

export default HeatMap;
