import ReactApexChart from "react-apexcharts";

function HBarChart(props) {
  const { title, categories, data } = props;
  const series = [{ name: 'Count', data }];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      width: "100%"
    },
    title: {
      text: title
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories
    }
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
