import React from 'react'
import {useMutation} from 'react-apollo'
import {toast} from 'react-toastify'

import {AquascapeImage, MutationAddAquascapeImageArgs} from 'graphql/generated/types'
import {PhotoSection} from 'components/sections/AquascapeDetails'
import {ADD_AQUASCAPE_IMAGE, DELETE_AQUASCAPE_IMAGE} from './mutations'
import {MutationDeleteAquascapeImageArgs} from 'graphql/generated/queries'
import {updateAquascapeImageCache, AquascapeImageActions} from './cache'
import {showUploadImageToast} from 'utils/render'
import {ToastMessage, FormattedMessage} from 'components/atoms'
import logger from 'services/logger'

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
            .then(() => {
                toast.success(
                    <ToastMessage>
                        <FormattedMessage
                            id="success.photo_removed"
                            defaultMessage="Photo successfully removed!"
                        />
                    </ToastMessage>,
                    {autoClose: 2500}
                )
            })
            .catch(logger.error)
    }

    const onImageChange = (files: FileList | null) => {
        // TODO: Validate file extension
        // TODO: Validate file size
        const MAX_FILES_FOR_UPLOAD = 5
        const promises = []
        if (!files || !files.length) return

        if (files.length > MAX_FILES_FOR_UPLOAD) {
            return toast.error(
                <ToastMessage>
                    <FormattedMessage
                        id="errors.upload_max_files"
                        defaultMessage="You can't upload more than {count} files at once!"
                        values={{count: MAX_FILES_FOR_UPLOAD}}
                    />
                </ToastMessage>
            )
        }

        const toastRef = showUploadImageToast(files.length)

        for (let i = 0; i < files.length; i++) {
            promises.push(
                addImage({
                    variables: {aquascapeId, file: files.item(i)},
                    update: updateAquascapeImageCache(AquascapeImageActions.AQUASCAPE_ADD_IMAGE, {
                        aquascapeId,
                    }),
                })
            )
        }

        Promise.all(promises).finally(() => toast.dismiss(toastRef))
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
