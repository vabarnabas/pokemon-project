import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react"
import { Pokemon } from "../data/usePokemon"

type Action =
  | { type: "add_pokemon"; pokemon: Pokemon }
  | { type: "remove_pokemon"; id: string }
  | { type: "modify_pokemon"; pokemon: Pokemon }
  | { type: "set_storage"; storage: Pokemon[] }
  | { type: "clear_storage" }

interface Context {
  pokemonStorage: Pokemon[]
  addPokemon: (pokemon: Pokemon) => void
  removePokemon: (id: string) => void
  modifyPokemon: (pokemon: Pokemon) => void
  clearStorage: () => void
}

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "add_pokemon":
      return [...state, action.pokemon]
    case "remove_pokemon":
      return state.filter((pokemon: Pokemon) => pokemon.id !== action.id)
    case "modify_pokemon":
      return [
        ...state.filter((pokemon: Pokemon) => pokemon.id !== action.pokemon.id),
        action.pokemon,
      ]
    case "set_storage":
      return action.storage
    case "clear_storage":
      return []
    default:
      return state
  }
}

const PokemonStorageContext = createContext<Context>({} as any)

interface Props {
  children: React.ReactNode
}

export const PokemonStorageProvider: React.FC<Props> = ({ children }) => {
  const [fetching, setFetching] = useState(true)
  const [state, dispatch] = useReducer(reducer, [])

  const actions = useMemo(
    () => ({
      addPokemon: (pokemon: Pokemon) => {
        dispatch({ type: "add_pokemon", pokemon })
      },
      removePokemon: (id: string) => {
        dispatch({ type: "remove_pokemon", id })
      },
      modifyPokemon: (pokemon: Pokemon) => {
        dispatch({ type: "modify_pokemon", pokemon })
      },
      setStorage: (storage: Pokemon[]) => {
        dispatch({
          type: "set_storage",
          storage,
        })
      },
      clearStorage: () => {
        dispatch({ type: "clear_storage" })
      },
    }),
    []
  )

  useEffect(() => {
    actions.setStorage(
      JSON.parse(localStorage.getItem("pokemonStorage") || "[]")
    )
    setFetching(false)
  }, [])

  useEffect(() => {
    if (!fetching) {
      localStorage.setItem("pokemonStorage", JSON.stringify(state))
    }
  }, [state])

  return (
    <PokemonStorageContext.Provider
      value={{ pokemonStorage: state, ...actions }}
    >
      {children}
    </PokemonStorageContext.Provider>
  )
}

export const usePokemonStorage = () => useContext(PokemonStorageContext)
