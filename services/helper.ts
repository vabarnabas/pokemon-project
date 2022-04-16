export interface WeightedString {
  value: string
  weight: number
}

export const getWeightedArray = (array: WeightedString[]) => {
  let weightedArray: string[] = []
  array.forEach((item) => {
    for (let i = 0; i <= item.weight; i++) {
      weightedArray.push(item.value)
    }
  })
  return weightedArray
}
