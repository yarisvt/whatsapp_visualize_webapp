import React, { useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";

import PageWrapper from "../../components/page/PageWrapper";
import HeatMap from "../../components/graphs/HeatMap";

function Avg() {
  const [chart, setChart] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/average-characters-per-message`
    )
      .then((response) => response.json())
      .then((data) => {
        setChart(data);
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

  if (!Object.keys(chart).length) {
    return (
      <div className="message-box">
        <h3>Info</h3>
        No data available
      </div>
    );
  }

  return <HeatMap data={chart} title="Average characters per message" />;
}

export default PageWrapper(Avg);
