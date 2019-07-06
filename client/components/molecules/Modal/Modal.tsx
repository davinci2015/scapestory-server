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
            <Modal className="modal" {...rest}>
               {children}
            </Modal>

            <style jsx>{`
                :global(.modal) {
                    position: absolute;
                    top: 40px;
                    left: 50%;
                    bottom: 40px;
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
            `}</style>
        </>
    )
}

export default CustomModal