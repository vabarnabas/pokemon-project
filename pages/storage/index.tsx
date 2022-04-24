import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Navbar, { MenuItem } from "../../components/navbar/navbar"
import PokemonProfile from "../../components/pokemon-profile/pokemon-profile"
import StorageFilter from "../../components/storage-filter/storage-filter"
import StorageGrid from "../../components/storage-grid/storage-grid"
import { Pokemon } from "../../data/usePokemon"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"
import { Filter, getFilterResults } from "../../services/advanced_filter"

const PokemonStorage = () => {
  const router = useRouter()
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>({} as Pokemon)
  const { pokemonStorage, modifyPokemon, clearStorage } = usePokemonStorage()
  const [activators, setActivators] = useState<string[]>([])

  useEffect(() => {
    // pokemonStorage.length === 0 && router.back()
  }, [pokemonStorage])

  const menuItems: MenuItem[] = [
    {
      name: "Back",
      action: () => router.back(),
    },
    {
      name: "Clear",
      action: () => clearStorage(),
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
    <div className="relative flex h-screen w-screen select-none items-start justify-center overflow-x-hidden px-8 text-slate-600 scrollbar-hide">
      <div className="pt-24">
        <StorageGrid
          storage={getFilterResults(pokemonStorage, filters)}
          onClick={(selectedPokemon) => setSelectedPokemon(selectedPokemon)}
        />
      </div>
      <StorageFilter
        activators={activators}
        setActivators={(activators) => setActivators(activators)}
      />
      <Navbar menuItems={menuItems} />
      <PokemonProfile
        open={Object.keys(selectedPokemon).length > 0}
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon({} as Pokemon)}
        buttons={[
          {
            name: "Level Up",
            color: selectedPokemon.level < 100 ? "bg-blue-500" : "bg-slate-300",
            hoverColor: "bg-blue-600",
            span: 2,
            action: () => {
              if (selectedPokemon.level < 100) {
                selectedPokemon.level++
                modifyPokemon(selectedPokemon)
                setSelectedPokemon(selectedPokemon)
              }
            },
          },
        ]}
      />
    </div>
  )
}

export default PokemonStorage
