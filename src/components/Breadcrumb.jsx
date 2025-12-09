import React from 'react';
import './Breadcrumb.css';

function Breadcrumb({ path, onNavigate }) {
  return (
    <div className="breadcrumb">
      {path.map((item, index) => (
        <React.Fragment key={index}>
          <span 
            className={`breadcrumb-item ${index < path.length - 1 ? 'clickable' : ''}`}
            onClick={() => index < path.length - 1 && onNavigate(index)}
          >
            {item}
          </span>
          {index < path.length - 1 && <span className="breadcrumb-separator">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Breadcrumb;
