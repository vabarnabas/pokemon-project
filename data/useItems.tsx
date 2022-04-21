export type PokemonItemCategory =
  | "Battle Items"
  | "Berries"
  | "General Items"
  | "Hold Items"
  | "Medicine"
  | "Pokeballs"
export interface PokemonBaseItem {
  name: string
  description: string
  category: PokemonItemCategory
  usableInBattle: boolean
  heldItem: boolean
  sprite: string
}

export interface PokemonItem {
  item: PokemonBaseItem
  quantity: number
}

export const useItems = () => {
  const itemsData: PokemonBaseItem[] = [
    {
      name: "Rare Candy",
      description:
        "A candy that is packed with energy. It raises the level of a single Pokémon by one.",
      category: "Medicine",
      usableInBattle: false,
      heldItem: false,
      sprite: "RARECANDY",
    },
  ]

  const getItemSprite = (fileName: string) => {
    return `/images/items/${fileName}.png`
  }

  const getItem = (identifier: string) => {
    return itemsData[
      itemsData
        .map((item) => {
          return item.name
        })
        .indexOf(identifier)
    ]
  }
  return { itemsData, getItem, getItemSprite }
}
