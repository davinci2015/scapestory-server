import React from 'react'
import {Button, Icon, FormattedMessage} from 'components/atoms'
import {colors} from 'styles'

interface Props {
    onClick: VoidFunction
}

const AddAquascapeButton: React.FunctionComponent<Props> = ({onClick}) => (
    <Button
        dimensions="small"
        onClick={onClick}
        leftIcon={<Icon d={Icon.ADD_FULL} viewBox="0 0 22 22" color={colors.WHITE} />}
    >
        <FormattedMessage id="navigation_add_your_aquascape" defaultMessage="Add your aquascape" />
    </Button>
)

export default AddAquascapeButton
