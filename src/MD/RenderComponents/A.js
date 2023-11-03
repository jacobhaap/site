import { Link } from 'react-router-dom';

const Component_A = ({ node, href, children, ...props }) => {
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

export default Component_A;
