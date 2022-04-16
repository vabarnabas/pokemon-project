import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Navbar, { MenuItem } from "../../components/navbar/navbar"
import { useImporter } from "../../data/useImporter"
import { Pokemon } from "../../data/usePokemon"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"

const PokemonStorage = () => {
  const router = useRouter()
  const { getPokemonSprite } = useImporter()
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>({} as Pokemon)
  const { pokemonStorage, removePokemon, clearStorage } = usePokemonStorage()

  useEffect(() => {
    pokemonStorage.length === 0 && router.back()
  }, [pokemonStorage])

  const menuItems: MenuItem[] = [
    {
      name: "Clear",
      action: () => clearStorage(),
    },
    {
      name: "Back",
      action: () => router.back(),
    },
  ]

  return (
    <div className="relative px-8 py-14 w-screen h-screen flex items-start justify-center overflow-x-hidden select-none text-slate-500">
      <Navbar menuItems={menuItems} />
      <div className="grid grid-cols-3 gap-2">
        {pokemonStorage.length > 0 && Object.keys(selectedPokemon).length > 0 && (
          <div
            id="pokemon-screen"
            className="relative border rounded-md col-span-3 row-start-1 row-end-3 row-span-3 flex w-full aspect-square items-center justify-center overflow-hidden"
          >
            <div className="relative w-64 h-64">
              <Image
                src={getPokemonSprite(
                  selectedPokemon.baseData.sprite,
                  selectedPokemon.shiny
                )}
                layout="fill"
              />
            </div>
            <div className="absolute top-0 inset-x-0 text-xl px-3 pt-2 flex justify-between items-start bg-white bg-opacity-80">
              <div className="flex space-x-1.5">
                {selectedPokemon.ivs
                  .filter((iv) => iv > 28)
                  .map((iv) => (
                    <div className="">{iv === 31 ? "🌟" : "⭐️"}</div>
                  ))}
              </div>
              <div className="flex space-x-1.5 text-sm">
                {selectedPokemon.ivs.map((iv) => (
                  <div
                    className={`${
                      iv === 31
                        ? "text-emerald-500"
                        : iv > 28
                        ? "text-blue-500"
                        : ""
                    }`}
                  >
                    {iv}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 text-base flex items-center justify-between px-3 pb-2 bg-opacity-80 bg-white">
              <p className="">{`lv. ${selectedPokemon.level}`}</p>
              {selectedPokemon.shiny && <p className="">✨</p>}
            </div>
          </div>
        )}
        {pokemonStorage.map((pokemon) => (
          <div
            key={pokemon.id}
            onClick={() => setSelectedPokemon(pokemon)}
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
              <p className="">{`lv. ${pokemon.level}`}</p>
              {pokemon.shiny && <p className="">✨</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PokemonStorage
