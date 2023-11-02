const Component_IMG = ({ alt, src, title }) => {
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

export default Component_IMG;