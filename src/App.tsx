import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

const App: React.FC = () => {
	return (
		<div>
			<Button
				disabled
				onClick={() => console.log(1)}
			>11111</Button>
			<Button
				autoFocus
				type={ButtonType.Primary}
				size={ButtonSize.Small}
				onClick={() => console.log(2)}
			>11111</Button>
			<Button
				type={ButtonType.Danger}

			>11111</Button>
			<div style={{padding: '10px', boxSizing: 'border-box'}}>
				<Alert>11111111111</Alert>
			</div>
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
				<Menu defaultIndex={0} onSelect={() => {console.log(111111111111)}}>
					<MenuItem>
						选项1
					</MenuItem>
					<MenuItem>
						选项2
					</MenuItem>
					<MenuItem>
						选项3
					</MenuItem>
				</Menu>
			</div>
		</div>
	);
}

export default App;
