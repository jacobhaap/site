const Component_IMG = ({ alt, src, title }) => {
    let className = '';
    let width = '';
    let height = '';
    let alignStyle = {};

    // Match the class, width, height, and alignment pattern from the alt text
    const pattern = /\[(hard-corner|round-corner)(?:,width=(\d+px))?(?:,height=(\d+px))?(?:,align=(left|center|right))?\]$/;
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

      // Extract alignment and set styles
      const alignment = match[4];
      if (alignment === "left") {
        alignStyle = { display: 'block', marginLeft: '0', marginRight: 'auto' };
      } else if (alignment === "center") {
        alignStyle = { display: 'block', marginLeft: 'auto', marginRight: 'auto' };
      } else if (alignment === "right") {
        alignStyle = { display: 'block', marginLeft: 'auto', marginRight: '0' };
      }
    
      alt = alt.replace(pattern, '').trim(); // Remove the class pattern from the alt text
    }
    
    return (
      <img 
        src={src} 
        alt={alt} 
        title={title} 
        className={className}
        style={{ width: width, height: height, ...alignStyle }} // Spread the alignStyle to apply the alignment
      />
    );
}

export default Component_IMG;
