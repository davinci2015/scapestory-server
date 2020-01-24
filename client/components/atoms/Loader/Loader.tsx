import React from 'react'

interface Props {}

const classes = {
    root: 'loader',
}

type LoaderType = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const Loader: LoaderType = () => (
    <>
        <img className="loader" src="/static/icons/loader.svg" alt="loading..." />

        <style jsx>{`
            .loader {
                width: 16px;
                height: 16px;
            }
        `}</style>
    </>
)

Loader.classes = classes

export default Loader
