import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Component_A from './RenderComponents/A';
import Component_IMG from './RenderComponents/IMG';
import './App.css';
import LastSong from './LastSong';
import Time from './Time';

const components = {
    a: Component_A,
    img: Component_IMG
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
