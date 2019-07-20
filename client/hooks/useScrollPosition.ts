import {throttle} from 'lodash'
import {useEffect, useState} from 'react'

const throttleTime = 100

const useScrollPosition = () => {
    if (typeof window === 'undefined') {
        return { x: 0, y: 0 }
    }

    const [position, setPosition] = useState({x: window.pageXOffset, y: window.pageYOffset})

    const handleScroll = throttle(() => setPosition({x: window.pageXOffset, y: window.pageYOffset}), throttleTime)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return position
}

export default useScrollPosition
