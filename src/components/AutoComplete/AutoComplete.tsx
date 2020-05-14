import React, { FC, useState, KeyboardEvent, ChangeEvent, ReactElement, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

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
    const [ inputValue, setInputValue ] = useState(value as string)
    const [ loading, setLoading ] = useState(false)
    const useDebounceValue = useDebounce(inputValue, 500)
    const [ highlightIndex, setHighlightIndex ] = useState(-1)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    useClickOutside(componentRef, () => {
        setSuggestion([])
    })
    useEffect(() => {
        if(useDebounceValue && triggerSearch) {
            const result = fetchSuggestions(useDebounceValue)
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
        setHighlightIndex(-1)
    }, [useDebounceValue])
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value),
        setSuggestion([])
        if(onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }

    const highlight = (index: number) => {
        if(index < 0) 
            index = 0
        if(index >= suggestion.length)
            index =suggestion.length - 1
        console.log(index)
        setHighlightIndex(index)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch(e.keyCode) {
            // 回车
            case 13:
                if(suggestion[highlightIndex]) {
                    handleSelect(suggestion[highlightIndex])
                }
                break;
            // 向上
            case 38:
                highlight(highlightIndex - 1)
                break;
            // 向下
            case 40:
                highlight(highlightIndex + 1)
                break;
            case 27:
                setSuggestion([])
                break;
            default:
                break;
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
                    suggestion.map((item, index) => {
                        const cnames = classNames('suggestion-item', {
                            'item-highlighted': index === highlightIndex
                        })
                        return (
                                <li 
                                    className={cnames}
                                    onClick={() => handleSelect(item)}
                                    key={index}
                                >
                                    {renderTemplate(item)}
                                </li>
                            )
                        } 
                    )
                }
            </ul>
        )
    }

    return (
        <div className="ararin-auto-compolete" ref={componentRef}>
            <Input 
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            { loading && <div><Icon icon="spinner" spin></Icon></div>}
            { !loading && suggestion.length > 0 && generateDropDown() }
        </div>
    )
}


export default AutoComplete;