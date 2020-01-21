import React from 'react'
import {useRouter} from 'next/router'

import {UserBySlugQuery} from 'graphql/generated/queries'
import routes, {createDynamicPath} from 'routes'
import CoverSection from 'components/sections/Profile/CoverSection'
import {Button, Icon, FormattedMessage} from 'components/atoms'
import {colors} from 'styles'
import {ImageUpload} from 'components/core'

interface Props {
    user: UserBySlugQuery['user']
    onChangeCover: (files: FileList | null) => void
}

const CoverSectionEditContainer: React.FunctionComponent<Props> = ({onChangeCover, user}) => {
    const router = useRouter()

    if (!user) return null

    const onPreview = () => router.push(createDynamicPath(routes.profile, {slug: user.slug}))

    return (
        <CoverSection
            coverImage={user.coverImage}
            actionButtons={
                <>
                    <ImageUpload
                        onChange={onChangeCover}
                        render={({openFinder}) => (
                            <Button
                                leftIcon={<Icon d={Icon.CAMERA} color={colors.WHITE} />}
                                dimensions="extraSmall"
                                color="tertiary"
                                onClick={openFinder}
                            >
                                <FormattedMessage
                                    id="user_profile.change_cover_image"
                                    defaultMessage="Change cover"
                                />
                            </Button>
                        )}
                    />

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

export default CoverSectionEditContainer
