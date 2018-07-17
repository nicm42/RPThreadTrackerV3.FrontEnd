// #region imports
import React from 'react';
import { shallow } from 'enzyme';
import DashboardSummaryWidget from '../DashboardSummaryWidget';
// #endregion imports

// #region mocks
jest.mock('../../../../../shared/LoadingIndicator', () => 'LoadingIndicator');
const history = require('../../../../../../utility/history'); // eslint-disable-line import/newline-after-import
history.navigation.navigateTo = jest.fn();
// #endregion mocks

const createTestProps = propOverrides => ({
	header: 33,
	href: '/my-path',
	icon: 'icon-list',
	isLoadingIconVisible: false,
	...propOverrides
});

describe('rendering', () => {
	describe('snapshots', () => {
		it('should render valid snapshot', () => {
			const props = createTestProps();
			const jsx = (<DashboardSummaryWidget {...props}>Test</DashboardSummaryWidget>);
			const element = shallow(jsx);
			expect(element).toMatchSnapshot();
		});
		it('should render valid snapshot with loading indicator', () => {
			const props = createTestProps({ isLoadingIconVisible: true });
			const jsx = (<DashboardSummaryWidget {...props}>Test</DashboardSummaryWidget>);
			const element = shallow(jsx);
			expect(element).toMatchSnapshot();
		});
	});
});

describe('behavior', () => {
	describe('onClick', () => {
		it('should navigate to href path', () => {
			const props = createTestProps();
			const jsx = (<DashboardSummaryWidget {...props}>Test</DashboardSummaryWidget>);
			const element = shallow(jsx);
			element.find('Card').props().onClick();
			expect(history.navigation.navigateTo).toHaveBeenCalledTimes(1);
			expect(history.navigation.navigateTo).toHaveBeenLastCalledWith('/my-path');
		});
	});
});
