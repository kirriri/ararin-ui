import React, { 
    ReactElement, 
    InputHTMLAttributes,
    FC,
    ChangeEvent
} from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames'
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
    /**
     * 是否禁用 Input
     */
    disabled?: boolean,
    /**
     * 设置Input 大小，参数可选lg 或者 sm
     */
    size?: InputSize,
    /**
     * 设置图标
     */
    icon?: IconProp,
    /**
     * 添加前缀 用于配置一些固定组合
     */
    prepend?: string | ReactElement,
    /**
     * 添加后缀 用于配置一些固定组合
     */
    append?: string | ReactElement,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = props => {
    const {
        disabled,
        size,
        icon,
        prepend,
        append,
        style,
        ...restProps
    } = props
    const classes = classNames('ararin-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend        
    })

    const fixControlledValue = (value: any) => {
        if(typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }
    
    if('value' in props) {
        delete restProps['defaultValue']
        restProps.value = fixControlledValue(props.value)
    }
    
    return (
        <div className={classes} style={style}>
            { prepend && <div className="ararin-input-group-prepend">{prepend}</div> }
            {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}></Icon></div> }
            <input 
                className="ararin-input-inner"
                disabled={disabled}
                {...restProps}
            />
            {append && <div className="ararin-input-group-append">{append}</div>}
        </div>
    )
}

export default Input;