import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBlock } from 'reactstrap';
import RandomThreadDisplay from './RandomThreadDisplay';

const propTypes = {
	randomThread: PropTypes.shape({}),
	generateRandomThread: PropTypes.func.isRequired
};

const RandomThreadCard = (props) => {
	const { generateRandomThread, randomThread } = props;
	return (
		<Card className="random-thread-generator-card">
			<CardHeader>
				<i className="fa fa-random" /> Random Thread Generator
							</CardHeader>
			<CardBlock className="card-body">
				<button className="btn btn-primary" onClick={generateRandomThread}>Generate</button>
				<RandomThreadDisplay thread={randomThread} />
			</CardBlock>
		</Card>
	);
};
RandomThreadCard.propTypes = propTypes;
export default RandomThreadCard;
