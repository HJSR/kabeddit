import React from 'react';
import styled from 'styled-components'
import { Menu, Icon, Switch, Row, TreeSelect, Select } from 'antd';
import subredditsTree from '../utils/subredditsTree';

const { SubMenu } = Menu;
const { Option } = Select;

const SubMenuTitle = ({ title, icon } : { title: string, icon?: string}) => (
	<span>
		{icon ? <Icon type={icon} /> : null}
		<span>{title}</span>
	</span>
)

const MenuBar = styled(Menu)`
	width: 100vw;
	padding: 0 20px !important;
	display: flex;
    align-items: center;
`;

const StyledSelect  = styled(Select)`
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

type Props = {
	subreddits: string[], setSubreddits: (subreddits: string[]) => void,
	order: string, setOrder: (order: string) => void,
	time: string, setTime: (time: string) => void,
	showNSFW: boolean, setShowNSFW: (showNSFW: boolean) => void,
	onlyNSFW: boolean, setOnlyNSFW: (onlyNSFW: boolean) => void,
}


// anyadir opcion de columnas
const AppMenu = (props: any) => {
	const {
		subreddits, setSubreddits,
		order, setOrder,
		showNSFW, setShowNSFW,
		onlyNSFW, setOnlyNSFW,
		time, setTime,
	}: Props = props;
	return (
		<div>
			<MenuBar 
				mode="horizontal"
			>
				<StyledSelect
					value={order}
					onChange={setOrder}
				>
					<Option value="hot">Hot</Option>
					<Option value="new">New</Option>
					<Option value="top">Top</Option>
					<Option value="rising">Rising</Option>
					<Option value="controversial">Controversial</Option>
				</StyledSelect>

				{order === 'top' || order === 'controversial'
					? (
						<StyledSelect
							value={time}
							onChange={setTime}
						>
							<Option value="hour">Past Hour</Option>
							<Option value="day">Past 24 Hours</Option>
							<Option value="week">Past Week</Option>
							<Option value="month">Past Month</Option>
							<Option value="year">Past Year</Option>
							<Option value="all">Of All Time</Option>
						</StyledSelect>
					)
					: null
				}

				<SubredditSelect
					value={subreddits}
					onChange={setSubreddits}
					treeData={subredditsTree}
					treeCheckable
					allowClear
					searchPlaceholder="Select subreddits or add one"
				/>

				<SubMenu
					key="settings-menu"
					title={<SubMenuTitle title="Settings" icon="setting" />}
				>
					<Menu.Item>
						<Row type="flex" justify="space-between" align="middle">
							<span>Show NSFW </span>
							<Switch
								onChange={setShowNSFW}
								checked={showNSFW}
							/>
						</Row>
					</Menu.Item>
					{showNSFW
						? (
							<Menu.Item>
								<Row type="flex" justify="space-between" align="middle">
									<span>Only NSFW </span>
									<Switch
										onChange={setOnlyNSFW}
										checked={onlyNSFW}
									/>
								</Row>
							</Menu.Item>
						)
						: null
					}
				</SubMenu>
			</MenuBar>
		</div>
	)
}

export default AppMenu;