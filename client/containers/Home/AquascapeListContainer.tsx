import React from 'react'

import {SectionCardList} from 'components/organisms'
import {Card} from 'components/molecules'

import {AquascapeData} from './query'

interface Props {
    aquascapes: AquascapeData[]
}

const AquascapesListContainer = ({aquascapes}: Props) => (
    <SectionCardList.List>
        {aquascapes.map((scape: any) => (
            <Card
                key={scape.id}
                name={scape.user.name}
                title={scape.title}
                viewsCount={scape.viewsCount}
                likesCount={scape.likesCount}
                userImage={scape.user.profileImage}
                image={scape.mainImage}
                tags={scape.tags}
            />
        ))}
    </SectionCardList.List>
)

export default AquascapesListContainer