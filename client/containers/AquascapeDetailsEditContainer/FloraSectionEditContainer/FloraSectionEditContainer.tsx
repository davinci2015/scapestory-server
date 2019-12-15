import React from 'react'

import {FloraSection} from 'components/sections/AquascapeDetails'
import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import PlantsSectionContainer from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer/PlantsSectionContainer'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

const FloraSectionEditContainer: React.FunctionComponent<Props> = ({aquascape}) => {
    if (!aquascape) return null

    return (
        <FloraSection livestock={aquascape.livestock} hardscape={aquascape.hardscape}>
            <PlantsSectionContainer aquascape={aquascape} />
        </FloraSection>
    )
}

export default FloraSectionEditContainer
