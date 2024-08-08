import React, { useEffect } from 'react';
import './App.css';
import MarkdownRender from './MarkdownRender';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title;
    }, [title]);
}

function PageWithTitle({ title, render }) {
    useDocumentTitle(title);
    return <>{render}</>;
}

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<PageWithTitle title="Jacob Haap" render={<MarkdownRender fileName="/pages/home.md" />} />} />
                    <Route path="/about" element={<PageWithTitle title="Jacob Haap - About" render={<MarkdownRender fileName="/pages/about.md" />} />} />
                    <Route path="/info" element={<PageWithTitle title="Jacob Haap - Info" render={<MarkdownRender fileName="/pages/info.md" />} />} />
                    <Route path="/events" element={<PageWithTitle title="Jacob Haap - Events" render={<MarkdownRender fileName="/pages/events.md" />} />} />
                    <Route path="/contact" element={<PageWithTitle title="Jacob Haap - Contact" render={<MarkdownRender fileName="/pages/contact.md" />} />} />
                    <Route path="*" element={<PageWithTitle title="404 Not Found" render={<MarkdownRender fileName="/pages/404.md" />} />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
