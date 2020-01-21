import React from 'react'

import {UserImage, FormattedMessage, Icon, Paragraph} from 'components/atoms'
import {UserImageSize, UserImageVariant} from 'components/atoms/UserImage/UserImage'
import {colors, spaces} from 'styles'
import {ImageUpload} from 'components/core'

interface Props {
    image?: string | null
    onChange: (files: FileList | null) => void
}

const EditableUserImage: React.FunctionComponent<Props> = ({image, onChange}) => {
    return (
        <>
            <ImageUpload
                onChange={onChange}
                render={({openFinder}) => (
                    <UserImage
                        image={image}
                        size={UserImageSize.s148}
                        variant={UserImageVariant.BORDER}
                    >
                        <button onClick={openFinder} className="button">
                            <Icon d={Icon.CAMERA} size={20} color={colors.WHITE} />
                            <div className="button-text">
                                <Paragraph as="span" type="s2" weight="bold" color={colors.WHITE}>
                                    <FormattedMessage
                                        id="user_image.change_profile_image"
                                        defaultMessage="Change"
                                    />
                                </Paragraph>
                            </div>
                        </button>
                    </UserImage>
                )}
            />
            <style jsx>{`
                .button {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    cursor: pointer;
                    background-color: rgba(0, 0, 0, 0.5);
                    width: 100%;
                    height: 100%;
                    border: 0;
                }

                .button-text {
                    margin-top: ${spaces.s12};
                }
            `}</style>
        </>
    )
}

export default EditableUserImage
