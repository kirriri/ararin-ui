import React, { useState, useEffect } from 'react';
import axios from 'axios'
// import Button from './components/Button/button'
// import Alert, { AlertType } from './components/Alert/alert'
// import Menu from './components/Menu/menu';
// import MenuItem from './components/Menu/MenuItem/menuItem'
// import SubMenu from './components/Menu/SubMenu/subMenu'
// import Icon from './components/Icon/icon'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import Transition from './components/Transition/transition';
import Upload from './components/upLoad/upload';

library.add(fas)

const App: React.FC = () => {

	const [ title, setTitle ] = useState(false)

	useEffect(() => {
		axios.get('http://jsonplaceholder.typicode.com/posts/1')
			.then(resp => {
				console.log('config', resp.config)
				console.log('data', resp.data)
				console.log('headers', resp.headers)
				console.log('request', resp.request)
				console.log('status', resp.status)
				console.log('statusText', resp.statusText)
			})
	})
	
	return (
		<div>
			<Upload
				action="http://jsonplaceholder.typicode.com/posts/1"
			>

			</Upload>
		</div>
	);
}

export default App;
