import React from 'react'

import {Hero} from 'components/sections/shared'
import {Button} from 'components/atoms'
import {spaces} from 'styles'

interface Props {
    actionButtons?: React.ReactNode
    coverImage?: string | null
}

const CoverSection: React.FunctionComponent<Props> = ({actionButtons, coverImage}) => (
    <>
        <Hero
            image={coverImage}
            variant="cover"
            height="compact"
            topSection={
                <Hero.TopSection>
                    <Hero.TopLeft></Hero.TopLeft>
                    <Hero.TopRight>
                        <div className="action-buttons">{actionButtons}</div>
                    </Hero.TopRight>
                </Hero.TopSection>
            }
        />
        <style jsx>{`
            .action-buttons {
                display: flex;
            }

            .action-buttons :global(.${Button.classes.root}) {
                margin-left: ${spaces.s18};
            }
        `}</style>
    </>
)

export default CoverSection
