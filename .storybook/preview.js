import {
	withInfo
} from '@storybook/addon-info';
import {
	configure,
	addDecorator,
	addParameters
} from '@storybook/react';
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import './fix_info_style.scss'
import '../src/styles/index.scss'

library.add(fas)
const wrapperStyle = {
	padding: '20px 40px',
	width: '500px'
}

const storyWrapper = stroyFn => (  
		<div style = { wrapperStyle } >
			<h3> 组件演示 </h3> 
			{stroyFn()} 
		</div>
	)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({
	info: {
		inline: true,
		header: false
	}
})

const loaderFn = () => {
	return [
		require('../src/components/Button/button.stories.tsx'),
	]
}

configure(loaderFn, module);