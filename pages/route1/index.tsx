import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useImporter } from "../../data/useImporter"
import { Pokemon } from "../../data/usePokemon"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"

const RandomPokemon = () => {
  const router = useRouter()
  const [randomPokemon, setRandomPokemon] = useState<Pokemon>({} as Pokemon)
  const { pokemonStorage, addPokemon, removePokemon } = usePokemonStorage()
  const { generatePokemon, getPokemonSprite, getRoute } = useImporter()

  const { r: route } = router.query

  useEffect(() => {
    if (router.isReady) {
      setRandomPokemon(
        generatePokemon(
          getRoute((Array.isArray(route) ? route[0] : route) || "route1")
            ?.encounters,
          getRoute((Array.isArray(route) ? route[0] : route) || "route1")
            ?.levelRange
        )
      )
    }
  }, [router.isReady])

  return (
    <div className="relative w-screen h-screen flex items-center justify-center select-none">
      <p className="absolute top-12 font-bold text-2xl text-blue-500">
        {getRoute((Array.isArray(route) ? route[0] : route) || "route1").name}
      </p>
      <div className="absolute inset-x-0 top-0 px-4 py-2 flex justify-end">
        <p
          onClick={() => pokemonStorage.length > 0 && router.push("/storage")}
          className="text-blue-500 hover:text-blue-600 underline cursor-pointer"
        >
          Storage
        </p>
      </div>
      {Object.keys(randomPokemon).length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="">{`${randomPokemon.baseData.name} (lvl. ${
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
              setRandomPokemon(
                generatePokemon(
                  getRoute(
                    (Array.isArray(route) ? route[0] : route) || "route1"
                  )?.encounters,
                  getRoute(
                    (Array.isArray(route) ? route[0] : route) || "route1"
                  )?.levelRange
                )
              )
            }}
            className="mt-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 py-1"
          >
            Catch
          </button>
          <button
            onClick={() => {
              !randomPokemon.shiny &&
                setRandomPokemon(
                  generatePokemon(
                    getRoute(
                      (Array.isArray(route) ? route[0] : route) || "route1"
                    )?.encounters,
                    getRoute(
                      (Array.isArray(route) ? route[0] : route) || "route1"
                    )?.levelRange
                  )
                )
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
                    <p className="">{`lvl. ${pokemon.level}`}</p>
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
