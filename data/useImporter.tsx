import { useRouter } from "next/router"
import { useItems } from "./useItems"
import { useMoves } from "./useMoves"
import { usePokemon } from "./usePokemon"
import { useRoutes } from "./useRoutes"
import { useTypes } from "./useTypes"

export const useImporter = () => {
  const types = useTypes()
  const moves = useMoves()
  const pokemon = usePokemon()
  const routes = useRoutes()
  const items = useItems()

  return {
    ...types,
    ...moves,
    ...pokemon,
    ...routes,
    ...items,
  }
}
