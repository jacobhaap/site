import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './style.css';

function MarkdownRender({ fileName }) {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetch(fileName)
            .then(response => response.text())
            .then(text => setMarkdown(text));
    }, [fileName]);

    return (
        <ReactMarkdown 
            remarkPlugins={[gfm]} 
            className="markdown-container" 
            children={markdown} 
        />
    );
}

export default MarkdownRender;
