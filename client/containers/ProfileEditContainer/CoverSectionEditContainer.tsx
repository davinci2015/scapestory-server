import React from 'react'

import {UserBySlugQuery} from 'graphql/generated/queries'
import CoverSection from 'components/sections/Profile/CoverSection'
import {Button, Icon, FormattedMessage} from 'components/atoms'
import {colors} from 'styles'
import {ImageUpload} from 'components/core'
import SaveIcon from 'assets/icons/save.svg'

interface Props {
    user: UserBySlugQuery['user']
    onChangeCover: (files: FileList | null) => void
    onSave: VoidFunction
}

const CoverSectionEditContainer: React.FunctionComponent<Props> = ({
    onChangeCover,
    onSave,
    user,
}) => {
    if (!user) return null

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
                        leftIcon={<SaveIcon />}
                        dimensions="extraSmall"
                        color="tertiary"
                        onClick={onSave}
                    >
                        <FormattedMessage id="user_profile.save" defaultMessage="Save changes" />
                    </Button>
                </>
            }
        />
    )
}

export default CoverSectionEditContainer
