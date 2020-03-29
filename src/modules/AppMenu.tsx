import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Icon, Row, TreeSelect, Select, Drawer, Form, Switch } from 'antd';
import { TabBar } from 'antd-mobile';

import { useSelector, useDispatch } from 'react-redux';

import subredditsTree from '../utils/subredditsTree';
import { actions } from '../redux/duck';

const { updateFilters, setInitialized } = actions;
const { Option } = Select;

const SelectTime = () => {
	const { time } = useSelector(state => state.filters);
	const dispatch = useDispatch();
	const handleChange = (val) => {
		dispatch(updateFilters({ time: val }))
	}
	return (
		<StyledSelect value={time} onChange={handleChange}>
			<Option value="hour">Past Hour</Option>
			<Option value="day">Past 24 Hours</Option>
			<Option value="week">Past Week</Option>
			<Option value="month">Past Month</Option>
			<Option value="year">Past Year</Option>
			<Option value="all">All Time</Option>
		</StyledSelect>
	)
}

const SelectOrder = () => {
	const { order } = useSelector(state => state.filters);
	const dispatch = useDispatch();
	const handleChange = (val) => dispatch(updateFilters({ order: val }))
	return (
		<StyledSelect value={order} onChange={handleChange}>
			<Option value="hot">Hot</Option>
			<Option value="new">New</Option>
			<Option value="top">Top</Option>
			<Option value="controversial">Controversial</Option>
		</StyledSelect>
	)
}

const NSFWOptions = () => {
	const { showNSFW, blurNSFW } = useSelector(state => state.filters);
	const dispatch = useDispatch();
	const handleChange = (val) => dispatch(updateFilters(val))
	return (
		<div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
			<span style={{ marginRight: 5 }}>NSFW: </span>
			<Switch
				checkedChildren="Show"
				unCheckedChildren="Hide"
				checked={showNSFW}
				onChange={(val) => handleChange({ showNSFW: val })}
			/>
			{
				showNSFW
					? (
						<Switch
							checkedChildren="Blur"
							unCheckedChildren="Clear"
							checked={blurNSFW}
							onChange={(val) => handleChange({ blurNSFW: val })}
							style={{ marginLeft: 5 }}
						/>
					)
					: null
			}
		</div>
	)
}

const ThumbnailsOptions = () => {
	const { showThumbnails } = useSelector(state => state.filters);
	const dispatch = useDispatch();
	const handleChange = (val) => dispatch(updateFilters(val))
	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<span style={{ marginRight: 5 }}>Show thumbnails: </span>
			<Switch
				checkedChildren="On"
				unCheckedChildren="Off"
				checked={showThumbnails}
				onChange={(val) => handleChange({ showThumbnails: val })}
			/>
		</div>
	)
}

const SelectSubreddits = () => {
	const { subreddits } = useSelector(state => state.filters);
	const dispatch = useDispatch();
	const handleChange = (val) => {
		dispatch(updateFilters({ subreddits: val }))
	}
	return (
		<SubredditSelect
			value={subreddits}
			onChange={(val) => {
				console.log(val)
				handleChange(val)
			}}
			treeData={subredditsTree}
			treeCheckable
			allowClear
			showCheckedStrategy={'SHOW_CHILD'}
			showSearch={false}
			searchPlaceholder="Select subreddits"
		/>
	)
}

// anyadir opcion de columnas
const AppMenu = React.memo(() => {
	const [filtersDrawer, setFiltersDrawer] = useState(false)
	const filters = useSelector(state => state.filters);
	const { order } = filters;
	const dispatch = useDispatch();
	
	useEffect(() => {
		const savedState = JSON.parse(localStorage.getItem('filters'));
		dispatch(updateFilters({ ...savedState }));
		dispatch(setInitialized(true));
	}, [dispatch])

	useEffect(() => {
		localStorage.setItem('filters', JSON.stringify(filters));
	}, [filters])

	const handleToggleDrawer = (setDrawer, val) => {
		setFiltersDrawer(false);
		setDrawer(val);
	}

	return (
		<MenusContainer>
			<MenuBar type="flex">
				<SelectOrder />
				{
					order === 'top' || order === 'controversial'
						? <SelectTime /> 
						: null
				}
				<SelectSubreddits />
				<NSFWOptions />
				<ThumbnailsOptions />
			</MenuBar>

			<MenuDrawer
				title="Sort"
				placement={'bottom'}
				visible={filtersDrawer}
				onClose={() => setFiltersDrawer(false)}
			>
				<Form layout="vertical">
					<Form.Item label="Order:">
						<SelectOrder />
					</Form.Item>
					{order === 'top' || order === 'controversial'
						? (
							<Form.Item label="Show posts since:">
								<SelectTime />
							</Form.Item>
						)
						: null
					}
					<Form.Item label="Subreddits:">
						<SelectSubreddits />
					</Form.Item>
					<Form.Item label="">
						<NSFWOptions />
					</Form.Item>
					<Form.Item label="">
						<ThumbnailsOptions />
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
