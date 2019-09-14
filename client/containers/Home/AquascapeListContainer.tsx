import React from 'react'

import {SectionCardList} from 'components/organisms'
import {Card} from 'components/molecules'

const AquascapesListContainer = ({aquascapes}: any) => (
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