import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import { useImporter } from "../../data/useImporter"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"

const PokemonStorage = () => {
  const router = useRouter()
  const { getPokemonSprite } = useImporter()
  const { pokemonStorage, addPokemon, removePokemon } = usePokemonStorage()

  return (
    <div className="relative px-8 py-10 w-screen h-screen flex items-start justify-center overflow-x-hidden">
      <div className="absolute inset-x-0 top-0 px-4 py-2 flex justify-end">
        <p
          onClick={() => router.back()}
          className="text-blue-500 hover:text-blue-600 underline cursor-pointer"
        >
          Back
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {pokemonStorage.map((pokemon) => (
          <div
            key={pokemon.id}
            onDoubleClick={() => {
              removePokemon(pokemon.id)
            }}
            className="relative border rounded-md w-min aspect-square p-2 hover:border-blue-500 cursor-pointer overflow-hidden"
          >
            <div className="relative w-16 h-16">
              <Image
                src={getPokemonSprite(pokemon.baseData.sprite, pokemon.shiny)}
                layout="fill"
              />
            </div>
            <div className="absolute top-0 inset-x-0 text-xs px-1 pt-0.5 flex space-x-0.5 bg-white bg-opacity-80">
              {pokemon.ivs
                .filter((iv) => iv > 28)
                .map((iv) => (
                  <div className="">{iv === 31 ? "🌟" : "⭐️"}</div>
                ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 text-xs flex items-center justify-between px-1 pb-0.5 bg-opacity-80 bg-white">
              <p className="">{`lvl. ${pokemon.level}`}</p>
              {pokemon.shiny && <p className="">✨</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PokemonStorage
