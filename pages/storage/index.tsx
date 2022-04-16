import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Navbar, { MenuItem } from "../../components/navbar/navbar"
import PokemonProfile from "../../components/pokemon-profile/pokemon-profile"
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
    <div className="relative px-8 w-screen h-screen flex items-start justify-center overflow-x-hidden select-none text-slate-600">
      <div className="grid grid-cols-3 gap-2 pt-14 pb-4">
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
      <Navbar menuItems={menuItems} />

      {Object.keys(selectedPokemon).length > 0 && (
        <PokemonProfile
          setSelectedPokemon={(pokemon) => setSelectedPokemon(pokemon)}
          pokemon={selectedPokemon}
        />
      )}
    </div>
  )
}

export default PokemonStorage
