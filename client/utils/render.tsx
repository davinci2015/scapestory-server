import {AquascapeCard} from 'components/molecules'
import {Grid} from 'components/core'
import {AquascapeFieldsFragment} from 'graphql/generated/queries'
import {getUserName} from 'utils/mappers'

// TODO: Find out how to define type for aquascapes
export const renderAquascapeCards = (aquascapes: AquascapeFieldsFragment[]) =>
    aquascapes.map(scape => (
        <Grid.Item key={scape.id} extraSmall={12} small={6} medium={4} large={3}>
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
