import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getCharactersSortedByIdentifier, getTagsSortedByTagText } from '../../../infrastructure/selectors';
import { closeDeletePublicViewModal, deletePublicView, closeUpsertPublicViewModal, closeUpsertCharacterModal, untrackThread, closeUntrackThreadModal, closeBulkUntrackThreadsModal, bulkUntrackThreads, closeUpsertThreadModal, closeUntrackCharacterModal, untrackCharacter, upsertThread, upsertCharacter, upsertPublicView } from '../../../infrastructure/actions';
import columns from '../../../infrastructure/constants/columns';
import UpsertCharacterModal from './UpsertCharacterModal';
import UpsertThreadModal from './UpsertThreadModal';
import GenericConfirmationModal from './GenericConfirmationModal';
import UpsertPublicViewModal from './UpsertPublicViewModal';

const propTypes = {
	bulkThreadsToEdit: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	bulkUntrackThreads: PropTypes.func.isRequired,
	characterToEdit: PropTypes.shape({}).isRequired,
	closeBulkUntrackThreadsModal: PropTypes.func.isRequired,
	closeDeletePublicViewModal: PropTypes.func.isRequired,
	closeUntrackCharacterModal: PropTypes.func.isRequired,
	closeUntrackThreadModal: PropTypes.func.isRequired,
	closeUpsertCharacterModal: PropTypes.func.isRequired,
	closeUpsertPublicViewModal: PropTypes.func.isRequired,
	closeUpsertThreadModal: PropTypes.func.isRequired,
	deletePublicView: PropTypes.func.isRequired,
	isBulkUntrackThreadsModalOpen: PropTypes.bool.isRequired,
	isDeletePublicViewModalOpen: PropTypes.bool.isRequired,
	isUntrackCharacterModalOpen: PropTypes.bool.isRequired,
	isUntrackThreadModalOpen: PropTypes.bool.isRequired,
	isUpsertCharacterModalOpen: PropTypes.bool.isRequired,
	isUpsertPublicViewModalOpen: PropTypes.bool.isRequired,
	isUpsertThreadModalOpen: PropTypes.bool.isRequired,
	sortedCharacters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	sortedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
	threadToEdit: PropTypes.shape({}).isRequired,
	untrackCharacter: PropTypes.func.isRequired,
	untrackThread: PropTypes.func.isRequired,
	upsertCharacter: PropTypes.func.isRequired,
	upsertPublicView: PropTypes.func.isRequired,
	upsertThread: PropTypes.func.isRequired,
	viewToEdit: PropTypes.shape({}).isRequired
};

function mapStateToProps(state) {
	const {
		ui,
		characters,
		characterToEdit,
		threadToEdit,
		bulkThreadsToEdit,
		viewToEdit
	} = state;
	const sortedCharacters = getCharactersSortedByIdentifier(state);
	const sortedTags = getTagsSortedByTagText(state);
	return {
		isUpsertCharacterModalOpen: ui.isUpsertCharacterModalOpen,
		isUntrackThreadModalOpen: ui.isUntrackThreadModalOpen,
		isBulkUntrackThreadsModalOpen: ui.isBulkUntrackThreadsModalOpen,
		isUpsertThreadModalOpen: ui.isUpsertThreadModalOpen,
		isUntrackCharacterModalOpen: ui.isUntrackCharacterModalOpen,
		isUpsertPublicViewModalOpen: ui.isUpsertPublicViewModalOpen,
		isDeletePublicViewModalOpen: ui.isDeletePublicViewModalOpen,
		characterToEdit,
		characters,
		threadToEdit,
		bulkThreadsToEdit,
		viewToEdit,
		sortedCharacters,
		sortedTags
	};
}

