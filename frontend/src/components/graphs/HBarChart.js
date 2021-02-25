import ReactApexChart from "react-apexcharts";

function HBarChart(props) {
  const { words, data } = props.data;

  // prepare data
  const chartData = {};
  for (const entry in data) {
    let totalSum = 0;
    for (const year in data[entry]) {
      const sum = Object.values(data[entry][year]).reduce((a, b) => a + b);
      totalSum += sum;
    }
    chartData[entry] = totalSum;
  }
  console.log(chartData);

  const series = [{ name: words, data: Object.values(chartData) }];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      width: "100%",
    },
    title: {
      text: props.title,
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
      categories: Object.keys(data),
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
}

export default HBarChart;
