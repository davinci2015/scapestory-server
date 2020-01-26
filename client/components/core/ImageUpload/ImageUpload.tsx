import React, {useRef} from 'react'

export interface RenderProps {
    openFinder: VoidFunction
}

interface Props {
    onChange: (files: FileList | null) => void
    render: (props: RenderProps) => React.ReactNode
    multiple?: boolean
}

const ImageUpload: React.FunctionComponent<Props> = ({multiple, onChange, render}) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const openFinder = () => inputRef?.current?.click()

    return (
        <>
            <input
                multiple={multiple}
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
