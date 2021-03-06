import React, { 
    FC,
    ButtonHTMLAttributes,
    AnchorHTMLAttributes
 } from 'react'
import classNames from 'classnames'

type ButtonSize = 'lg' | 'sm'

type ButtonType = 'primary' | 'default' | 'warning' | 'danger' | 'link'

interface BaseButtonProps {
    className?: string;
    /**
     * 设置 Button 禁用
     */
    disabled?: boolean;
    size?: ButtonSize;
    type?: ButtonType;
    children: React.ReactNode;
    href?: string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * ### Button组件
 * ##### Button Header
 * ~~~js
 * import { Button } from 'ararin-ui'
 * ~~~
 */
export const Button: FC<ButtonProps> = props => {
    const { 
        type,
        disabled,
        size,
        className,
        children,
        href,
        ...restProps
    } = props
    // btn btn-primary
    const classes = classNames('btn', className, {
        [`btn-${type}`] : type,
        [`btn-${size}`] : size,
        'disabled': (type === "link") && disabled
    })
    if(type === "link" && href) {
        return (
            <a
                {...restProps}
                className={classes}
                href={href}
            >{children}</a>
        )
    }else {
        return (
            <button
                {...restProps}
                className={classes}
                disabled={disabled}
            >{children}</button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    type: "default"
} 

export default Button;