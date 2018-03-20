import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import validator from './_validator';
import formData from './_formData';
import UpsertCharacterForm from './UpsertCharacterForm';
import TooltipForm from '../TooltipForm';

const propTypes = {
	isUpsertCharacterModalOpen: PropTypes.bool.isRequired,
	submitUpsertCharacter: PropTypes.func.isRequired,
	closeUpsertCharacterModal: PropTypes.func.isRequired,
	characterToEdit: PropTypes.shape({}).isRequired
};

class UpsertCharacterModal extends React.Component {
	constructor() {
		super();
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {};
	}

	componentWillReceiveProps(nextProps) {
		const { characterToEdit } = nextProps;
		this.setState({
			characterToEdit: Object.assign({}, this.state.characterToEdit, characterToEdit)
		});
	}

	handleInputChange(event) {
		const { target } = event;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { name } = target;
		this.setState({
			characterToEdit: Object.assign({}, this.state.characterToEdit, {
				[name]: value
			})
		});
	}
	render() {
		const {
			isUpsertCharacterModalOpen,
			submitUpsertCharacter,
			closeUpsertCharacterModal,
			characterToEdit
		} = this.props;
		if (!characterToEdit) {
			return (
				<div />
			);
		}
		return (
			<Modal isOpen={isUpsertCharacterModalOpen} toggle={closeUpsertCharacterModal} backdrop>
				<AvForm onValidSubmit={() => submitUpsertCharacter(this.state.characterToEdit)}>
					<ModalHeader toggle={closeUpsertCharacterModal}>{characterToEdit.id ? 'Edit Character' : 'Add Character'}</ModalHeader>
					<ModalBody>
						<TooltipForm
							Renderable={UpsertCharacterForm}
							characterToEdit={characterToEdit}
							validator={validator}
							formData={formData}
							handleInputChange={this.handleInputChange}
						/>
					</ModalBody>
					<ModalFooter>
						<Button color="primary">Submit Character</Button>{' '}
						<Button color="secondary" onClick={closeUpsertCharacterModal}>Cancel</Button>
					</ModalFooter>
				</AvForm>
			</Modal>
		);
	}
}

UpsertCharacterModal.propTypes = propTypes;
export default UpsertCharacterModal;
