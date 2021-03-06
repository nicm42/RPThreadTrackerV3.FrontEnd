// #region imports
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, CardBody } from 'reactstrap';

import { toast } from 'react-toastify';
import Card from '../shared/styled/Card';
import LoadingIndicator from '../shared/loading/LoadingIndicator';
import UpsertThreadModal from '../shared/modals/UpsertThreadModal';

import { getThreadDataFromExtensionQuery } from '../../utility';
import { useCharactersQuery } from '~/infrastructure/hooks/queries';
import { useCreateThreadMutation } from '~/infrastructure/hooks/mutations';
// #endregion imports

const AddThreadFromExtensionHandler = () => {
	const [threadData, setThreadData] = useState({});
	const [isUpsertThreadModalOpen, setIsUpsertThreadModalOpen] = useState(false);
	const {
		data: characters,
		isLoading: isCharactersLoading,
		isError: isCharactersFetchError
	} = useCharactersQuery();
	const {
		createThread,
		isLoading: isCreateThreadLoading,
		isSuccess: isFormSubmitSuccess
	} = useCreateThreadMutation();
	useEffect(() => {
		if (characters) {
			setThreadData(getThreadDataFromExtensionQuery(characters));
			setIsUpsertThreadModalOpen(true);
		}
	}, [characters]);

	const submitCreateThread = (thread) => {
		createThread(thread)
			.then(() => {
				setIsUpsertThreadModalOpen(false);
			})
			.catch(() => {
				toast.error(`There was an error tracking this thread.`);
			});
	};

	const renderLoadingIndicator = () => {
		return (
			<LoadingIndicator
				data-spec="extension-handler-loader"
				style={{
					width: 50,
					height: 50,
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)'
				}}
			/>
		);
	};

	const renderLayout = (message = '') => {
		return (
			<div className="app flex-row align-items-center" data-spec="layout-app">
				<UpsertThreadModal
					isModalOpen={isUpsertThreadModalOpen}
					setIsModalOpen={setIsUpsertThreadModalOpen}
					submitForm={submitCreateThread}
					isLoading={isCreateThreadLoading}
					characters={characters}
					threadToEdit={threadData}
				/>
				{message && (
					<Container data-spec="extension-handler-success-message">
						<Row className="justify-content-center">
							<Col md="6">
								<Card className="login-box p-4">
									<CardBody className="card-body text-center">
										<p>{message}</p>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</Container>
				)}
				)
			</div>
		);
	};
	if (isCharactersLoading) {
		return renderLoadingIndicator();
	}
	let message = '';
	if (isCharactersFetchError) {
		message = 'There was an error retrieving your account information.';
	}
	if (isFormSubmitSuccess) {
		message = 'You may now close this window.';
	}
	return renderLayout(message);
};

export default AddThreadFromExtensionHandler;
