import React, {useRef} from 'react'

export interface RenderProps {
    openFinder: () => void
}

interface Props {
    onChange: (files: FileList | null) => void
    render: (props: RenderProps) => React.ReactNode
}

const ImageUpload: React.FunctionComponent<Props> = ({onChange, render}) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const openFinder = () => inputRef?.current?.click()

    return (
        <>
            <input
                type="file"
                accept="image/x-png,image/jpg,image/jpeg"
                required
                ref={inputRef}
                style={{display: 'none'}}
                onChange={e => onChange(e.target.files)}
            />
            {render({openFinder})}
        </>
    )
}

export default ImageUpload
