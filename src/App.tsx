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

	
	
	return (
		<div>
			
		</div>
	);
}

export default App;
