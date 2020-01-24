import React from 'react'

import {AquascapeCard} from 'components/molecules'
import {Grid} from 'components/core'
import {AquascapeFieldsFragment} from 'graphql/generated/queries'
import {ItemProps} from 'components/core/Grid/Item'
import {toast} from 'react-toastify'
import {ToastMessage, FormattedMessage} from 'components/atoms'

export const renderAquascapeCards = (
    aquascapes: AquascapeFieldsFragment[],
    itemProps: ItemProps = {
        extraSmall: 12,
        small: 6,
        medium: 4,
        large: 3,
    }
) =>
    aquascapes.map(scape => (
        <Grid.Item key={scape.id} {...itemProps}>
            <AquascapeCard
                id={scape.id}
                user={scape.user}
                title={scape.title}
                viewsCount={scape.viewsCount}
                likesCount={scape.likesCount}
                image={scape.mainImageUrl}
                tags={scape.tags}
            />
        </Grid.Item>
    ))

export const showUploadImageToast = (count: number = 1) =>
    toast.info(
        <ToastMessage showLoader>
            <FormattedMessage
                id="upload_image_loading"
                defaultMessage="Uploading {count, plural, one {image} other {images}}, please wait..."
                values={{count}}
            />
        </ToastMessage>,
        {
            hideProgressBar: true,
            autoClose: false,
        }
    )
