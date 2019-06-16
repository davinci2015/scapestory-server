interface Props {
    children: React.ReactNode
    onClick: (...args: any[]) => void 
}

const IconButton = ({
    children,
    onClick
}: Props) => {
    return (
        <button type="button" className="icon-button" onClick={onClick}>
            {children}

            <style>{`
                .icon-button {
                    cursor: pointer;
                    background: transparent;
                    border: 0;
                    outline: 0; 
                }
            `}</style>
        </button>
    )
}


export default IconButton