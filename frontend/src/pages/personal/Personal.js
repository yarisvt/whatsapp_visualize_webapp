import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { Button, Col, Form, InputGroup } from "react-bootstrap";

import { usePeopleStore } from "../../context/PeopleContext";
import PageWrapper from "../../components/page/PageWrapper";
import HeatMap from "../../components/graphs/HeatMap";


function Personal() {
  const [people] = usePeopleStore();
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [words, setWords] = useState("");
  const [lastWords, setLastWords] = useState("");

  const handleClick = (e) => {
    setLoading(true);
    setResult(null);
    setError(false);
    setLastWords(words);
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/people/${person}/messages?monthly=${monthly}&words=${words}`
    )
      .then((res) => res.json())
      .then((response) => {
        setResult(response.result);
        if (!response.success) {
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setResult("Failed to connect to the server");
        setLoading(false);
        console.error(err);
      });
  };

  let content;

  if (loading) {
    content = <PulseLoader color="gray" size="1rem" />;
  } else if (error) {
    content = (
      <div className="message-box error">
        <h3>An Error Occured</h3>
        {result}
      </div>
    );
  } else if (result !== null && !result) {
    content = (
      <div className="message-box">
        <h3>Info</h3>
        No data available
      </div>
    );
  } else if (result && typeof result === "object") {
    content = (
      <HeatMap
        title={lastWords ? `Words: ${lastWords}` : "Messages"}
        categories={[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "Juli",
          "August",
          "September",
          "October",
          "November",
          "December",
        ]}
        data={result}
      />
    );
  } else if (typeof result === "number") {
    content = (
      <div className="message-box">
        {lastWords && <h3>Words: {lastWords}</h3>}
        Count: {result}
      </div>
    );
  }

  return (
    <div className="content">
      <Form>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Control
                onChange={(e) => setWords(e.target.value)}
                type="text"
                placeholder="Enter words..."
              />
              <Form.Text className="text-muted">
                You can search for multiple words by seperating them with a
                comma (e.g. "word1,word2")
              </Form.Text>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Control
              disabled={loading}
              onChange={(e) => setPerson(e.target.value)}
              defaultValue="0"
              as="select"
            >
              <option value="0" disabled>
                Select a person...
              </option>
              {people.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Monthly</InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Append>
                <InputGroup.Checkbox
                  onChange={(e) => setMonthly(e.target.checked)}
                />
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col>
            <Button
              disabled={loading || !person}
              onClick={handleClick}
              variant="primary"
            >
              Get results
            </Button>
          </Col>
        </Form.Row>
      </Form>

      {content}
    </div>
  );
}

export default PageWrapper(Personal);