const ModalContainer = (props) => {
	const {
		isUpsertThreadModalOpen,
		isUpsertCharacterModalOpen,
		isUntrackThreadModalOpen,
		isBulkUntrackThreadsModalOpen,
		isUntrackCharacterModalOpen,
		isUpsertPublicViewModalOpen,
		isDeletePublicViewModalOpen,
		characterToEdit,
		threadToEdit,
		bulkThreadsToEdit,
		viewToEdit,
		sortedCharacters,
		sortedTags
	} = props;
	return (
		<div>
			<UpsertThreadModal
				isUpsertThreadModalOpen={isUpsertThreadModalOpen}
				closeUpsertThreadModal={props.closeUpsertThreadModal}
				threadToEdit={threadToEdit}
				submitUpsertThread={props.upsertThread}
				characters={sortedCharacters}
			/>
			<UpsertCharacterModal
				isUpsertCharacterModalOpen={isUpsertCharacterModalOpen}
				closeUpsertCharacterModal={props.closeUpsertCharacterModal}
				submitUpsertCharacter={props.upsertCharacter}
				characterToEdit={characterToEdit}
			/>
			<UpsertPublicViewModal
				isUpsertPublicViewModalOpen={isUpsertPublicViewModalOpen}
				submitUpsertPublicView={props.upsertPublicView}
				closeUpsertPublicViewModal={props.closeUpsertPublicViewModal}
				viewToEdit={viewToEdit}
				characters={sortedCharacters}
				tags={sortedTags}
				columns={columns}
			/>
			<GenericConfirmationModal
				isModalOpen={isUntrackThreadModalOpen}
				submitCallback={props.untrackThread}
				submitButtonText="Untrack"
				closeCallback={props.closeUntrackThreadModal}
				closeButtonText="Cancel"
				data={threadToEdit}
				headerText="Confirm Thread Untracking"
				bodyText={<span>Are you sure you want to untrack <strong>{threadToEdit ? threadToEdit.userTitle : ''}</strong>?</span>}
			/>
			<GenericConfirmationModal
				isModalOpen={isBulkUntrackThreadsModalOpen}
				submitCallback={props.bulkUntrackThreads}
				submitButtonText="Untrack"
				closeCallback={props.closeBulkUntrackThreadsModal}
				closeButtonText="Cancel"
				data={bulkThreadsToEdit}
				headerText="Confirm Thread Untracking"
				bodyText={`Are you sure you want to untrack ${bulkThreadsToEdit.length} threads?`}
			/>
			<GenericConfirmationModal
				isModalOpen={isUntrackCharacterModalOpen}
				submitCallback={props.untrackCharacter}
				submitButtonText="Untrack"
				closeCallback={props.closeUntrackCharacterModal}
				closeButtonText="Cancel"
				data={characterToEdit}
				headerText="Confirm Character Untracking"
				bodyText={
					<span>Are you sure you want to untrack{' '}
						<strong>
							{characterToEdit.characterName
								? characterToEdit.characterName
								: characterToEdit.urlIdentifier}
						</strong>? This will also untrack all threads associated with this character.
					</span>}
			/>
			<GenericConfirmationModal
				isModalOpen={isDeletePublicViewModalOpen}
				submitCallback={props.deletePublicView}
				submitButtonText="Delete"
				closeCallback={props.closeDeletePublicViewModal}
				closeButtonText="Cancel"
				data={viewToEdit}
				headerText="Confirm Public View Deletion"
				bodyText={<span>Are you sure you want to delete <strong>{viewToEdit.name}</strong>?</span>}
			/>
		</div>
	);
};

ModalContainer.propTypes = propTypes;
export default connect(mapStateToProps, {
	closeUpsertThreadModal,
	closeUntrackThreadModal,
	closeUpsertCharacterModal,
	untrackThread,
	closeBulkUntrackThreadsModal,
	bulkUntrackThreads,
	upsertThread,
	upsertCharacter,
	untrackCharacter,
	closeUntrackCharacterModal,
	upsertPublicView,
	closeUpsertPublicViewModal,
	closeDeletePublicViewModal,
	deletePublicView
})(ModalContainer);
