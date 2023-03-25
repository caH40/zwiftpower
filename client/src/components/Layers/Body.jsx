import React from 'react';

function Body({ children }) {
  return (
    <section className="body">
      <div className="container">{children}</div>
    </section>
  );
}

export default Body;
