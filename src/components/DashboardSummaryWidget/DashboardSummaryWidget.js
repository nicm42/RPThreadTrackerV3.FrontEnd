import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Card, CardBlock, Progress } from "reactstrap";
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
	header: PropTypes.string,
	icon: PropTypes.string,
	color: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	cssModule: PropTypes.object,
	invert: PropTypes.bool
};

const defaultProps = {
	header: '87.500',
	icon: "icon-people",
	color: 'info',
	children: "Visitors",
	invert: false
};

class DashboardSummaryWidget extends Component {
	render() {
		const { className, cssModule, header, icon, color, children, invert, ...attributes } = this.props;

		// demo purposes only
		const progress = { style: "", color: color, value: 100 };
		const card = { style: "", bgColor: "", icon: icon };

		if (invert) {
			progress.style = "progress-white";
			progress.color = "";
			card.style = "text-white";
			card.bgColor = 'bg-' + color;
		}

		const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);
		progress.style = classNames("progress-xs mt-3 mb-0", progress.style);

		return (
			<Card className={classes} {...attributes}>
				<CardBlock className="card-body">
					<div className="h1  text-right mb-2">
						<i className={card.icon}></i>
					</div>
					<div className="h4 mb-0">{header}</div>
					<small className=" text-uppercase font-weight-bold">{children}</small>
					<Progress className={progress.style} color={progress.color} value={progress.value} />
				</CardBlock>
			</Card>
		)
	}
}

DashboardSummaryWidget.propTypes = propTypes;
DashboardSummaryWidget.defaultProps = defaultProps;

export default DashboardSummaryWidget;
