import Modal from 'react-modal'

import {colors} from 'styles'

interface Props extends ReactModal.Props {
    children: React.ReactNode
}

Modal.setAppElement('#__next')

const CustomModal = ({
    children,
    ...rest
}: Props) => {
    return (
        <>
            <Modal className="modal" overlayClassName="modal-overlay" {...rest}>
               {children}
            </Modal>

            <style jsx>{`
                :global(.modal) {
                    position: absolute;
                    top: 40px;
                    bottom: 40px;
                    left: 50%;
                    max-width: 730px;
                    background: rgb(255, 255, 255);
                    overflow: auto;
                    border-radius: 4px;
                    outline: none;
                    border-radius: 16px;
                    background-color: ${colors.WHITE};
                    border: 1px solid ${colors.SHADE_LIGHT};
                    transform: translateX(-50%);
                }

                :global(.modal-overlay) {
                    position: fixed;
                    top: 0px;
                    left: 0px;
                    right: 0px;
                    bottom: 0px;
                    background-color: rgba(0, 0, 0, .7);
                }
            `}</style>
        </>
    )
}

export default CustomModal