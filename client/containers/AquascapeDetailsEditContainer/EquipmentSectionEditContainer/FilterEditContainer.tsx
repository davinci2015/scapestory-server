import React from 'react'
import {ValueType, ActionMeta} from 'react-select'
import {useQuery} from 'react-apollo'

import {ListItem} from 'components/molecules'
import {Filter} from 'graphql/generated/types'
import {FiltersCard} from 'components/sections/AquascapeDetails/EquipmentSection/Cards'
import {SelectCreatable, FormattedMessage} from 'components/atoms'
import {FiltersQuery} from 'graphql/generated/queries'
import {groupEquipmentByBrand} from 'utils/mappers'
import {EquipmentOptionType} from '../EquipmentSectionEditContainer'
import {FILTERS} from './queries'

interface Props {
    filters: Pick<Filter, 'id' | 'brand' | 'model'>[]
    onFilterSelect(newValue: ValueType<EquipmentOptionType>, actionMeta: ActionMeta): void
    onFilterCreate(inputValue: string): void
    onFilterDelete(filterId: number): void
}

const FilterEditContainer: React.FunctionComponent<Props> = ({
    filters = [],
    onFilterSelect,
    onFilterCreate,
    onFilterDelete,
}) => {
    const {data: allFilters} = useQuery<FiltersQuery>(FILTERS)

    return (
        <FiltersCard>
            {filters.map(filter => (
                <ListItem key={filter.id} onDelete={() => onFilterDelete(filter.id)}>
                    {filter.brand?.name} {filter.model}
                </ListItem>
            ))}
            {allFilters && allFilters.filters && (
                <SelectCreatable
                    placeholder={
                        <FormattedMessage
                            id="filter.select_filter_placeholder"
                            defaultMessage="Select filter..."
                        />
                    }
                    onChange={onFilterSelect}
                    onCreateOption={onFilterCreate}
                    options={groupEquipmentByBrand(
                        allFilters.filters.filter(x => !filters.some(y => y.id === x.id))
                    )}
                />
            )}
        </FiltersCard>
    )
}

export default FilterEditContainer
