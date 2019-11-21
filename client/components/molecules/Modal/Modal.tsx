import {useEffect} from 'react'
import Modal from 'react-modal'
import ScrollLock from 'react-scrolllock'

import {colors, zIndex, media, spaces} from 'styles'

interface Props extends ReactModal.Props {
    children: React.ReactNode
}

const CustomModal = ({children, ...rest}: Props) => {
    useEffect(() => {
        Modal.setAppElement('#__next')
    }, [])

    return (
        <>
            <Modal className="modal" overlayClassName="modal-overlay" {...rest}>
                <ScrollLock>{children}</ScrollLock>
            </Modal>

            <style jsx>{`
                :global(.modal) {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgb(255, 255, 255);
                    overflow: auto;
                    outline: none;
                    background-color: ${colors.WHITE};
                    z-index: ${zIndex.HIGHEST};
                }

                @media ${media.up('small')} {
                    :global(.modal) {
                        width: calc(100% - ${spaces.s36});
                        max-width: 730px;

                        top: 40px;
                        bottom: 40px;
                        left: 50%;

                        border-radius: 16px;
                        border: 1px solid ${colors.SHADE_LIGHT};
                        transform: translateX(-50%);
                    }
                }

                :global(.modal-overlay) {
                    position: fixed;
                    top: 0px;
                    left: 0px;
                    right: 0px;
                    bottom: 0px;
                    background-color: rgba(0, 0, 0, 0.7);
                    z-index: ${zIndex.HIGHEST};
                }
            `}</style>
        </>
    )
}

export default CustomModal
