import React, { useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './MenuItem/menuItem';

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: number) => void

export interface MenuProps {
    defaultIndex?: number,
    className?: string,
    mode?: MenuMode,
    style?: React.CSSProperties,
    onSelect?: SelectCallback
}

interface IMenuContext {
    index: number,
    onSelect?: SelectCallback
}

export const MenuContext = React.createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<MenuProps> = props => {
    const {
        className,
        defaultIndex,
        children,
        style,
        mode,
        onSelect,
    } = props
    const [currentActive, setCurrentActive] = useState(defaultIndex)
    const classess = classNames('ararin-menu', className, {
        'ararin-menu-vertical': mode === 'vertical',
        'ararin-menu-horizontal': mode !== 'vertical'
    })
    const handleClick = (index: number) => {
        setCurrentActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if(displayName === 'ArarinMenuItem' || displayName === 'ArarinSubMenu') {
                return React.cloneElement(childElement, { 
                    index
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
    defaultIndex: 0,
    mode: 'horizontal'
}

export default Menu