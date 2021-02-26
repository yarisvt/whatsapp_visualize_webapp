import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { InputGroup, FormControl, Button } from "react-bootstrap";

import PageWrapper from "../../components/page/PageWrapper";
import HBarChart from "../../components/graphs/HBarChart";
import HeatMap from "../../components/graphs/HeatMap";

function Search() {
  const [lastWord, setLastWord] = React.useState("");
  const [word, setWord] = React.useState("");
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [heatmap, setHeatmap] = React.useState(false);

  function handleClick(e) {
    if (!loading && word && word !== lastWord) {
      setLoading(true);
      setError("");
      setLastWord(word);

      fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/get-by-word?words=${word}`
      )
        .then((response) => response.json())
        .then((raw_data) => {
          setData(raw_data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError("Failed to retrieve data");
          console.error(err);
        });
    }
  }

  return (
    <div>
      <div className="submission-form">
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
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">HeatMap</InputGroup.Text>
          </InputGroup.Prepend>
          <InputGroup.Append>
            <InputGroup.Checkbox
              onClick={(e) => setHeatmap((prev) => !prev)}
              aria-label="Checkbox for following text input"
            />
          </InputGroup.Append>
        </InputGroup>
        <InputGroup>
          <InputGroup.Append>
            <Button variant="primary" onClick={handleClick}>
              Get results
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>

      {loading && <PulseLoader color="gray" size="1rem" />}

      {!loading && error && (
        <div className="error message-box">
          <h3>Error</h3>
          {error}
        </div>
      )}

      {!loading && !error && lastWord && Object.keys(data).length === 0 && (
        <div className="message-box">
          <h3>Info</h3>
          No data available
        </div>
      )}

      {!loading &&
        !error &&
        Object.keys(data).length > 0 &&
        (heatmap ? (
          <HeatMap
            words={data.words}
            data={data}
            title={`Word: ${data.words}`}
          />
        ) : (
          <HBarChart
            words={data.words}
            data={data}
            title={`Word: ${data.words}`}
          />
        ))}
    </div>
  );
}

export default PageWrapper(Search);
