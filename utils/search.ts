export function removeTildes(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filterData(str: string, items: any[] = [], propertyToFilter: string) {
  const filterStr = removeTildes(str.toLowerCase())
  return items?.filter(item => {
    const itemToFilter = removeTildes(item[propertyToFilter].toLowerCase())
    return itemToFilter.includes(filterStr)
  })
}