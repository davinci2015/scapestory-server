import React from 'react'
import {spaces, media} from 'styles';

type Props = {
    children: React.ReactNode
}

const Grid = ({children}: Props) => (
    <div className="grid">
        {children}
        <style jsx global>{`
            .grid {
                max-width: 1470px;
                margin: 0 auto; 
                padding-left: ${spaces.s16};
                padding-right: ${spaces.s16};
            }

            @media ${media.up('medium')} {
                .grid {
                    padding-left: ${spaces.s24};
                    padding-right: ${spaces.s24};
                }
            }
        `}</style>
    </div>
)

export default Grid