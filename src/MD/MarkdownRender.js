import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import './App.css';
import LastSong from './LastSong';
import Time from './Time';

// Define components outside the function component to be accessible in the module scope
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
    },
    img: ({ alt, src, title }) => {
        let className = '';
    
        // Match the class pattern from the alt text
        const classPattern = /\[(hard-corner|round-corner)\]$/;
        const match = alt.match(classPattern);
    
        if (match) {
          className = match[1]; // The captured class name (hard-corner or round-corner)
          alt = alt.replace(classPattern, '').trim(); // Remove the class pattern from the alt text
        }
    
        return <img src={src} alt={alt} title={title} className={className} />;
      }
};

function renderBlock(block) {
    if (block === '<!--LAST_SONG-->') return <LastSong />;
    if (block === '<!--TIME-->') return <Time />;
    return (
        <ReactMarkdown
            remarkPlugins={[gfm]}
            components={components}
            children={block}
        />
    );
}

function MarkdownRender({ fileName }) {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetch(fileName)
            .then(response => response.text())
            .then(text => setMarkdown(text));
    }, [fileName]);

    const blocks = markdown.split(/(<!--LAST_SONG-->|<!--TIME-->)/);

    return (
        <div className="markdown-container">
            {blocks.map((block, index) => (
                <React.Fragment key={index}>
                    {renderBlock(block)}
                </React.Fragment>
            ))}
        </div>
    );
}

export default MarkdownRender;
