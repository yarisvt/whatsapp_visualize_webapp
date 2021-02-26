import { useState, useEffect } from "react";

import { InputGroup } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import ReactApexChart from "react-apexcharts";

function HeatMap(props) {
  const { data } = props.data;
  const names = Object.keys(data);

  console.log(data);

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
  }, [name]);

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
    <div className="mb-3">
      <InputGroup className="mb-3 mt-3">
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title={name}
          id="input-group-dropdown-1"
          onSelect={(e) => setName(e)}
        >
          {names.map((name) => {
            return (
              <Dropdown.Item eventKey={name} key={name}>
                {name}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </InputGroup>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="heatmap"
          height={350}
          width={600}
        />
      </div>
    </div>
  );
}

export default HeatMap;
