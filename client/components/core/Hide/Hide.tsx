import React, {useEffect, useState} from 'react'

export const GRID_WIDTH_DEFAULT = '1470px'
export const GRID_WIDTH_SMALL = '727px'
export const GUTTER = 15
export const COLUMNS = 12

interface Props {
    upTo?: number
    after?: number
}

const Hide: React.FunctionComponent<Props> = ({after, children, upTo}) => {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        window.addEventListener('resize', onResize)
        onResize()

        return () => window.removeEventListener('resize', onResize)
    }, [])

    const onResize = () => {
        setWidth(window.innerWidth)
    }

    if (upTo && upTo > width) {
        return null
    }

    if (after && after < width) {
        return null
    }

    return <>{children}</>
}

export default Hide
