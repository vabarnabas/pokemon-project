import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Navbar, { MenuItem } from "../../components/navbar/navbar"
import PokemonProfile from "../../components/pokemon-profile/pokemon-profile"
import PokemonTile from "../../components/pokemon-tile/pokemon-tile"
import StorageFilter from "../../components/storage-filter/storage-filter"
import StorageGrid from "../../components/storage-grid/storage-grid"
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
    {
      id: "1*",
      type: "stars",
      key: "ivs",
      value: 1,
      active: activators.includes("1*"),
    },
    {
      id: "2*",
      type: "stars",
      key: "ivs",
      value: 2,
      active: activators.includes("2*"),
    },
    {
      id: "3*",
      type: "stars",
      key: "ivs",
      value: 3,
      active: activators.includes("3*"),
    },
  ]

  return (
    <div className="relative flex h-screen w-screen select-none items-start justify-center overflow-x-hidden px-8 text-slate-600">
      <StorageGrid
        storage={getFilterResults(pokemonStorage, filters)}
        onClick={(selectedPokemon) => setSelectedPokemon(selectedPokemon)}
      />
      <Navbar menuItems={menuItems} />
      <StorageFilter
        activators={activators}
        setActivators={(activators) => setActivators(activators)}
      />

      <PokemonProfile
        open={Object.keys(selectedPokemon).length > 0}
        setSelectedPokemon={(pokemon) => setSelectedPokemon(pokemon)}
        pokemon={selectedPokemon}
      />
    </div>
  )
}

export default PokemonStorage
