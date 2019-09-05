import React, {useState} from 'react'

import {colors, borderRadius, applyStyles, spaces, typography} from 'styles'
import {Paragraph, Icon} from 'components/atoms'

const classes = {
    checkbox: 'checkbox'
}

export interface Props {
    id: string
    onChange: (checked: boolean) => void
    defaultChecked?: boolean
    error?: boolean
    errorMessage?: React.ReactNode
    children: React.ReactNode
}

const Checkbox = ({id, children, onChange, defaultChecked = false, error, errorMessage}: Props) => {
    const [checked, setChecked] = useState(defaultChecked)

    const toggleChecked = () => {
        onChange(!checked)
        setChecked(!checked)
    }

    return (
        <div className={classes.checkbox}>
            <input className="input" type="checkbox" id={id} checked={checked} onChange={toggleChecked}/>
            <label className="label" htmlFor={id}>
                <div className="selector">
                    <Icon d={Icon.DONE} color={colors.WHITE} />
                </div>
                <div className="content">{children}</div>
            </label>
            {
                error &&
                <div className="error-message">
                    <Paragraph as="span" type="s2" color={colors.ERROR}>
                        {errorMessage}
                    </Paragraph>
                </div>
            }

            <style jsx>{`
                .input {
                    position: absolute;
                    opacity: 0;
                }

                .label {
                    position: relative;
                    cursor: pointer;
                    padding: 0;
                }

                .content {
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 6px;
                    font-size: ${typography.fontSize.fs16};
                    color: ${colors.SHADE_DEEP};
                }

                .content :global(a) {
                    color: ${colors.SHADE_DEEP};
                }

                .selector {
                    display: inline-block;
                    width: ${spaces.s30};
                    height: ${spaces.s30};
                    margin-right: ${spaces.s18};
                    border: 2px solid ${colors.SHADE_LIGHT};
                    border-radius: ${borderRadius.TERTIARY};

                    ${applyStyles(checked)(`
                        background-color: ${colors.PRIMARY};
                        border: 2px solid ${colors.PRIMARY};
                    `)}
                }
            `}</style>
        </div>
    )
}

Checkbox.classes = classes

export default Checkbox