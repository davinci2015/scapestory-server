import React from 'react'
import {useRouter} from 'next/router'
import {useQuery} from 'react-apollo'

import {UserBySlugQuery, UserBySlugQueryVariables} from 'graphql/generated/queries'
import {Content, Grid} from 'components/core'
import {AquascapeCardList} from 'components/sections/shared'
import {Headline, FormattedMessage} from 'components/atoms'
import {renderAquascapeCards} from 'utils/render'
import {GridWidth} from 'components/core/Grid'
import routes, {createDynamicPath} from 'routes'
import {USER_BY_SLUG} from 'graphql/queries'

import CoverSectionContainer from './CoverSectionContainer'
import UserSectionContainer from './UserSectionContainer'

const ProfileContainer = () => {
    const router = useRouter()
    const slug = router.query.slug?.toString()

    if (!slug) return null

    const {data: userResult, error} = useQuery<UserBySlugQuery, UserBySlugQueryVariables>(
        USER_BY_SLUG,
        {variables: {slug, pagination: {cursor: null}}, fetchPolicy: 'cache-and-network'}
    )

    if (error) {
        // TODO: handle error properly
        return null
    }

    if (!userResult || !userResult.user) {
        // TODO: handle not found user
        return null
    }

    const onEdit = () => router.push(createDynamicPath(routes.editProfile, {slug}))

    return (
        <Content>
            <CoverSectionContainer user={userResult.user} onEdit={onEdit} />
            <Grid width={GridWidth.SMALL}>
                <UserSectionContainer user={userResult.user} />
                {!!userResult.user.aquascapes.rows.length && (
                    <AquascapeCardList
                        variant="condensed"
                        title={
                            <Headline as="h2" variant="h5">
                                <FormattedMessage
                                    id="home_list_title_explore"
                                    defaultMessage="{name}'s aquascapes"
                                    values={{name: userResult.user.name}}
                                />
                            </Headline>
                        }
                    >
                        <Grid.Row>
                            {renderAquascapeCards(userResult.user.aquascapes.rows, {
                                large: 6,
                                medium: 6,
                                small: 12,
                                extraSmall: 12,
                            })}
                        </Grid.Row>
                    </AquascapeCardList>
                )}
            </Grid>
        </Content>
    )
}

export default ProfileContainer
