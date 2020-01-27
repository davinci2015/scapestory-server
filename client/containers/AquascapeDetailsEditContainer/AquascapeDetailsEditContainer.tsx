import React, {useContext, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useQuery} from 'react-apollo'
import {FormattedMessage} from 'react-intl'
import {Element} from 'react-scroll'

import {Divider, Icon} from 'components/atoms'
import {Grid, Content, Hide} from 'components/core'
import {SubNavigation} from 'components/molecules'
import {AuthContext} from 'providers/AuthenticationProvider'
import {AquascapeDetailsQuery, AquascapeDetailsQueryVariables} from 'graphql/generated/queries'
import routes from 'routes'

import {AQUASCAPE_DETAILS_EDIT} from './queries'
import HeroSectionEditContainer from 'containers/AquascapeDetailsEditContainer/HeroSectionEditContainer'
import FloraSectionEditContainer from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer'
import PhotoSectionEditContainer from 'containers/AquascapeDetailsEditContainer/PhotoSectionEditContainer'
import EquipmentSectionEditContainer from 'containers/AquascapeDetailsEditContainer/EquipmentSectionEditContainer'
import CommentsContainer from 'containers/AquascapeDetailsContainer/CommentsContainer'
import {OtherAquascapesSection} from 'components/sections/AquascapeDetails'
import {pxToNumber} from 'utils/converter'
import {breakpoints} from 'styles'
import SettingsIcon from 'assets/icons/settings.svg'

const sections = {
    PHOTO_POSTS: 'PHOTO_POSTS',
    FLORA: 'FLORA',
    EQUIPMENT: 'EQUIPMENT',
    COMMENTS: 'COMMENTS',
}

const AquascapeDetailsEditContainer: React.FunctionComponent = () => {
    const router = useRouter()
    const {isAuthenticated, user} = useContext(AuthContext)
    const aquascapeId = Number(router.query.id)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push(routes.index)
        }
    }, [isAuthenticated])

    if (!aquascapeId || !user) return null

    const {data: aquascapeResult, error} = useQuery<
        AquascapeDetailsQuery,
        AquascapeDetailsQueryVariables
    >(AQUASCAPE_DETAILS_EDIT, {variables: {id: aquascapeId}})

    useEffect(() => {
        if (
            user &&
            aquascapeResult?.aquascape?.user &&
            aquascapeResult.aquascape.user.id !== user.id
        ) {
            router.push(routes.index)
        }
    }, [aquascapeResult])

    if (error) {
        // TODO: Show error
        return null
    }

    if (!aquascapeResult || !aquascapeResult.aquascape) {
        // TODO: Return not found page
        return null
    }

    if (aquascapeResult?.aquascape?.user?.id !== user.id) {
        return null
    }

    return (
        <Content>
            <HeroSectionEditContainer aquascape={aquascapeResult.aquascape} />
            <SubNavigation>
                <SubNavigation.Item id={sections.PHOTO_POSTS}>
                    <Hide upTo={pxToNumber(breakpoints.small)}>
                        <FormattedMessage
                            id="aquascape.subnavigation.photo"
                            defaultMessage="Photo Diary"
                        />
                    </Hide>
                    <Hide after={pxToNumber(breakpoints.small)}>
                        <Icon d={Icon.CAMERA} />
                    </Hide>
                </SubNavigation.Item>
                <SubNavigation.Item id={sections.FLORA}>
                    <Hide upTo={pxToNumber(breakpoints.small)}>
                        <FormattedMessage
                            id="aquascape.subnavigation.flora"
                            defaultMessage="Flora & Fauna"
                        />
                    </Hide>
                    <Hide after={pxToNumber(breakpoints.small)}>
                        <Icon d={Icon.PLANT} viewBox="0 0 48 48" size={42} />
                    </Hide>
                </SubNavigation.Item>
                <SubNavigation.Item id={sections.EQUIPMENT}>
                    <Hide upTo={pxToNumber(breakpoints.small)}>
                        <FormattedMessage
                            id="aquascape.subnavigation.equipment"
                            defaultMessage="Equipment"
                        />
                    </Hide>
                    <Hide after={pxToNumber(breakpoints.small)}>
                        <SettingsIcon />
                    </Hide>
                </SubNavigation.Item>
                <SubNavigation.Item id={sections.COMMENTS}>
                    <Hide upTo={pxToNumber(breakpoints.small)}>
                        <FormattedMessage
                            id="aquascape.subnavigation.comments"
                            defaultMessage="Comments ({count})"
                            values={{count: aquascapeResult.aquascape.comments.length}}
                        />
                    </Hide>
                    <Hide after={pxToNumber(breakpoints.small)}>
                        <Icon d={Icon.COMMENT} />
                    </Hide>
                </SubNavigation.Item>
            </SubNavigation>
            <Grid>
                <Element name={sections.PHOTO_POSTS}>
                    <PhotoSectionEditContainer
                        aquascapeId={aquascapeId}
                        images={aquascapeResult.aquascape.images}
                    />
                </Element>

                <Divider />

                <Element name={sections.FLORA}>
                    <FloraSectionEditContainer aquascape={aquascapeResult.aquascape} />
                </Element>

                <Divider />

                <Element name={sections.EQUIPMENT}>
                    <EquipmentSectionEditContainer aquascape={aquascapeResult.aquascape} />
                </Element>

                <Divider />

                <Element name={sections.COMMENTS}>
                    <CommentsContainer
                        aquascapeId={aquascapeId}
                        comments={aquascapeResult.aquascape.comments}
                    />
                </Element>

                {aquascapeResult.aquascapes && Boolean(aquascapeResult.aquascapes.rows.length) && (
                    <>
                        <Divider />
                        <OtherAquascapesSection aquascapes={aquascapeResult.aquascapes.rows} />
                    </>
                )}
            </Grid>
        </Content>
    )
}

export default AquascapeDetailsEditContainer
