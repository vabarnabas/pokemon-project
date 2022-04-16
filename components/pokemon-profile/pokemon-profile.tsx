import Image from "next/image"
import React from "react"
import { useImporter } from "../../data/useImporter"
import { Pokemon } from "../../data/usePokemon"
import { HiX } from "react-icons/hi"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"

interface Props {
  pokemon: Pokemon
  setSelectedPokemon: (pokemon: Pokemon) => void
}

const PokemonProfile: React.FC<Props> = ({ pokemon, setSelectedPokemon }) => {
  const { getPokemonSprite } = useImporter()
  const { removePokemon } = usePokemonStorage()

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center text-slate-600">
      <div className="relative bg-white rounded-md px-16 py-6 flex flex-col items-center justify-center">
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          {pokemon.shiny && <p className="ml-1">✨</p>}
          <HiX
            onClick={() => setSelectedPokemon({} as Pokemon)}
            className="ml-auto cursor-pointer"
          />
        </div>
        <div className="flex">
          <p className="text-blue-500 font-bold">{pokemon.baseData.name}</p>
        </div>
        <p className="text-sm -mt-1">{`lv. ${pokemon.level}`}</p>
        <div className="relative h-32 w-32">
          <Image
            src={getPokemonSprite(pokemon.baseData.sprite)}
            layout="fill"
          />
        </div>
        <div className="text-xs px-1 mb-1 flex space-x-0.5 bg-white bg-opacity-80">
          {pokemon.ivs
            .filter((iv) => iv > 28)
            .map((iv) => (
              <div className="">{iv === 31 ? "🌟" : "⭐️"}</div>
            ))}
        </div>
        <div className="grid grid-rows-2 gap-y-4">
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-blue-500">Base Stats</p>
            <div className="text-xs grid grid-cols-3 gap-x-2">
              <div className="flex flex-col items-center justify-center">
                <p className="">HP</p>
                <p className="">{pokemon.baseData.hp}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="">ATK</p>
                <p className="">{pokemon.baseData.attack}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="">DEF</p>
                <p className="">{pokemon.baseData.attack}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-blue-500">IVs</p>
            <div className="text-xs grid grid-cols-3 gap-x-2">
              <div className="flex flex-col items-center justify-center">
                <p className="">HP</p>
                <p
                  className={`${
                    pokemon.ivs[0] === 31
                      ? "text-emerald-500"
                      : pokemon.ivs[0] > 28
                      ? "text-blue-500"
                      : ""
                  }`}
                >
                  {pokemon.ivs[0]}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="">ATK</p>
                <p
                  className={`${
                    pokemon.ivs[1] === 31
                      ? "text-emerald-500"
                      : pokemon.ivs[1] > 28
                      ? "text-blue-500"
                      : ""
                  }`}
                >
                  {pokemon.ivs[1]}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="">DEF</p>
                <p
                  className={`${
                    pokemon.ivs[2] === 31
                      ? "text-emerald-500"
                      : pokemon.ivs[2] > 28
                      ? "text-blue-500"
                      : ""
                  }`}
                >
                  {pokemon.ivs[2]}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            removePokemon(pokemon.id)
            setSelectedPokemon({} as Pokemon)
          }}
          className="mt-5 bg-rose-500 hover:bg-rose-600 px-4 py-1 rounded-md text-white text-sm"
        >
          Release
        </button>
      </div>
    </div>
  )
}

export default PokemonProfile
