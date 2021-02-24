import React, { useEffect } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

import PageWrapper from '../../components/page/PageWrapper';
import HBarChart from '../../components/graphs/HBarChart';

function Total() {
    const [chart, setChart] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    useEffect(() => {
        fetch('/api/total-messages-per-person')
            .then((response) => response.json())
            .then((data) => {
                setChart(data);
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                setError('Failed to retrieve data');
                console.error(err);
            });
    }, []);

    if (loading) {
        return <PulseLoader color='gray' size='1rem'/>;
    }
    
    if (error) {
        return (
            <div className='error message-box'>
                <h3>Error</h3>
                {error}
            </div>
        );
    }

    if (!Object.keys(chart).length) {
        return (
            <div className='message-box'>
                <h3>Info</h3>
                No data available
            </div>
        );
    }

    return <HBarChart data={chart} title='Total messages per person'/>;
}

export default PageWrapper(Total);
