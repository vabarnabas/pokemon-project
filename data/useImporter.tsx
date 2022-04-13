import { useItems } from "./useItems"
import { useMoves } from "./useMoves"
import { usePokemon } from "./usePokemon"
import { useTypes } from "./useTypes"

export const useImporter = () => {
  const { typesData, getType, getTypeSprite } = useTypes()
  const { movesData, getMove } = useMoves()
  const { pokemonData, getPokemon, getPokemonSprite, generatePokemon } =
    usePokemon()
  const { itemsData, getItem } = useItems()

  return {
    typesData,
    movesData,
    pokemonData,
    getType,
    getTypeSprite,
    getMove,
    getPokemon,
    getPokemonSprite,
    generatePokemon,
    itemsData,
    getItem,
  }
}
