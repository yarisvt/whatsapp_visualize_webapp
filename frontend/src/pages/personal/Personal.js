import React, { useState, useEffect } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

import { usePeopleStore } from '../../context/PeopleContext';
import PageWrapper from '../../components/page/PageWrapper';
import HeatMap from '../../components/graphs/HeatMap';

import '../../styles/form.scss';

function Personal() {
  const [people] = usePeopleStore();
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [words, setWords] = useState('');
  const [lastWords, setLastWords] = useState('');
  const [name, setName] = useState('');
  
  useEffect(() => {
    if (people.length && person) {
      const chosenName = people[person - 1].name;
      setName(chosenName.endsWith('s') ? `${chosenName}'` : `${chosenName}'s`);
    }
  });

  const handleClick = (e) => {
    e.preventDefault();
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
  } else if (result && typeof result === 'object') {
    content = (
      <HeatMap
        title={lastWords ? `${name} word count of: ${lastWords}` : `${name} message count`}
        categories={[
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'Juli',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]}
        data={result}
      />
    );
  } else if (typeof result === 'number') {
    content = (
      <div className="message-box">
        {lastWords && <h3>Words: {lastWords}</h3>}
        Count: {result}
      </div>
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
              onChange={(e) => {
                setPerson(e.target.value);

              }}
              defaultValue="0"
            >
              <option value="0" disabled>
                Select a person...
              </option>
              {people.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className='col'>
            <label className="checkbox-container"> Monthly
              <input type="checkbox" onChange={(e) => setMonthly(e.target.checked)}/>
              <span className='checkbox-mark'></span>
            </label>
          </div>
          <div className='col'>
            <button
              disabled={loading || !person}
              onClick={handleClick}
            >
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
