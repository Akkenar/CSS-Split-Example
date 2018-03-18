import React from 'react';

import './MyComponent.critical.scss';
import './MyComponent.scss';

const MyComponent = () => {
  return (
    <main>
      <h1>My Component</h1>
      <p className="MyComponent__content">This is a content</p>
    </main>
  );
};

export default MyComponent;
