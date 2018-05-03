import React from 'react';
import { shallow } from 'enzyme';
import { getSpecWrapper } from '../../../../../../utility/testHelpers';
import AtAGlanceCard from '../AtAGlanceCard';

const createTestProps = propOverrides => ({
	// common props
	showDashboardThreadDistribution: true,
	showDashboardThreadDistributionToggle: jest.fn(),
	myTurnThreads: [{}],
	theirTurnThreads: [{}, {}],
	activeThreads: [{}, {}, {}, {}, {}, {}],
	queuedThreads: [{}, {}, {}],
	threadsLoading: false,
	...propOverrides
});

describe('rendering', () => {
	it('should render valid snapshot', () => {
		const props = createTestProps();
		const jsx = (<AtAGlanceCard {...props} />);
		const element = shallow(jsx);
		expect(element).toMatchSnapshot();
	});
	it('should render card header', () => {
		const props = createTestProps();
		const jsx = (<AtAGlanceCard {...props} />);
		const element = shallow(jsx);
		const header = getSpecWrapper(element, 'at-a-glance-card-header');
		expect(header).toExist();
	});
	it('should render card header icon', () => {
		const props = createTestProps();
		const jsx = (<AtAGlanceCard {...props} />);
		const element = shallow(jsx);
		const icon = getSpecWrapper(element, 'at-a-glance-card-icon');
		expect(icon).toExist();
		expect(icon).toHaveClassName('fa-search');
	});
	it('should render card header toggle state', () => {
		const props = createTestProps();
		const props2 = createTestProps({ showDashboardThreadDistribution: false });
		const jsx = (<AtAGlanceCard {...props} />);
		const jsx2 = (<AtAGlanceCard {...props2} />);
		const element = shallow(jsx);
		const element2 = shallow(jsx2);
		const toggle = getSpecWrapper(element, 'at-a-glance-card-toggle');
		const toggle2 = getSpecWrapper(element2, 'at-a-glance-card-toggle');
		expect(toggle).toExist();
		expect(toggle2).toExist();
		expect(toggle).toHaveProp('checked', true);
		expect(toggle2).toHaveProp('checked', false);
	});
	it('should render card body with correct visibility', () => {
		const props = createTestProps();
		const props2 = createTestProps({ showDashboardThreadDistribution: false });
		const jsx = (<AtAGlanceCard {...props} />);
		const jsx2 = (<AtAGlanceCard {...props2} />);
		const element = shallow(jsx);
		const element2 = shallow(jsx2);
		const body = getSpecWrapper(element, 'at-a-glance-card-body');
		const body2 = getSpecWrapper(element2, 'at-a-glance-card-body');
		expect(body).toExist();
		expect(body2).toExist();
		expect(body).toHaveClassName('card-body');
		expect(body2).toHaveClassName('d-none');
	});
	it('should pass correct values to active widget', () => {
		const props = createTestProps();
		const jsx = (<AtAGlanceCard {...props} />);
		const element = shallow(jsx);
		const widget = getSpecWrapper(element, 'at-a-glance-active-widget');
		expect(widget).toExist();
		expect(widget).toHaveProp('icon', 'icon-list');
		expect(widget).toHaveProp('header', 6);
		expect(widget).toHaveProp('threadsLoading', false);
	});
	it('should pass correct values to my turn widget', () => {
		const props = createTestProps();
		const jsx = (<AtAGlanceCard {...props} />);
		const element = shallow(jsx);
		const widget = getSpecWrapper(element, 'at-a-glance-my-turn-widget');
		expect(widget).toExist();
		expect(widget).toHaveProp('icon', 'icon-pencil');
		expect(widget).toHaveProp('header', 1);
		expect(widget).toHaveProp('threadsLoading', false);
	});
	it('should pass correct values to their turn widget', () => {
		const props = createTestProps();
		const jsx = (<AtAGlanceCard {...props} />);
		const element = shallow(jsx);
		const widget = getSpecWrapper(element, 'at-a-glance-their-turn-widget');
		expect(widget).toExist();
		expect(widget).toHaveProp('icon', 'icon-check');
		expect(widget).toHaveProp('header', 2);
		expect(widget).toHaveProp('threadsLoading', false);
	});
	it('should pass correct values to queued widget', () => {
		const props = createTestProps();
		const jsx = (<AtAGlanceCard {...props} />);
		const element = shallow(jsx);
		const widget = getSpecWrapper(element, 'at-a-glance-queued-widget');
		expect(widget).toExist();
		expect(widget).toHaveProp('icon', 'icon-calendar');
		expect(widget).toHaveProp('header', 3);
		expect(widget).toHaveProp('threadsLoading', false);
	});
	it('should display loading icon when threads are loading', () => {
		const props = createTestProps({ threadsLoading: true });
		const jsx = (<AtAGlanceCard {...props} />);
		const element = shallow(jsx);
		const myTurn = getSpecWrapper(element, 'at-a-glance-my-turn-widget');
		const theirTurn = getSpecWrapper(element, 'at-a-glance-their-turn-widget');
		const queued = getSpecWrapper(element, 'at-a-glance-queued-widget');
		expect(myTurn).toHaveProp('threadsLoading', true);
		expect(theirTurn).toHaveProp('threadsLoading', true);
		expect(queued).toHaveProp('threadsLoading', true);
	});
});

describe('behavior', () => {
	it('should set card visibility on toggle change', () => {
		const showDashboardThreadDistributionToggle = jest.fn();
		const props = createTestProps({ showDashboardThreadDistributionToggle });
		const jsx = (<AtAGlanceCard {...props} />);
		const element = shallow(jsx);
		const toggle = getSpecWrapper(element, 'at-a-glance-card-toggle');
		toggle.simulate('change');
		expect(showDashboardThreadDistributionToggle).toHaveBeenCalledTimes(1);
	});
});
