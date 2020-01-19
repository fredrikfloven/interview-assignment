import React, {useState, useEffect} from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {
    //Use React Hooks useState to initialize local state
    const [data, setData] = useState([]);

    //Use React Hooks useEffect for side effects, in this case http content retrieval
    useEffect(() => {
            const fetchData = async () => {
                const result = await axios(
                    'http://localhost:3001/impacters',
                );
                setData(result.data); // useEffect must according to docs return a clean func or nothing, so call async func inside effect
            };
            fetchData();
        }
        , []);  // Avoid loop, only fetch data when component mounts and avoid update on component updates

    console.log({data});

    return (
        <ul>
            {data.map(impacter => (
                <li key={impacter.id}>
                    <a href={impacter.profile_image}>{impacter.name}</a>
                </li>
            ))}
        </ul>
    );

}

export default App;
