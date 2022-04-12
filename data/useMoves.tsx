import { PokemonType, useTypes } from "./useTypes"

export interface PokemonMove {
  id: number
  name: string
  power: number
  accuracy: number
  type: PokemonType
}

export const useMoves = () => {
  const { getType } = useTypes()

  const movesData: PokemonMove[] = [
    {
      id: 1,
      name: "Tackle",
      power: 40,
      accuracy: 100,
      type: getType("Normal"),
    },
  ]

  const getMove = (identifier: string | number) => {
    return movesData[
      movesData
        .map((move) => {
          return move[typeof identifier === "string" ? "name" : "id"]
        })
        .indexOf(identifier)
    ]
  }

  return { movesData, getMove }
}
