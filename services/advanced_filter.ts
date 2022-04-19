interface FilterIntervalDate {
  id: string
  type: "date_interval"
  key: string
  startDate: Date
  endDate: Date
  active: boolean
}

interface FilterText {
  id: string
  type: "text"
  key: string
  text: string
  active: boolean
}

interface FilterBoolean {
  id: string
  type: "boolean"
  key: string
  value: boolean
  active: boolean
}

export type Filter = FilterIntervalDate | FilterText | FilterBoolean

export const getFilterResults = (input: any[], filters: Filter[]) => {
  let filteredArray: any[] = input
  filters.forEach((filter) => {
    if (filter.active) {
      if (filter.type === "text") {
        filteredArray = filteredArray.filter((item) =>
          item[filter.key].toLowerCase().includes(filter.text.toLowerCase())
        )
      }
      if (filter.type === "date_interval") {
        filteredArray = filteredArray.filter(
          (item) =>
            filter.startDate <= new Date(item[filter.key]) &&
            filter.endDate <= new Date(item[filter.key])
        )
      }
      if (filter.type === "boolean") {
        filteredArray = filteredArray.filter(
          (item) => item[filter.key] === filter.value
        )
      }
    }
  })

  return filteredArray
}
