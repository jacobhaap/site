import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import './App.css';
import LastSong from './LastSong';

function MarkdownRender({ fileName }) {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetch(fileName)
            .then(response => response.text())
            .then(text => setMarkdown(text));
    }, [fileName]);

    // Customize rendering for links
    const components = {
        a: ({ node, href, children, ...props }) => {
            // If the link is external
            if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('ipfs://')) {
                return <a href={href} {...props} target="_blank" rel="noopener noreferrer">{children}</a>;
            }
    
            // If the link is an internal hash link
            if (href.startsWith('#')) {
                return <a href={href} {...props}>{children}</a>;
            }
    
            // For all other links (internal page links)
            return <Link to={href} {...props}>{children}</Link>;
        }
    };

    if (markdown.includes('<!--LAST_SONG-->')) {
        return (
            <div>
                <ReactMarkdown 
                    remarkPlugins={[gfm]} 
                    className="markdown-container"
                    components={components}
                    children={markdown.replace('<!--LAST_SONG-->', '')}
                />
                <LastSong />
            </div>
        );
    }

    return (
        <ReactMarkdown 
            remarkPlugins={[gfm]} 
            className="markdown-container"
            components={components}
            children={markdown}
        />
    );
}

export default MarkdownRender;
