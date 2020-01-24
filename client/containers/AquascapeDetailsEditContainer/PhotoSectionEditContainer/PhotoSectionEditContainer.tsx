import React from 'react'
import {useMutation} from 'react-apollo'
import {toast} from 'react-toastify'

import {AquascapeImage, MutationAddAquascapeImageArgs} from 'graphql/generated/types'
import {PhotoSection} from 'components/sections/AquascapeDetails'
import {ADD_AQUASCAPE_IMAGE, DELETE_AQUASCAPE_IMAGE} from './mutations'
import {MutationDeleteAquascapeImageArgs} from 'graphql/generated/queries'
import {updateAquascapeImageCache, AquascapeImageActions} from './cache'
import {ToastMessage, FormattedMessage} from 'components/atoms'

interface Props {
    aquascapeId: number
    images: Pick<AquascapeImage, 'id' | 'title' | 'url' | 'createdAt'>[]
}

const PhotoSectionEditContainer: React.FunctionComponent<Props> = ({aquascapeId, images}) => {
    const [addImage] = useMutation<MutationAddAquascapeImageArgs>(ADD_AQUASCAPE_IMAGE)

    const [deleteImage] = useMutation<MutationDeleteAquascapeImageArgs>(DELETE_AQUASCAPE_IMAGE, {
        update: () => null,
    })

    const onImageRemove = (imageId: number) => {
        deleteImage({
            variables: {aquascapeId, imageId},
            update: updateAquascapeImageCache(AquascapeImageActions.AQUASCAPE_DELETE_IMAGE, {
                aquascapeId,
                imageId,
            }),
        })
    }

    const onImageChange = (files: FileList | null) => {
        // TODO: Validate file extension
        // TODO: Validate file size
        if (!files || !files.length) return

        toast.info(
            <ToastMessage>
                <FormattedMessage
                    id="photo_diary.upload_image_loading"
                    defaultMessage="Uploading image, please wait..."
                />
            </ToastMessage>,
            {
                hideProgressBar: true,
                autoClose: 2000,
            }
        )

        addImage({
            variables: {aquascapeId, file: files[0]},
            update: updateAquascapeImageCache(AquascapeImageActions.AQUASCAPE_ADD_IMAGE, {
                aquascapeId,
            }),
        })
    }

    return (
        <PhotoSection
            edit
            onImageChange={onImageChange}
            onImageRemove={onImageRemove}
            images={images}
        />
    )
}

export default PhotoSectionEditContainer
