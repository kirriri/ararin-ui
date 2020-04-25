import React, { 
    ReactElement, 
    InputHTMLAttributes,
    FC
} from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
    disabled?: boolean,
    size?: 'lg | sm',
    icon?: IconProp,
    prepand?: string | ReactElement,
    append?: string | ReactElement
}

export const Input: FC<InputProps> = props => {
    return (
        <>
        </>
    )
}