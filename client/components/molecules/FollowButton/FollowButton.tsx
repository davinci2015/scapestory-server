import React, {SyntheticEvent} from 'react'

import {
    FormattedMessage,
    Paragraph,
    Icon,
    Tag,
    IconText,
    Button,
    IconButton,
} from 'components/atoms'
import {colors, spaces} from 'styles'
import {Hero} from 'components/sections/shared'
import {UserWidget} from 'components/molecules'
import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import {getUserName} from 'utils/mappers'
import {ProfileLink} from 'components/core'
import {UserWidgetSize, UserWidgetVariant} from 'components/molecules/UserWidget/UserWidget'

interface Props {
    mineAquascape: boolean
    aquascape: AquascapeDetailsQuery['aquascape']
    toggleLike: () => void
    toggleFollow: () => void
    onEdit: () => void
}

const FollowButton: React.FunctionComponent<Props> = ({
    aquascape,
    mineAquascape,
    onEdit,
    toggleFollow,
    toggleLike,
}) => {
    if (!aquascape || !aquascape.user) return null

    return (
        <>
            <div
                className="follow"
                onClick={(event: SyntheticEvent) => {
                    event.preventDefault()
                    toggleFollow()
                }}
                role="presentation"
            >
                <Paragraph type="s2" color={colors.WHITE} weight="semibold">
                    {aquascape.user?.isFollowedByMe ? (
                        <FormattedMessage
                            id="aquascape.hero_section.unfollow"
                            defaultMessage="Unfollow"
                        />
                    ) : (
                        <FormattedMessage
                            id="aquascape.hero_section.follow"
                            defaultMessage="Follow"
                        />
                    )}
                </Paragraph>
            </div>

            <style jsx>{`
                .icons {
                    margin-left: -${spaces.s12};
                }

                .follow {
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}

export default FollowButton
