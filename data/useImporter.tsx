import { useItems } from "./useItems"
import { useMoves } from "./useMoves"
import { usePokemon } from "./usePokemon"
import { useTypes } from "./useTypes"

export const useImporter = () => {
  const { typesData, getType } = useTypes()
  const { movesData, getMove } = useMoves()
  const { pokemonData, getPokemon, getPokemonSprite } = usePokemon()
  const { itemsData, getItem } = useItems()

  return {
    typesData,
    movesData,
    pokemonData,
    getType,
    getMove,
    getPokemon,
    getPokemonSprite,
    itemsData,
    getItem,
  }
}
