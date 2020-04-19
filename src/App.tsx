import React, { useState } from 'react';
import Button from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/MenuItem/menuItem'
import SubMenu from './components/Menu/SubMenu/subMenu'
import Icon from './components/Icon/icon'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import Transition from './components/Transition/transition';

library.add(fas)

const App: React.FC = () => {

	const [ show, setShow ] = useState(false)
	
	return (
		<div>
			<Button
				disabled
				onClick={() => console.log(1)}
			>11111</Button> 
			<Button
				autoFocus
				type="primary"
				size='sm'
				onClick={() => console.log(2)}
			>11111</Button>
			<Button
				type="danger"
			>11111</Button>
			<div style={{padding: '10px', boxSizing: 'border-box'}}>
				<Alert>11111111111</Alert>
			</div>
			<Icon icon="coffee" theme="danger" size="10x"></Icon>
			<div style={{padding: '10px', boxSizing: 'border-box'}}>
				<Alert
					canClose={false}
					title="提示标题"
					type={AlertType.Success}
				>this is a long description</Alert>
			</div>
			<div style={{padding: '10px', boxSizing: 'border-box'}}>
				<Alert
					title="提示标题"
					type={AlertType.Warning}
				>this is a long description</Alert>
			</div>
			<div style={{padding: '10px', boxSizing: 'border-box'}}>
				<Alert
					title="提示标题"
					type={AlertType.Danger}
				>this is a long description</Alert>
			</div>

			<div style={{marginTop: '15px'}}>
				<Menu 
					defaultIndex='0' 
					onSelect={() => {console.log(111111111111)}}
					// mode='vertical'
					defaultOpenSubmenus={['1']}
				>
					<MenuItem>
						选项1
					</MenuItem>
					<SubMenu
						title="dropdown"
					>
						<MenuItem>
							test1
						</MenuItem>
						<SubMenu
							title="二级"
						>
							<MenuItem>
								test2
							</MenuItem>
						</SubMenu>
					</SubMenu>
					<MenuItem>
						选项2
					</MenuItem>
					<MenuItem>
						选项3
					</MenuItem>
				</Menu>
			</div>
			<div>
				<Button type="primary" onClick={() => { setShow(!show) }}>开关</Button>
				<Transition
					in={show}
					timeout={300}
					animation="zoom-in-left"
					// wrapper
				>
					{/* <div> */}
						{/* <ul>
							<li>1111111111111111111</li>
							<li>2222222222222222222</li>
							<li>33333333333333333333</li>
							<li>444444444444444444444</li>
							<li>555555555555555555555</li>
						</ul> */}
						<Button type="primary" size="lg">test</Button>
					{/* </div> */}
				</Transition>
			</div>
		</div>
	);
}

export default App;
