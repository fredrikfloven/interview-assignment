import React from 'react';
import ContentList from "./components/ContentList";
import HttpRequest from "./sideEffects/HttpRequest";
import './App.css';

function App() {

    const [{data, isLoading, isError}] = HttpRequest();

    return (
        <main>
            {isError && <div>Something went wrong ...</div>}
            {isLoading ?
                (
                    <div>Loading...</div>
                ) : (
                    <ContentList content={data}/>
                )}
        </main>
    );

}

export default App;
