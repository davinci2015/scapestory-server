import {throttle} from 'lodash'
import {useEffect, useState} from 'react'

const throttleTime = 200

interface ScrollPosition {
    x: number
    y: number
}

const useScrollPosition = (): {position: ScrollPosition, handleScroll: () => void} => {
    const [position, setPosition] = useState({x: 0, y: 0})

    const handleScroll = throttle(() => setPosition({x: window.pageXOffset, y: window.pageYOffset}), throttleTime)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return {position, handleScroll}
}

export default useScrollPosition
