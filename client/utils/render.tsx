import React from 'react'

import {AquascapeCard} from 'components/molecules'
import {Grid} from 'components/core'
import {AquascapeFieldsFragment} from 'graphql/generated/queries'
import {getUserName} from 'utils/mappers'
import {ItemProps} from 'components/core/Grid/Item'

export const renderAquascapeCards = (
    aquascapes: AquascapeFieldsFragment[],
    itemProps: ItemProps = {
        extraSmall: 12,
        small: 6,
        medium: 4,
        large: 3,
    }
) =>
    aquascapes.map(scape => (
        <Grid.Item key={scape.id} {...itemProps}>
            <AquascapeCard
                id={scape.id}
                profileSlug={scape.user?.slug}
                name={getUserName(scape.user)}
                title={scape.title}
                viewsCount={scape.viewsCount}
                likesCount={scape.likesCount}
                userImage={scape.user?.profileImage}
                image={scape.mainImageUrl}
                tags={scape.tags}
            />
        </Grid.Item>
    ))
