import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react"
import { PokemonItem } from "../data/useItems"

type Action =
  | { type: "add_item"; item: PokemonItem }
  | { type: "modify_item"; item: PokemonItem }
  | { type: "remove_item"; id: number }
  | { type: "set_storage"; storage: PokemonItem[] }
  | { type: "clear_storage" }

interface Context {
  itemStorage: PokemonItem[]
  addItem: (item: PokemonItem) => void
  modifyItem: (item: PokemonItem) => void
  removeItem: (id: number) => void
  clearStorage: () => void
}

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "add_item":
      return [...state, action.item]
    case "remove_item":
      return state.filter((item: PokemonItem) => item.item.id !== action.id)
    case "modify_item":
      return [
        ...state.filter(
          (item: PokemonItem) => item.item.id !== action.item.item.id
        ),
        action.item,
      ]
    case "set_storage":
      return action.storage
    case "clear_storage":
      return []
    default:
      return state
  }
}

const ItemStorageContext = createContext<Context>({} as any)

interface Props {
  children: React.ReactNode
}

export const ItemStorageProvider: React.FC<Props> = ({ children }) => {
  const [fetching, setFetching] = useState(true)
  const [state, dispatch] = useReducer(reducer, [])

  const actions = useMemo(
    () => ({
      addItem: (item: PokemonItem) => {
        dispatch({ type: "add_item", item })
      },
      removeItem: (id: number) => {
        dispatch({ type: "remove_item", id })
      },
      modifyItem: (item: PokemonItem) => {
        dispatch({ type: "modify_item", item })
      },
      setStorage: (storage: PokemonItem[]) => {
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
    actions.setStorage(JSON.parse(localStorage.getItem("itemStorage") || "[]"))
    setFetching(false)
  }, [])

  useEffect(() => {
    if (!fetching) {
      localStorage.setItem("itemStorage", JSON.stringify(state))
    }
  }, [state])

  return (
    <ItemStorageContext.Provider value={{ itemStorage: state, ...actions }}>
      {children}
    </ItemStorageContext.Provider>
  )
}

export const useItemStorage = () => useContext(ItemStorageContext)
