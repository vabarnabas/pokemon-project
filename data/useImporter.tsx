import { useRouter } from "next/router"
import { useItems } from "./useItems"
import { useMoves } from "./useMoves"
import { usePokemon } from "./usePokemon"
import { useRoutes } from "./useRoutes"
import { useTypes } from "./useTypes"

export const useImporter = () => {
  const { typesData, getType, getTypeSprite } = useTypes()
  const { movesData, getMove } = useMoves()
  const { pokemonData, getPokemon, getPokemonSprite, generatePokemon } =
    usePokemon()
  const { getRoute, routesData } = useRoutes()
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
    routesData,
    getRoute,
  }
}
