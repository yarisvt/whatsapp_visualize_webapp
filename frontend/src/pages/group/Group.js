import React, { useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { Button, Col, Form } from 'react-bootstrap';

import { usePeopleStore } from '../../context/PeopleContext';
import PageWrapper from '../../components/page/PageWrapper';
import HBarChart from '../../components/graphs/HBarChart';
import TimeSeriesLineChart from '../../components/graphs/TimeSeriesLineChart';

function Personal() {
  const [people] = usePeopleStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [resultType, setResultType] = useState(null);
  const [error, setError] = useState(false);
  const [graph, setGraph] = useState('bar');
  const [words, setWords] = useState('');
  const [lastWords, setLastWords] = useState('');

  const handleClick = () => {
    setLoading(true);
    setResult(null);
    setError(false);
    setLastWords(words);
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/messages/${graph}?words=${words}`
    )
      .then((res) => res.json())
      .then((response) => {
        setResult(response.result);
        if (!response.success) {
          setError(true);
        } else {
          setResultType(graph);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setResult('Failed to connect to the server');
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
  } else if (resultType === 'line' || resultType === 'cumsum') {
    content = (
      <TimeSeriesLineChart
        title={lastWords ? `Words: ${lastWords}` : 'Messages'}
        data={result}
      />
    );
  } else if (resultType === 'bar') {
    content = (
      <HBarChart
        title={lastWords ? `Words: ${lastWords}` : 'Messages'}
        categories={people.map((p) => p.name)}
        data={result}
      />
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
              onChange={(e) => setGraph(e.target.value)}
              defaultValue="0"
              as="select"
            >
              <option value="0" disabled>
                Select a graph...
              </option>
              <option defaultValue value="bar">
                Bar chart
              </option>
              <option value="line">Line chart</option>
              <option value="cumsum">Cumulative line chart</option>
            </Form.Control>
          </Col>
          <Col>
            <Button disabled={loading} onClick={handleClick} variant="primary">
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
