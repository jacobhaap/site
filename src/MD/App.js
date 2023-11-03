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
                    <Route path="/info" element={<MarkdownRender fileName="/pages/info.md" />} />
                    <Route path="/events" element={<MarkdownRender fileName="/pages/events.md" />} />
                    <Route path="/contact" element={<MarkdownRender fileName="/pages/contact.md" />} />
                    <Route path="*" element={<MarkdownRender fileName="/pages/404.md" />} />
                    {/* Add more routes as needed for other Markdown files */}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
