import { RefObject, useEffect } from 'react'

const useClickOutside = (ref: RefObject<HTMLElement>, hanlder: Function) => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if(!ref.current || ref.current.contains(event.target as HTMLElement)) {
                return
            }
            hanlder(event)
        }
        document.addEventListener('click', listener)
        return () => {
            document.removeEventListener('click', listener)
        }
    }, [ref, hanlder])
}

export default useClickOutside