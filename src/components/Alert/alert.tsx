import React from 'react'
import classNames from 'classnames'

export enum AlertType {
    Default = 'default',
    Success = 'success',
    Danger = 'danger',
    Warning = 'warning'
}

interface BaseAlertProps {
    className?: string,
    type?: AlertType,
    title?: string,
    canClose?: boolean
}

export type AlertProps = BaseAlertProps & React.HTMLAttributes<HTMLDivElement>

const Alert: React.FC<AlertProps> = props => {
    const {
        children,
        className,
        type,
        title,
        canClose,
        ...restProps
    } = props
    
    const classes = classNames('ararin-alert', className, {
        [`ararin-alert-${type}`]: type,
    })
    return (
        <div 
            className={classes}
            {...restProps}
        >
            { (title !== undefined && title !== null) && <h4 className="ararin-alert-tit">{title}</h4> }
            <div>{children}</div>
            { canClose && <span className="ararin-alert-close">x</span> }
        </div>
    )
}

Alert.defaultProps = {
    canClose: true,
    type: AlertType.Default
}

export default Alert