import React, { useContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from '../menu'
import { MenuItemProps } from '../MenuItem/menuItem'
import Icon from '../../Icon/icon'
import Transition from '../../Transition/transition'

export interface SubMenuProps {
    index?: string,
    title: string,
    className?: string
}

const SubMenu: React.FC<SubMenuProps>  = props => {
    const {
        index,
        title,
        className,
        children
    } = props
    const context = useContext(MenuContext)
    const openSubMenus = context.defaultOpenSubmenus as Array<string>
    const isOpend = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false
    const [ menuOpen, setMenuOpen ] = useState(isOpend)
    const classes = classNames('ararin-menu-item ararin-submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        console.log(e.target)
        setMenuOpen(!menuOpen)
    }

    let timer: any
    const handleMouse = (e: React.MouseEvent, toogle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setMenuOpen(toogle)
        }, 300)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : { }
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : { }
    const renderChildren = () => {
        const subMenuClasses = classNames('ararin-submenu', {
            'menu-opened': menuOpen
        })
        const childrenCpmponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'ArarinMenuItem' || childElement.type.displayName === 'ArarinSubMenu') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            }else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
        return(
            <Transition
                in={menuOpen}
                timeout={300}
                animation="zoom-in-top"
                appear
                unmountOnExit
            >
                <ul className={subMenuClasses}>
                    {childrenCpmponent}
                </ul>
            </Transition>
        )
    }
    return(
        <li
            key={index}
            className={classes}
            {...hoverEvents}
        >
            <div 
                className="ararin-submenu-title"
                onClick={handleClick}
                {...clickEvents}
            >
                {title}
                <Icon icon="angle-down" className="arrow-icon" style={{transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}/>
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'ArarinSubMenu'
export default SubMenu