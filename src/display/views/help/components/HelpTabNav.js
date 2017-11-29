import React from 'react';
import {
	Nav, NavItem, NavLink
} from 'reactstrap';
import TabNavItemLink from '../../../shared/tabs/TabNavItemLink';

const HelpTabNav = (props) => {
	const { activeTab, setActiveTab } = props;
	return (
		<Nav tabs>
			<TabNavItemLink
				tabId="about"
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				iconId="info-circle"
				title="About RPThreadTracker"
			/>
			<TabNavItemLink
				tabId="support"
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				iconId="question-circle"
				title="Support Topics"
			/>
			<TabNavItemLink
				tabId="contact"
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				iconId="envelope"
				title="Contact Me"
			/>
		</Nav>
	);
}

export default HelpTabNav;
