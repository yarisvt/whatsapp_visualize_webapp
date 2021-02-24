import * as React from "react";
import { Button } from "react-bootstrap";

import HBarChart from "../graphs/HBarChart";
import DashBoard from "../DashBoard";

interface chartData {
  data?: {};
  word?: string;
}

const TotalMessages: React.FC = () => {
  const [chart, setChart] = React.useState<chartData>({});

  const handleClick = (e) => {
    e.preventDefault();
    fetch("/api/total-messages-per-person")
      .then((response) => response.json())
      .then((data) => setChart(data));
  };

  return (
    <DashBoard>
      <div>
        <Button variant="primary" onClick={handleClick}>
          Get results
        </Button>
        {Object.keys(chart).length !== 0 && (
          <HBarChart data={chart} title="Total messages per person" />
        )}
      </div>
    </DashBoard>
  );
};
export default TotalMessages;
