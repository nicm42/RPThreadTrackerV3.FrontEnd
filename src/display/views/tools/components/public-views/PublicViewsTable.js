import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import columns from './_columns';
import getTdProps from './_getTdProps';

const propTypes = {
	publicViews: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	openUpsertPublicViewModal: PropTypes.func.isRequired,
	openDeletePublicViewModal: PropTypes.func.isRequired
};

const PublicViewsTable = (props) => {
	const {
		publicViews,
		openUpsertPublicViewModal,
		openDeletePublicViewModal
	} = props;
	return (
		<div className="public-views-table">
			<ReactTable
				className="-striped"
				data={publicViews}
				columns={columns}
				defaultSorted={[{ id: 'name' }]}
				pageSize={10}
				getTdProps={getTdProps(
					openDeletePublicViewModal,
					openUpsertPublicViewModal
				)}
				noDataText="You have not yet created any public views."
			/>
		</div>
	);
};
PublicViewsTable.propTypes = propTypes;
export default PublicViewsTable;
