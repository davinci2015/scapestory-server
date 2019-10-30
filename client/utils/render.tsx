import {AquascapeCard} from 'components/molecules'
import {Grid} from 'components/core'
import {AquascapeData} from 'graphql/queries'

export const renderAquascapeCards = (aquascapes: AquascapeData[]) =>
    aquascapes.map((scape: AquascapeData) => (
        <Grid.Item 
            key={scape.id} 
            extraSmall={12} 
            small={6} 
            medium={4} 
            large={3}>
            <AquascapeCard 
                id={scape.id}
                slug={scape.title}
                name={scape.user.name}
                title={scape.title}
                viewsCount={scape.viewsCount}
                likesCount={scape.likesCount}
                userImage={scape.user.profileImage}
                image={scape.mainImage}
                tags={scape.tags}
            />
        </Grid.Item>
    ))
