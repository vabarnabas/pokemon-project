import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Navbar, { MenuItem } from "../../components/navbar/navbar"
import PokemonTile from "../../components/pokemon-tile/pokemon-tile"
import RouteIndicator from "../../components/route-indicator/route-indicator"
import { useImporter } from "../../data/useImporter"
import { Pokemon, usePokemon } from "../../data/usePokemon"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"
import { useUserStorage } from "../../providers/user.provider"
import { getWeightedArray } from "../../services/helper"

const RandomPokemon = () => {
  const router = useRouter()
  const { userStorage } = useUserStorage()
  const [randomPokemon, setRandomPokemon] = useState<Pokemon>({} as Pokemon)
  const { pokemonStorage, addPokemon, removePokemon } = usePokemonStorage()
  const { generatePokemon, getPokemonSprite, getRoute } = useImporter()

  const { r: route } = router.query

  const generateRandomPokemon = () => {
    setRandomPokemon(
      generatePokemon(
        getWeightedArray(
          getRoute((Array.isArray(route) ? route[0] : route) || "route1")
            ?.encounters
        ),
        getRoute((Array.isArray(route) ? route[0] : route) || "route1")
          ?.levelRange,
        undefined,
        getRoute((Array.isArray(route) ? route[0] : route) || "route1")
          ?.shinyChange ?? undefined
      )
    )
  }

  useEffect(() => {
    if (router.isReady) {
      generateRandomPokemon()
    }
  }, [router.isReady, route])

  const menuItems: MenuItem[] = [
    {
      name: "Daycare",
      action: () => router.push("/daycare"),
    },
    {
      name: "Pokemon Storage",
      action: () => pokemonStorage.length > 0 && router.push("/storage"),
    },
  ]

  return (
    <div className="relative flex h-screen w-screen select-none items-center justify-center text-slate-600">
      <RouteIndicator
        route={getRoute((Array.isArray(route) ? route[0] : route) || "route1")}
      />
      <Navbar menuItems={menuItems} />
      {Object.keys(randomPokemon).length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="">{`${randomPokemon.baseData.name} (lv. ${
            randomPokemon.level
          }) ${randomPokemon.shiny ? "✨" : ""}`}</p>
          <div className="relative h-32 w-32">
            <Image
              layout="fill"
              src={getPokemonSprite(
                randomPokemon.baseData.sprite,
                randomPokemon.shiny
              )}
            />
          </div>
          <button
            onClick={() => {
              const caughtPokemon = randomPokemon
              caughtPokemon.ot = {
                id: userStorage.id,
                username: userStorage.username,
              }
              addPokemon(caughtPokemon)
              generateRandomPokemon()
            }}
            className="mt-4 rounded-md bg-blue-500 px-4 py-1 text-white hover:bg-blue-600"
          >
            Catch
          </button>
          <button
            onClick={() => {
              !randomPokemon.shiny && generateRandomPokemon()
            }}
            className={`mt-4 rounded-md px-4 py-1 text-white ${
              !randomPokemon.shiny
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-slate-200"
            }`}
          >
            Reroll
          </button>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center py-2">
            <div className="grid grid-cols-3 grid-rows-2 gap-2">
              {pokemonStorage.slice(0, 6).map((pokemon) => (
                <PokemonTile
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RandomPokemon
