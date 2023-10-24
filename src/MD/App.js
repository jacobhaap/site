import React from 'react';
import './App.css';
import MarkdownRender from './MarkdownRender';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MarkdownRender fileName="/pages/home.md" />} />
                    <Route path="/about" element={<MarkdownRender fileName="/pages/about.md" />} />
                    {/* Add more routes as needed for other Markdown files */}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
