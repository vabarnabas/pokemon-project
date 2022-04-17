import { useRouter } from "next/router"
import React from "react"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"
import { useUserStorage } from "../../providers/user.provider"

const Dev = () => {
  const router = useRouter()
  const { clearStorage, pokemonStorage, modifyPokemon } = usePokemonStorage()
  const { userStorage } = useUserStorage()

  const updatePokemon = () => {
    pokemonStorage.forEach((pokemon) => {
      if (pokemon?.createdAt === undefined) {
        pokemon.createdAt = Date.now()
      }
      if (pokemon?.ot === undefined) {
        pokemon.ot = {
          id: userStorage.id,
          username: userStorage.username,
        }
      }
      modifyPokemon(pokemon)
    })
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-y-4">
      <button
        onClick={() => {
          clearStorage()
          router.push("/encounter")
        }}
        className="bg-rose-500 hover:bg-rose-600 px-4 py-1 rounded-md text-white text-sm"
      >
        Clear Storage
      </button>
      <button
        onClick={() => {
          updatePokemon()
          router.push("/encounter")
        }}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-md text-white text-sm"
      >
        Update Pokemon
      </button>
    </div>
  )
}

export default Dev
