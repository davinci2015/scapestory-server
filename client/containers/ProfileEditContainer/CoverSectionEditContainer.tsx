import React, {useContext} from 'react'
import {useRouter} from 'next/router'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {AuthContext} from 'providers/AuthenticationProvider'
import routes, {createDynamicPath} from 'routes'
import CoverSection from 'components/sections/Profile/CoverSection'
import {Button, Icon, FormattedMessage} from 'components/atoms'
import {colors} from 'styles'

interface Props {
    user: UserBySlugQuery['user']
}

const CoverSectionContainer: React.FunctionComponent<Props> = ({user}) => {
    const router = useRouter()

    if (!user) return null

    const {isAuthenticated, user: loggedInUser} = useContext(AuthContext)

    if (!isAuthenticated || user.id !== loggedInUser?.id) {
        router.push(routes.index)
        return null
    }

    const onChangeCover = () => {}

    const onPreview = () => router.push(createDynamicPath(routes.profile, {slug: user.slug}))

    return (
        <CoverSection
            coverImage={user.coverImage}
            actionButtons={
                <>
                    <Button
                        leftIcon={<Icon d={Icon.CAMERA} color={colors.WHITE} />}
                        dimensions="extraSmall"
                        color="tertiary"
                        onClick={onChangeCover}
                    >
                        <FormattedMessage
                            id="user_profile.change_cover_image"
                            defaultMessage="Change cover"
                        />
                    </Button>
                    <Button
                        leftIcon={
                            <Icon d={Icon.EYE_SHOW} color={colors.WHITE} viewBox="0 0 48 48" />
                        }
                        dimensions="extraSmall"
                        color="tertiary"
                        onClick={onPreview}
                    >
                        <FormattedMessage id="user_profile.preview" defaultMessage="Preview" />
                    </Button>
                </>
            }
        />
    )
}

export default CoverSectionContainer
