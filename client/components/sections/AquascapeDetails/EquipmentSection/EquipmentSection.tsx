import React from 'react'

import {FormattedMessage, Headline} from 'components/atoms'
import {EquipmentCard} from 'components/molecules'
import {spaces} from 'styles'

interface Props {}

const EquipmentSection: React.FunctionComponent<Props> = ({children}) => {
    return (
        <>
            <div className="section">
                <div className="title">
                    <Headline as="h2" variant="h3">
                        <FormattedMessage
                            id="aquascape.equipment.title"
                            defaultMessage="Equipment"
                        />
                    </Headline>
                </div>

                <div className="list">{children}</div>
            </div>
            <style jsx>{`
                .section {
                    padding: ${spaces.s120} 0;
                }

                .section .title :global(.${Headline.classes.root}) {
                    margin-bottom: ${spaces.s60};
                }

                .list {
                    margin-bottom: -${spaces.s30};
                }

                .list :global(.${EquipmentCard.classes.root}) {
                    margin-bottom: ${spaces.s30};
                }
            `}</style>
        </>
    )
}

export default EquipmentSection
