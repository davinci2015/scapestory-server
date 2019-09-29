interface Props {
    children: React.ReactNode
    onClick: (...args: any[]) => void
}

const IconButton = ({
    children,
    onClick
}: Props) => (
        <button type="button" className="icon-button" onClick={onClick}>
            {children}

            <style>{`
                .icon-button {
                    cursor: pointer;
                    background: transparent;
                    padding: 0;
                    margin: 0;
                    border: 0;
                    outline: 0; 
                }
            `}</style>
        </button>
    )


export default IconButton