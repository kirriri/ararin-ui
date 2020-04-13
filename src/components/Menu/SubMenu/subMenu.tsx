import React, { useContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from '../menu'
import { MenuItemProps } from '../MenuItem/menuItem'

export interface SubMenuProps {
    index?: number,
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
    const [ menuOpen, setMenuOpen ] = useState(false)
    const context = useContext(MenuContext)
    const classes = classNames('ararin-menu-item ararin-submenu-item', className, {
        'is-active': context.index === index
    })
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
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
    } : {}
    const renderChildren = () => {
        const subMenuClasses = classNames('ararin-submenu', {
            'menu-opened': menuOpen
        })
        const childrenCpmponent = React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'ArarinMenuItem') {
                return childElement
            }else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
        return(
            <ul className={subMenuClasses}>
                {childrenCpmponent}
            </ul>
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
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'ArarinSubMenu'
export default SubMenu