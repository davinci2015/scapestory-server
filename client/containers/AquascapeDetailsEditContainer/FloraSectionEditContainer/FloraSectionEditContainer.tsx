import React from 'react'

import {FloraSection} from 'components/sections/AquascapeDetails'
import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import PlantsSectionContainer from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer/PlantsSectionContainer'
import LivestockSectionContainer from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer/LivestockSectionContainer'
import HardscapeSectionContainer from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer/HardscapeSectionContainer'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

const FloraSectionEditContainer: React.FunctionComponent<Props> = ({aquascape}) => {
    if (!aquascape) return null

    return (
        <FloraSection>
            <PlantsSectionContainer aquascape={aquascape} />
            <LivestockSectionContainer aquascape={aquascape} />
            <HardscapeSectionContainer aquascape={aquascape} />
        </FloraSection>
    )
}

export default FloraSectionEditContainer
