import {AquascapeData} from 'containers/Home/query'
import {Card} from 'components/molecules'

export const renderAquascapeCards = (aquascapes: AquascapeData[]) =>
    aquascapes.map((scape: AquascapeData) => (
        <Card
            key={scape.id}
            name={scape.user.name}
            title={scape.title}
            viewsCount={scape.viewsCount}
            likesCount={scape.likesCount}
            userImage={scape.user.profileImage}
            image={scape.mainImage}
            tags={scape.tags}
        />
    ))
