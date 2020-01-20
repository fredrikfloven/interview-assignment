import {useEffect, useState} from "react";
import axios from "axios";

function HttpRequest() {
    //Use React Hooks useState to initialize local state
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [url, setUrl] = useState(`http://localhost:3001/posts`);
    const [httpType, setHttpType] = useState('get');

    //Use React Hooks useEffect for side effects, in this case http content retrieval
    useEffect(() => {
            const fetchData = async () => { // useEffect must according to docs return a clean func or nothing, so call async func inside effect
                setIsError(false);
                setIsLoading(true);

                try {
                    const result = await axios({
                        method: httpType,
                        url: url
                    });
                    setData(result.data);
                } catch (error) {
                    setIsError(true);
                }

                setIsLoading(false);

            };
            fetchData();
        }
        , [url, httpType]);  // Avoid loop, only fetch data when component mounts and avoid update on component updates

    return [{data, isLoading, isError}, setUrl, setHttpType];
}

export default HttpRequest;