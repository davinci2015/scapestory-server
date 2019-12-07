import React from 'react'
import {useMutation} from 'react-apollo'
import debounce from 'lodash.debounce'
import {useRouter} from 'next/router'

import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import {HeroSectionEdit} from 'components/sections/AquascapeDetails'
import {
    UpdateAquascapeTitleMutation,
    UpdateAquascapeTitleMutationVariables,
    UpdateAquascapeMainImageMutation,
    UpdateAquascapeMainImageMutationVariables,
} from 'graphql/generated/mutations'
import routes, {createDynamicPath, getAquascapeDetailsSlug} from 'routes'
import {UPDATE_AQUASCAPE_TITLE, UPDATE_AQUASCAPE_MAIN_IMAGE} from './mutations'
import {
    updateAquascapeDetailsCache,
    AquascapeDetailsActions,
} from 'containers/AquascapeDetailsContainer/cache'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

const HeroSectionContainer: React.FunctionComponent<Props> = ({aquascape}) => {
    const router = useRouter()

    if (!aquascape) return null

    const [updateTitle] = useMutation<
        UpdateAquascapeTitleMutation,
        UpdateAquascapeTitleMutationVariables
    >(UPDATE_AQUASCAPE_TITLE)

    const [updateMainImage] = useMutation<
        UpdateAquascapeMainImageMutation,
        UpdateAquascapeMainImageMutationVariables
    >(UPDATE_AQUASCAPE_MAIN_IMAGE, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_UPDATE_MAIN_IMAGE, {
            aquascapeId: aquascape.id,
        }),
    })

    const debouncedUpdateTitle = debounce((title: string) => {
        updateTitle({variables: {aquascapeId: aquascape.id, title}})
    }, 500)

    const onTitleChange = (title: string) => {
        if (!title || title === '') return
        debouncedUpdateTitle(title)
    }

    const redirectToPreview = () => {
        if (!aquascape) return null

        router.push(
            createDynamicPath(routes.aquascapeDetails, {
                id: aquascape.id.toString(),
                title: getAquascapeDetailsSlug(aquascape.title),
            })
        )
    }

    const onImageChange = (files: FileList | null) => {
        // TODO: Validate file extension
        // TODO: Validate file size
        if (!files || !files.length) return

        updateMainImage({variables: {aquascapeId: aquascape.id, file: files[0]}})
    }

    return (
        <HeroSectionEdit
            onTitleChange={onTitleChange}
            onPreview={redirectToPreview}
            aquascape={aquascape}
            onImageChange={onImageChange}
        />
    )
}

export default HeroSectionContainer
