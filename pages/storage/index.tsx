import Image from "next/image"
import React from "react"
import { useImporter } from "../../data/useImporter"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"

const PokemonStorage = () => {
  const { getPokemonSprite } = useImporter()
  const { pokemonStorage, addPokemon, removePokemon } = usePokemonStorage()

  return (
    <div className="px-8 py-6 w-screen h-screen flex items-start justify-center overflow-x-hidden">
      <div className="grid grid-cols-3 gap-2">
        {pokemonStorage.map((pokemon) => (
          <div
            key={pokemon.id}
            onDoubleClick={() => {
              removePokemon(pokemon.id)
            }}
            className="relative border rounded-md w-min hover:border-blue-500 cursor-pointer overflow-hidden p-1"
          >
            <div className="relative w-16 h-16">
              <Image
                src={getPokemonSprite(pokemon.baseData.sprite, pokemon.shiny)}
                layout="fill"
              />
            </div>
            <div className="absolute top-0 inset-x-0 text-xs px-1 pt-0.5">
              {pokemon.ivs
                .filter((iv) => iv > 29)
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
