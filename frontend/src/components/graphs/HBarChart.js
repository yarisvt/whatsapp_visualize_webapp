import ReactApexChart from "react-apexcharts";

function HBarChart(props) {
    const { word, data } = props.data;
    const series = [{ name: word, data: Object.values(data) }];

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
};

export default HBarChart;