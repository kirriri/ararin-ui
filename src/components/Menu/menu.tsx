import React, { useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './MenuItem/menuItem';

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: string) => void

export interface MenuProps {
    defaultIndex?: string,
    className?: string,
    mode?: MenuMode,
    style?: React.CSSProperties,
    onSelect?: SelectCallback,
    defaultOpenSubmenus?: string[]
}

interface IMenuContext {
    index: string,
    onSelect?: SelectCallback,
    mode?: MenuMode,
    defaultOpenSubmenus?: string[]
}

export const MenuContext = React.createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<MenuProps> = props => {
    const {
        className,
        defaultIndex,
        children,
        style,
        mode,
        onSelect,
        defaultOpenSubmenus
    } = props
    const [currentActive, setCurrentActive] = useState(defaultIndex)
    const classess = classNames('ararin-menu', className, {
        'ararin-menu-vertical': mode === 'vertical',
        'ararin-menu-horizontal': mode !== 'vertical'
    })

    const handleClick = (index: string) => {
        setCurrentActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubmenus
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if(displayName === 'ArarinMenuItem' || displayName === 'ArarinSubMenu') {
                return React.cloneElement(childElement, { 
                    index: index.toString()
                })
            }else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
    }

    return (
        <ul className={classess} style={style}>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubmenus: []
}

export default Menu