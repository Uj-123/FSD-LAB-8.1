import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState(null);
    const [item, setItem] = useState('laptop');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/analyze/${item}`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [item]);

    if (!data) return <h1 > Loading... < /h1>;

    const urgentStyle = {
        container: {
            border: data.isUrgent ? '3px solid red' : '1px solid gray',
            backgroundColor: data.isUrgent ? '#fff8f8' : '#fff',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
        }
    };

    return ( <
        div style = {
            {
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5'
            }
        } >

        { /* Buttons */ } <
        button onClick = {
            () => setItem('laptop') } > Laptop < /button> <
        button onClick = {
            () => setItem('shirt') } > Shirt < /button>

        { /* Card */ } <
        div style = { urgentStyle.container } >
        <
        h1 > { data.name } < /h1> <
        p > $ { data.price } < /p> <
        p > { data.newsHeadline } < /p> <
        p > Sentiment: { data.sentimentScore } < /p>

        {
            data.isUrgent && ( <
                div style = {
                    { color: 'red', fontWeight: 'bold' } } > ⚠️CONFLICT IMPACT DETECTED <
                /div>
            )
        }

        <
        h3 > { data.recommendation } < /h3>

        <
        button > { data.isUrgent ? "SECURE STOCK NOW" : "ADD TO CART" } <
        /button> <
        /div>

        <
        /div>
    );
}

export default App;