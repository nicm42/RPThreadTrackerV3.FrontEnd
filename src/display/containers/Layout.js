// #region imports
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

import HeaderContainer from '../shared/header/HeaderContainer';
import Sidebar from '../shared/sidebar/Sidebar';
import BreadcrumbWrapper from '../shared/breadcrumb/BreadcrumbWrapper';
import AsideContainer from '../shared/aside/AsideContainer';
import ModalContainer from '../shared/modals/ModalContainer';
import LoadingIndicator from '../shared/loading/LoadingIndicator';
import Footer from '../shared/footer/Footer';

import Dashboard from '../views/dashboard/Dashboard';
import Threads from '../views/threads/Threads';
import AllThreads from '../views/threads/AllThreads';
import MyTurnThreads from '../views/threads/MyTurnThreads';
import TheirTurnThreads from '../views/threads/TheirTurnThreads';
import ArchivedThreads from '../views/threads/ArchivedThreads';
import QueuedThreads from '../views/threads/QueuedThreads';
import ManageCharacters from '../views/characters/ManageCharacters';
import Tools from '../views/tools/Tools';
import Settings from '../views/settings/Settings';
import Help from '../views/help/Help';
import {
	useCharactersQuery,
	useThreadsQuery,
	useUserProfileQuery,
	useUserSettingsQuery
} from '~/infrastructure/hooks/queries';
import { CharactersContext, ThreadsContext } from '~/infrastructure/hooks/contexts';
// #endregion imports

const Layout = () => {
	const { isLoading: isUserProfileLoading } = useUserProfileQuery();
	const { isLoading: isUserSettingsLoading } = useUserSettingsQuery();
	const {
		threadData: activeThreads,
		threadsStatus: activeThreadsStatus,
		isThreadsLoading: isActiveThreadsLoading,
		isThreadsStatusLoading: isActiveThreadsStatusLoading
	} = useThreadsQuery();
	const {
		threadData: archivedThreads,
		threadsStatus: archivedThreadsStatus,
		isThreadsLoading: isArchivedThreadsLoading,
		isThreadsStatusLoading: isArchivedThreadsStatusLoading
	} = useThreadsQuery(true, activeThreads && activeThreads.length);
	const {
		data: characters,
		isLoading: isCharactersLoading,
		isError: isCharactersFetchError
	} = useCharactersQuery();
	const isGlobalLoading = isUserProfileLoading || isUserSettingsLoading;

	const renderLoadingIndicator = () => {
		return (
			<LoadingIndicator
				data-spec="layout-loader"
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

	const renderLayout = () => {
		return (
			<div className="app" data-spec="layout-app">
				<CharactersContext.Provider
					value={{ characters, isCharactersLoading, isCharactersFetchError }}
				>
					<HeaderContainer />
					<div className="app-body">
						<Sidebar />
						<main className="main">
							<BreadcrumbWrapper />
							<ThreadsContext.Provider
								value={{
									activeThreads,
									activeThreadsStatus,
									isActiveThreadsLoading,
									isActiveThreadsStatusLoading,
									archivedThreads,
									archivedThreadsStatus,
									isArchivedThreadsLoading,
									isArchivedThreadsStatusLoading
								}}
							>
								<Container fluid>
									<Switch>
										<Route
											path="/dashboard"
											name="Dashboard"
											component={Dashboard}
										/>
										<Route
											path="threads/*"
											name="Threads"
											component={Threads}
										/>
										<Route
											path="/threads/all"
											name="Threads"
											render={
												/* istanbul ignore next */
												() => <Threads Renderable={AllThreads} />
											}
										/>
										<Route
											path="/threads/your-turn"
											name="Threads"
											render={
												/* istanbul ignore next */
												() => <Threads Renderable={MyTurnThreads} />
											}
										/>
										<Route
											path="/threads/their-turn"
											name="Threads"
											render={
												/* istanbul ignore next */
												() => <Threads Renderable={TheirTurnThreads} />
											}
										/>
										<Route
											path="/threads/archived"
											name="Threads"
											render={
												/* istanbul ignore next */
												() => <Threads Renderable={ArchivedThreads} />
											}
										/>
										<Route
											path="/threads/queued"
											name="Threads"
											render={
												/* istanbul ignore next */
												() => <Threads Renderable={QueuedThreads} />
											}
										/>
										<Route
											path="/manage-characters"
											name="Characters"
											component={ManageCharacters}
										/>

										<Route
											path="/tools/:tabId"
											name="Tools"
											component={Tools}
										/>
										<Redirect from="/tools" to="/tools/export" />

										<Route
											path="/settings/:tabId"
											name="Settings"
											component={Settings}
										/>
										<Redirect from="/settings" to="/settings/change-password" />

										<Route path="/help/:tabId" name="Help" component={Help} />
										<Redirect from="/help" to="/help/about" />

										<Redirect from="/" to="/dashboard" />
									</Switch>
								</Container>
							</ThreadsContext.Provider>
						</main>
						<AsideContainer />
					</div>
					<Footer />
					<ModalContainer />
				</CharactersContext.Provider>
			</div>
		);
	};
	if (isGlobalLoading) {
		return renderLoadingIndicator();
	}
	return renderLayout();
};

export default Layout;
