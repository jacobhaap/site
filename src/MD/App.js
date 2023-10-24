import React from 'react';
import './App.css';
import MarkdownRender from './MarkdownRender';
import Footer from './Footer';

function App() {
    return (
        <div className="App">
            <MarkdownRender fileName="README.md" />
            <Footer />
        </div>
    );
}

export default App;