import React, { useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { InputGroup } from "react-bootstrap";

import PageWrapper from "../../components/page/PageWrapper";
import HBarChart from "../../components/graphs/HBarChart";
import HeatMap from "../../components/graphs/HeatMap";

function Total() {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [heatmap, setHeatmap] = React.useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/total-messages-per-person`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to retrieve data");
        console.error(err);
      });
  }, []);

  if (loading) {
    return <PulseLoader color="gray" size="1rem" />;
  }

  if (error) {
    return (
      <div className="error message-box">
        <h3>Error</h3>
        {error}
      </div>
    );
  }

  if (!Object.keys(data).length) {
    return (
      <div className="message-box">
        <h3>Info</h3>
        No data available
      </div>
    );
  }

  return (
    <div>
      <div className="submission-form">
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
      </div>

      {loading && <PulseLoader color="gray" size="1rem" />}

      {!loading && error && (
        <div className="error message-box">
          <h3>Error</h3>
          {error}
        </div>
      )}

      {!loading && !error && Object.keys(data).length === 0 && (
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
            title="Total messages per person per month"
          />
        ) : (
          <HBarChart
            words={data.words}
            data={data}
            title="Total messages per person"
          />
        ))}
    </div>
  );
}

export default PageWrapper(Total);
