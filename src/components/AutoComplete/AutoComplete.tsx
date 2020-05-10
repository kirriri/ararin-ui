import React, { FC, useState, ChangeEvent, ReactElement } from 'react'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon';

export interface DataSourceObject {
    value: string,
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOptions?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = props => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOptions,
        ...restProps
    } = props

    const [ suggestion, setSuggestion ] = useState<DataSourceType[]>([])
    const [ inputValue, setInputValue ] = useState(value)
    const [ loading, setLoading ] = useState(false)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        if(value) {
            const result = fetchSuggestions(value)
            if(result instanceof Promise) {
                console.log('1111111')
                setLoading(true)
                result.then(data => {
                    setLoading(false)
                    setSuggestion(data)
                })
            }else {
                setSuggestion(result)
            }
        }else {
            setSuggestion([])
        }
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value),
        setSuggestion([])
        if(onSelect) {
            onSelect(item)
        }
    }

    const renderTemplate = (item: DataSourceType) => {
        console.log(item)
        return renderOptions ? renderOptions(item) : item.value
    } 

    const generateDropDown = () => {
        return (
            <ul>
                {
                    suggestion.map((item, index) => 
                        <li 
                            onClick={() => handleSelect(item)}
                            key={index}
                        >
                            {renderTemplate(item)}
                        </li>
                    )
                }
            </ul>
        )
    }

    return (
        <div className="ararin-auto-compolete">
            <Input 
                value={inputValue}
                onChange={handleChange}
                {...restProps}
            />
            { loading && <div><Icon icon="spinner" spin></Icon></div>}
            { !loading && suggestion.length > 0 && generateDropDown() }
        </div>
    )
}


export default AutoComplete;