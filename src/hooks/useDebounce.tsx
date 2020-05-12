import { useState, useEffect } from 'react'

const useDebounce = (value: any, delay = 300) => {
    const [ debounceValue, setDebounceValue ] = useState(value)
    useEffect(() => {
        const hanlder = window.setTimeout(() =>{
            setDebounceValue(value)
        }, delay)
        return () => {
            clearTimeout(hanlder)
        }
    }, [value, delay])
    return debounceValue
}

export default useDebounce