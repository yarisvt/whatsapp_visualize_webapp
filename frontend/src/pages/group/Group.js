import React, { useState } from 'react';
//import PulseLoader from 'react-spinners/PulseLoader';

import { usePeopleStore } from '../../context/PeopleContext';
import PageWrapper from '../../components/page/PageWrapper';
import HBarChart from '../../components/graphs/HBarChart';
import TimeSeriesLineChart from '../../components/graphs/TimeSeriesLineChart';

import '../../styles/form.scss';

function Personal() {
  const [people] = usePeopleStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [resultType, setResultType] = useState(null);
  const [error, setError] = useState(false);
  const [graph, setGraph] = useState('bar');
  const [words, setWords] = useState('');
  const [lastWords, setLastWords] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
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
    content = <p>Loading...</p>;
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
      <form onSubmit={handleClick}>
        <div className='row'>
          <div className='col'>
            <input
              onChange={(e) => setWords(e.target.value)}
              type="text"
              placeholder="Enter words..."
            />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <select
              disabled={loading}
              onChange={(e) => setGraph(e.target.value)}
              defaultValue="bar"
            >
              <option value="0" disabled>
                Select a graph...
              </option>
              <option defaultValue value="bar">
                Bar chart
              </option>
              <option value="line">Line chart</option>
              <option value="cumsum">Cumulative line chart</option>
            </select>
          </div>
          <div className='col'>
            <button disabled={loading} onClick={handleClick}>
              Get results
            </button>
          </div>
        </div>
      </form>

      {content}
    </div>
  );
}

export default PageWrapper(Personal);
