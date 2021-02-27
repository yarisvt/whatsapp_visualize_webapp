import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { Button, Col, Form, InputGroup } from "react-bootstrap";

import { usePeopleStore } from '../../context/PeopleContext';
import PageWrapper from "../../components/page/PageWrapper";

import HBarChart from '../../components/graphs/HBarChart';

import './personal.scss';
import HeatMap from "../../components/graphs/HeatMap";

function Personal() {
  const [people] = usePeopleStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [person, setPerson] = useState(0);
  const [monthly, setMonthly] = useState(false);
  const [result, setResult] = useState(null);

  const handleClick = (e) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/people/${person}/messages?monthly=${monthly}`)
      .then(res => res.json())
      .then((response) => {
        setLoading(false);
        setError(false);
        setResult(response.result);
      }).catch((err) => {
        setLoading(false);
        setError('Failed to connect to the server');
        console.error(err);
      });
  };

  let content;

  if (loading) {
    content = <PulseLoader color="gray" size="1rem" />;
  } else if (error) { 
    content = <div className='message-box error'>
      <h3>An Error Occured</h3>
      {error}
    </div>
  } else if (monthly && result) {
    content = <HeatMap/>
  } else if (result) {
    content = <HBarChart
      title=''
      categories={[]}
      data={[]}
    />
  }

  return (
    <div>
      <Form>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Control type='text' placeholder='Enter words...'/>
              <Form.Text className="text-muted">
                You can search for multiple words by seperating them with a comma (e.g. "word1,word2")
              </Form.Text>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Control disabled={loading} onChange={(e) => setPerson(e.target.value)} defaultValue='0' as='select'>
              <option value='0' disabled>Select a person...</option>
              {
                people.map(p => <option key={p.id} value={p.id}>{p.name}</option>)
              }
            </Form.Control>
          </Col>
          <Col>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Monthly</InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Append>
                <InputGroup.Checkbox onChange={(e) => setMonthly(e.target.checked)}/>
              </InputGroup.Append>
            </InputGroup>
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
