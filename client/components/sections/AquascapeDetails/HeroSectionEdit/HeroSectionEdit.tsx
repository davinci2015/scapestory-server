import React from 'react'

import {FormattedMessage, Paragraph, Icon, Tag, IconText, Button} from 'components/atoms'
import {colors, spaces} from 'styles'
import {Hero} from 'components/sections/shared'
import {UserWidget} from 'components/molecules'
import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import {getUserName} from 'utils/mappers'
import {ProfileLink, ImageUpload} from 'components/core'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
    onTitleChange: (title: string) => void
    onImageChange: (files: FileList | null) => void
    onPreview: () => void
}

const HeroSection: React.FunctionComponent<Props> = ({
    aquascape,
    onTitleChange,
    onPreview,
    onImageChange,
}) => {
    if (!aquascape || !aquascape.user) return null

    return (
        <>
            <Hero
                editMode={true}
                onTitleChange={onTitleChange}
                variant="cover"
                title={aquascape.title}
                image={aquascape.mainImageUrl}
                topSection={
                    <Hero.TopSection>
                        <Hero.TopLeft>
                            <ProfileLink slug={aquascape.user.slug}>
                                <UserWidget
                                    size="large"
                                    variant="border"
                                    image={aquascape.user.profileImage}
                                    text={
                                        <div>
                                            <Paragraph
                                                type="body"
                                                color={colors.WHITE}
                                                weight="bold"
                                            >
                                                <FormattedMessage
                                                    id="aquascape.hero_section.username"
                                                    defaultMessage="by {username}"
                                                    values={{username: getUserName(aquascape.user)}}
                                                />
                                            </Paragraph>
                                        </div>
                                    }
                                />
                            </ProfileLink>
                        </Hero.TopLeft>
                        <Hero.TopRight>
                            <ImageUpload
                                onChange={onImageChange}
                                render={({openFinder}) => (
                                    <Button
                                        onClick={openFinder}
                                        dimensions="extraSmall"
                                        color="tertiary"
                                    >
                                        <FormattedMessage
                                            id="aquascape.hero_section.preview"
                                            defaultMessage="Change cover image"
                                        />
                                    </Button>
                                )}
                            />
                            <Button dimensions="extraSmall" color="tertiary" onClick={onPreview}>
                                <FormattedMessage
                                    id="aquascape.hero_section.preview"
                                    defaultMessage="Preview"
                                />
                            </Button>
                        </Hero.TopRight>
                    </Hero.TopSection>
                }
                bottomSection={
                    <Hero.BottomSection>
                        <Hero.BottomLeft>
                            <div className="icons">
                                <IconText
                                    icon={Icon.EYE_SHOW_FULL}
                                    text={aquascape.viewsCount === 0 ? 1 : aquascape.viewsCount}
                                    color={colors.WHITE}
                                />
                                <IconText
                                    icon={Icon.HEART_OUTLINE}
                                    text={aquascape.likesCount}
                                    color={colors.WHITE}
                                />
                            </div>
                        </Hero.BottomLeft>
                        <Hero.BottomRight>
                            {aquascape.tags.map((tag, index) => (
                                <Tag key={index} text={tag.name} variant="primary" size="large" />
                            ))}
                        </Hero.BottomRight>
                    </Hero.BottomSection>
                }
            />

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

export default HeroSection
