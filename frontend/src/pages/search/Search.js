import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

import PageWrapper from '../../components/page/PageWrapper';
import HBarChart from '../../components/graphs/HBarChart';

function Search() {
    const [lastWord, setLastWord] = React.useState('');
    const [word, setWord] = React.useState('');
    const [chart, setChart] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    function handleClick(e) {
        if (!loading && word && word !== lastWord && !word.match(/\s/g)) {
            setLoading(true);
            setError('');
            setLastWord(word);

            fetch(`${process.env.REACT_APP_API_BASE_URL}/api/get-by-word?words=${word}`)
            .then((response) => response.json())
            .then((data) => {
                setChart(data);
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                setError('Failed to retrieve data');
                console.error(err);
            });
        }
    }

    return (
        <div>
            <div className='submission-form'>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">Word</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={(e) => setWord(e.target.value)}
                    />
                    <InputGroup.Append>
                        <Button variant="primary" onClick={handleClick}>
                            Get results
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>

            {
                loading &&
                <PulseLoader color='gray' size='1rem'/>
            }

            {
                !loading &&
                error &&
                <div className='error message-box'>
                    <h3>Error</h3>
                    {error}
                </div>
            }

            {
                !loading &&
                !error &&
                lastWord &&
                Object.keys(chart).length === 0 &&
                <div className='message-box'>
                    <h3>Info</h3>
                    No data available
                </div>
            }

            {
                !loading &&
                !error &&
                Object.keys(chart).length > 0 &&
                <HBarChart data={chart} title={`Word: ${chart.word}`} />
            }
        </div>
    );
}

export default PageWrapper(Search);