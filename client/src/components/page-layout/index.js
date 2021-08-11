import React from 'react';
import NavigationBar from '../navigation';
import { Container } from 'react-bootstrap';

const PageLayout = (props) => {
	return (
		<Container fluid>
			<React.Fragment>
					<NavigationBar />
					{props.children}
			</React.Fragment>
		</Container>
	);
};

export default PageLayout;