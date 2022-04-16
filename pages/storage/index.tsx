import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Navbar, { MenuItem } from "../../components/navbar/navbar"
import PokemonProfile from "../../components/pokemon-profile/pokemon-profile"
import PokemonTile from "../../components/pokemon-tile/pokemon-tile"
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
          <PokemonTile
            pokemon={pokemon}
            onClick={() => setSelectedPokemon(pokemon)}
          />
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
