import React, {useState, useEffect} from 'react';
import axios from "axios";
import Content from "./components/Content";
import './App.css';

function App() {
    //Use React Hooks useState to initialize local state
    const [data, setData] = useState([]);
    const [param, setParam] = useState(`posts`);
    //const [query, setQuery] = useState(``);
    const [url, setUrl] = useState(`http://localhost:3001/${param}`);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    //Use React Hooks useEffect for side effects, in this case http content retrieval
    useEffect(() => {
            const fetchData = async () => { // useEffect must according to docs return a clean func or nothing, so call async func inside effect
                setIsError(false);
                setIsLoading(true);

                try {
                    const result = await axios(url);
                    setData(result.data);
                } catch (error) {
                    setIsError(true);
                }

                setIsLoading(false);

            };
            fetchData();
        }
        , [url]);  // Avoid loop, only fetch data when component mounts and avoid update on component updates

    //console.log({data});

    return (
        <main>
            <button type="button" onClick={() => setUrl(`http://localhost:3001/posts`)}>
                Posts
            </button>

            {isError && <div>Something went wrong ...</div>}

            {isLoading ?
                (
                    <div>Loading...</div>
                ) : (
                    <Content contentType={param} content={data}/>
                )}
        </main>
    );

}

export default App;
