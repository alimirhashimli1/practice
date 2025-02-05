import React, { useRef } from "react";

const DraggableBox: React.FC = () => {
    const renderCount = useRef(0);
  
    renderCount.current += 1; // This value persists but does not trigger re-renders
  
    return (
      <div>
        <p>Render Count: {renderCount.current}</p>
        <button onClick={() => (renderCount.current + 1)}>Increment</button>
      </div>
    );
  };

export default DraggableBox;
