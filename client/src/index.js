import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Landing from './components/Landing';

const App = () => {
    return (
        <div className="app">
            <Landing/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

