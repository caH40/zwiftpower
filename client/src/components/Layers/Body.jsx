import React from 'react';

const Body = ({ children }) => {
	return (
		<section className="body">
			<div className="container">{children}</div>
		</section>
	);
};

export default Body;
