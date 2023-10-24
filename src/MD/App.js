import React from 'react';
import './App.css';
import MarkdownRender from './MarkdownRender';

function App() {
    return (
        <div className="App">
            <MarkdownRender fileName="README.md" />
        </div>
    );
}

export default App;