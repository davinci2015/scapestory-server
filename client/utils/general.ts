export const matchItemToValue = (item: string, value: string) =>
    item.toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1
