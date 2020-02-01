import React, { useState } from 'react';
import styled from 'styled-components'
import { Icon, Row, TreeSelect, Select, Drawer, Form } from 'antd';
import { TabBar } from 'antd-mobile';

import { useSelector, useDispatch } from 'react-redux';

import subredditsTree from '../utils/subredditsTree';
import { actions } from '../redux/duck';

const { updateFilters } = actions;
const { Option } = Select;

const SelectTime = ({ time, handleChange }) => (
	<StyledSelect value={time} onChange={(time) => handleChange({ time })}>
		<Option value="hour">Past Hour</Option>
		<Option value="day">Past 24 Hours</Option>
		<Option value="week">Past Week</Option>
		<Option value="month">Past Month</Option>
		<Option value="year">Past Year</Option>
		<Option value="all">All Time</Option>
	</StyledSelect>
)
const SelectOrder = ({ order, handleChange }) => (
	<StyledSelect value={order} onChange={(order) => handleChange({ order })}>
		<Option value="hot">Hot</Option>
		<Option value="new">New</Option>
		<Option value="top">Top</Option>
		<Option value="controversial">Controversial</Option>
	</StyledSelect>
)
const SelectSubreddits = ({ subreddits, handleChange }) => (
	<SubredditSelect
		value={subreddits}
		onChange={(subreddits) => handleChange({ subreddits })}
		treeData={subredditsTree}
		treeCheckable
		allowClear
		showCheckedStrategy={'SHOW_PARENT'}
		showSearch={false}
		searchPlaceholder="Select subreddits"
	/>
)

// anyadir opcion de columnas
const AppMenu = React.memo((props: any) => {
	const [filtersDrawer, setFiltersDrawer] = useState(false)
	const { time, order, subreddits } = useSelector(state => state);
	const dispatch = useDispatch();

	const handleToggleDrawer = (setDrawer, val) => {
		setFiltersDrawer(false);
		setDrawer(val);
	}

	const handleChange = (newValue) => {
		dispatch(updateFilters(newValue));
	}

	return (
		<MenusContainer>
			<MenuBar type="flex">
				<SelectOrder order={order} handleChange={handleChange} />
				{
					order === 'top' || order === 'controversial'
						? <SelectTime time={time} handleChange={handleChange}/> 
						: null
				}
				<SelectSubreddits subreddits={subreddits} handleChange={handleChange}/>
			</MenuBar>

			<MenuDrawer
				title="Sort"
				placement={'bottom'}
				visible={filtersDrawer}
				onClose={() => setFiltersDrawer(false)}
			>
				<Form layout="vertical">
					<Form.Item label="Order:">
						<SelectOrder order={order} handleChange={handleChange} />
					</Form.Item>
					{order === 'top' || order === 'controversial'
						? (
							<Form.Item label="Show posts since:">
								<SelectTime time={time} handleChange={handleChange}/>
							</Form.Item>
						)
						: null
					}
					<Form.Item label="Subreddits:">
						<SelectSubreddits subreddits={subreddits} handleChange={handleChange}/>
					</Form.Item>
				</Form>
			</MenuDrawer>

			<TabBar>
				<TabBar.Item
					key="filters"
					title="Filters"
					icon={<Icon type="filter" />}
					selectedIcon={<Icon type="filter" style={{ color: '#08c' }} />}
					onPress={() => handleToggleDrawer(setFiltersDrawer, !filtersDrawer)}
				/>
			</TabBar> 
		</MenusContainer>
	)
})

export default AppMenu;

// Styles
const MenusContainer = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100;
	@media (min-width: 640px) {
		top: 0;
		bottom: unset;
		.am-tab-bar{
			display: none;
		}
	}
`;
const MenuBar = styled(Row)`
	display: none;
	@media (min-width: 640px) {display: flex;}

	width: 100vw;
	padding: 0 20px !important;
	height: 50px;
	align-items: center;
	background: white;
`;
const StyledSelect = styled(Select)`
	width: 200px;
	margin-right: 20px !important;
`;
const SubredditSelect = styled(TreeSelect)`
	width: 300px;
	margin-right: 20px !important;
	.ant-select-selection--multiple {
		overflow: hidden;
		height: 32px;
	}
	.ant-select-selection__rendered {
		display: inline-flex;
	}
`;
const MenuDrawer = styled(Drawer)`
	z-index: 99 !important;
	.ant-drawer-content-wrapper {
		height: auto !important;
		padding-bottom: 50px;
	}
`;
