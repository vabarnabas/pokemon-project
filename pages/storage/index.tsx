import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Navbar, { MenuItem } from "../../components/navbar/navbar"
import PokemonProfile from "../../components/pokemon-profile/pokemon-profile"
import PokemonTile from "../../components/pokemon-tile/pokemon-tile"
import StorageFilter from "../../components/storage-filter/storage-filter"
import { useImporter } from "../../data/useImporter"
import { Pokemon } from "../../data/usePokemon"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"
import { Filter, getFilterResults } from "../../services/advanced_filter"

const PokemonStorage = () => {
  const router = useRouter()
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>({} as Pokemon)
  const { pokemonStorage, removePokemon, clearStorage } = usePokemonStorage()
  const [activators, setActivators] = useState<string[]>([])

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

  const filters: Filter[] = [
    {
      id: "shiny",
      type: "boolean",
      key: "shiny",
      value: true,
      active: activators.includes("shiny"),
    },
  ]

  return (
    <div className="relative px-8 w-screen h-screen flex items-start justify-center overflow-x-hidden select-none text-slate-600">
      <div className="grid grid-cols-3 gap-2 pt-28 pb-4">
        {getFilterResults(pokemonStorage, filters)
          .sort((a, b) => {
            if (a.createdAt > b.createdAt) {
              return -1
            }
            return 1
          })
          .map((pokemon) => (
            <PokemonTile
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => setSelectedPokemon(pokemon)}
            />
          ))}
      </div>
      <Navbar menuItems={menuItems} />
      <StorageFilter
        activators={activators}
        setActivators={(activators) => setActivators(activators)}
      />

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
