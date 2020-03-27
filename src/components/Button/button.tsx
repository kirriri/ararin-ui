import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Wranning = 'warnning',
    Danger = 'danger',
    Link = 'link',
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    type?: ButtonType;
    children: React.ReactNode;
    href?: string;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = props => {
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
        'disabled': (type === ButtonType.Link) && disabled
    })
    if(type === ButtonType.Link && href) {
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
    type: ButtonType.Default
}

export default Button