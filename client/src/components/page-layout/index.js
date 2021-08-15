import React from 'react';
import NavigationBar from '../navigation';
import { Container } from 'react-bootstrap';

const PageLayout = (props) => {
	return (
		<Container fluid>
					<NavigationBar />
					{props.children}
		</Container>
	);
};

export default PageLayout;