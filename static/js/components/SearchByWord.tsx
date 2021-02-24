import * as React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

import HBarChart from "../graphs/HBarChart";
import DashBoard from "../DashBoard";

interface chartData {
  data?: {};
  word?: string;
}

const InputPage: React.FC = () => {
  const [word, setWord] = React.useState("");
  const [chart, setChart] = React.useState<chartData>({});

  const handleClick = (e) => {
    e.preventDefault();
    fetch(`/api/get-by-word?words=${word}`)
      .then((response) => response.json())
      .then((data) => setChart(data));
  };

  return (
    <DashBoard>
      <div className="text align-self-center p-2">
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">Word</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => setWord(e.target.value)}
          />
        </InputGroup>
        <Button variant="primary" onClick={handleClick}>
          Get results
        </Button>
        {Object.keys(chart).length !== 0 && (
          <HBarChart data={chart} title={`Word: ${chart.word}`} />
        )}
      </div>
    </DashBoard>
  );
};
export default InputPage;
