import React, {useContext} from 'react'
import {useRouter} from 'next/router'
import {useQuery, useMutation} from 'react-apollo'

import {UserBySlugQuery, UserBySlugQueryVariables, ImageVariant} from 'graphql/generated/queries'
import {Content, Grid} from 'components/core'
import {AquascapeCardList} from 'components/sections/shared'
import {Headline, FormattedMessage} from 'components/atoms'
import {renderAquascapeCards} from 'utils/render'
import {GridWidth} from 'components/core/Grid'
import {USER_BY_SLUG} from 'graphql/queries'
import {AuthContext} from 'providers/AuthenticationProvider'
import routes from 'routes'

import CoverSectionEditContainer from './CoverSectionEditContainer'
import UserSectionEditContainer from './UserSectionEditContainer'
import {MutationUploadUserImageArgs} from 'graphql/generated/mutations'
import {UPLOAD_USER_IMAGE} from 'graphql/mutations'
import {updateProfileCache, ProfileActions} from 'containers/ProfileContainer/cache'

const ProfileContainer = () => {
    const router = useRouter()
    const slug = router.query.slug?.toString()
    const {isAuthenticated, user: loggedInUser} = useContext(AuthContext)

    if (!slug) return null

    const {data: userResult, error} = useQuery<UserBySlugQuery, UserBySlugQueryVariables>(
        USER_BY_SLUG,
        {variables: {slug, pagination: {limit: 8, cursor: null}}, fetchPolicy: 'cache-and-network'}
    )

    const [uploadUserImage] = useMutation<MutationUploadUserImageArgs>(UPLOAD_USER_IMAGE)

    const onImageUpload = (imageVariant: ImageVariant) => (files: FileList | null) => {
        // TODO: Validate file extension
        // TODO: Validate file size
        if (!files || !files.length) return

        const action = {
            [ImageVariant.Cover]: ProfileActions.UPLOAD_COVER_IMAGE,
            [ImageVariant.Profile]: ProfileActions.UPLOAD_PROFILE_IMAGE,
        }

        uploadUserImage({
            variables: {
                file: files[0],
                imageVariant,
            },
            update: updateProfileCache(action[imageVariant], {slug}),
        })
    }

    if (error) {
        // TODO: handle error properly
        return null
    }

    if (!userResult || !userResult.user) {
        // TODO: handle not found user
        return null
    }

    if (!isAuthenticated || userResult.user.id !== loggedInUser?.id) {
        router.push(routes.index)
        return null
    }

    return (
        <Content>
            <CoverSectionEditContainer
                onChangeCover={onImageUpload(ImageVariant.Cover)}
                user={userResult.user}
            />
            <Grid width={GridWidth.SMALL}>
                <UserSectionEditContainer
                    onChangeProfileImage={onImageUpload(ImageVariant.Profile)}
                    user={userResult.user}
                />
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
