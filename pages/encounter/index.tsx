import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Navbar, { MenuItem } from "../../components/navbar/navbar"
import RouteIndicator from "../../components/route-indicator/route-indicator"
import { useImporter } from "../../data/useImporter"
import { Pokemon, usePokemon } from "../../data/usePokemon"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"
import { getWeightedArray } from "../../services/helper"

const RandomPokemon = () => {
  const router = useRouter()
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
        getWeightedArray(
          getRoute((Array.isArray(route) ? route[0] : route) || "route1")
            ?.levelRange
        ).map((level) => {
          return parseInt(level)
        })
      )
    )
  }

  useEffect(() => {
    if (router.isReady) {
      generateRandomPokemon()
    }
  }, [router.isReady])

  const menuItems: MenuItem[] = [
    {
      name: "Pokemon Storage",
      action: () => router.push("/storage"),
    },
  ]

  return (
    <div className="relative w-screen h-screen flex items-center justify-center select-none text-slate-600">
      <Navbar menuItems={menuItems} />
      <RouteIndicator
        route={getRoute((Array.isArray(route) ? route[0] : route) || "route1")}
      />
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
              addPokemon(randomPokemon)
              generateRandomPokemon()
            }}
            className="mt-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 py-1"
          >
            Catch
          </button>
          <button
            onClick={() => {
              !randomPokemon.shiny && generateRandomPokemon()
            }}
            className={`mt-4 rounded-md text-white px-4 py-1 ${
              !randomPokemon.shiny
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-slate-200"
            }`}
          >
            Reroll
          </button>
          <div className="absolute bottom-0 inset-x-0 flex items-center justify-center py-2">
            <div className="grid grid-cols-3 grid-rows-2 gap-2">
              {pokemonStorage.slice(0, 6).map((pokemon) => (
                <div
                  key={pokemon.id}
                  onDoubleClick={() => {
                    removePokemon(pokemon.id)
                  }}
                  className="relative border rounded-md w-min aspect-square hover:border-blue-500 cursor-pointer overflow-hidden p-1"
                >
                  <div className="relative w-16 h-16">
                    <Image
                      src={getPokemonSprite(
                        pokemon.baseData.sprite,
                        pokemon.shiny
                      )}
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
        </div>
      )}
    </div>
  )
}

export default RandomPokemon