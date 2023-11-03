const Component_IMG = ({ alt, src, title }) => {
    let className = '';
    let width = '';
    let height = '';
    let alignStyle = {};
    let isBannerImage = false;

    const pattern = /\[(hard-corner|hard-corner-borderless|round-corner|round-corner-borderless|banner)(?:,width=(\d+px))?(?:,height=(\d+px))?(?:,align=(left|center|right))?\]$/;
    const match = alt.match(pattern);
    
    if (match) {
        const styleType = match[1];
        if (styleType === 'banner') {
            isBannerImage = true;
        } else {
            className = styleType;
        }

        // Check if width and height are present
        if (match[2]) {
            width = match[2];
        }
        if (match[3]) {
            height = match[3];
        }

        // Extract alignment and set styles (Only if not banner image)
        if (!isBannerImage) {
            const alignment = match[4];
            if (alignment === "left") {
                alignStyle = { display: 'block', marginLeft: '0', marginRight: 'auto' };
            } else if (alignment === "center") {
                alignStyle = { display: 'block', marginLeft: 'auto', marginRight: 'auto' };
            } else if (alignment === "right") {
                alignStyle = { display: 'block', marginLeft: 'auto', marginRight: '0' };
            }
        }
    
        alt = alt.replace(pattern, '').trim();
    }

    if (isBannerImage) {
        return (
            <img 
                src={src} 
                alt={alt} 
                title={title} 
                className="banner-image"
            />
        );
    } else {
        return (
            <img 
                src={src} 
                alt={alt} 
                title={title} 
                className={className}
                style={{ width: width, height: height, ...alignStyle }}
            />
        );
    }
}

export default Component_IMG;
