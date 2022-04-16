export interface PokemonItem {
  id: number
  name: string
  description: string
  usableInBattle: boolean
  sprite: string
}

export const useItems = () => {
  const itemsData: PokemonItem[] = []

  const getItem = (identifier: string | number) => {
    return itemsData[
      itemsData
        .map((item) => {
          return item[typeof identifier === "string" ? "name" : "id"]
        })
        .indexOf(identifier)
    ]
  }
  return { itemsData, getItem }
}
