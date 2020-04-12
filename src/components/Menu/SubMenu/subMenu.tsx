import React, { useContext, FunctionComponentElement } from 'react'
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
    const context = useContext(MenuContext)
    const classes = classNames('ararin-menu-item ararin-submenu-item', className, {
        'is-active': context.index === index
    })
    const renderChildren = () => {
        const childrenCpmponent = React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'ArarinMenuItem') {
                return childElement
            }else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
        return(
            <ul className='ararin-submenu'>
                {childrenCpmponent}
            </ul>
        )
    }
    return(
        <li
            key={index}
            className={classes}
        >
            <div className="ararin-submenu-title">
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'ArarinSubMenu'
export default SubMenu