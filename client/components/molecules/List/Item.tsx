import React from 'react'
import {spaces, typography} from 'styles';


interface Props {
    children: React.ReactNode
}

const classes = {
    root: 'list-item'
}

const List = ({children}: Props) => (
        <div className={classes.root}>
            {children}
            <style jsx>{`
                .list-item {
                    margin: ${spaces.s6} 0;
                    font-size: ${typography.fontSize.fs21};
                    line-height: ${typography.lineHeight.lh40};
                }
            `}</style>
        </div>
    )

List.classes = classes

export default List