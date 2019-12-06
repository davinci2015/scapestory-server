import React from 'react'
import {useMutation} from 'react-apollo'
import debounce from 'lodash.debounce'
import {useRouter} from 'next/router'

import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import {HeroSectionEdit} from 'components/sections/AquascapeDetails'
import {
    UpdateAquascapeTitleMutation,
    UpdateAquascapeTitleMutationVariables,
} from 'graphql/generated/mutations'
import routes, {createDynamicPath, getAquascapeDetailsSlug} from 'routes'

import {UPDATE_AQUASCAPE_TITLE} from './mutations'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

const HeroSectionContainer: React.FunctionComponent<Props> = ({aquascape}) => {
    const router = useRouter()
    const [updateTitle] = useMutation<
        UpdateAquascapeTitleMutation,
        UpdateAquascapeTitleMutationVariables
    >(UPDATE_AQUASCAPE_TITLE)

    if (!aquascape) return null

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
        console.log(files)
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
