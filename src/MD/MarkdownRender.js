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
        let width = '';
        let height = '';
    
        // Match the class, width, and height pattern from the alt text
        const pattern = /\[(hard-corner|round-corner)(?:,width=(\d+px))?(?:,height=(\d+px))?\]$/;
        const match = alt.match(pattern);
    
        if (match) {
          className = match[1]; // The captured class name (hard-corner or round-corner)
    
          // Check if width and height are present
          if (match[2]) {
            width = match[2];
          }
          if (match[3]) {
            height = match[3];
          }
    
          alt = alt.replace(pattern, '').trim(); // Remove the class pattern from the alt text
        }
    
        return (
          <img 
            src={src} 
            alt={alt} 
            title={title} 
            className={className}
            style={{ width: width, height: height }}
          />
        );
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
