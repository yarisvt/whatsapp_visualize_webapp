import ReactApexChart from "react-apexcharts";

function TimeSeriesLineChart(props) {
  const { title, data } = props;

  const options = {
    chart: {
      type: "line",
      height: 350,
      width: "100%",
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      }
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
      curve: 'straight'
    }
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={data.series}
        type="line"
        height={350}
        width={600}
      />
    </div>
  );
}

export default TimeSeriesLineChart;
