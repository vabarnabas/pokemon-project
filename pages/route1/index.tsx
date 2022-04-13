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
  const { generatePokemon, getPokemonSprite } = useImporter()
  const encounters: string[] = [
    "Pidgey",
    "Pidgey",
    "Pidgey",
    "Pidgey",
    "Pidgey",
    "Shinx",
    "Shinx",
    "Pidgeotto",
    "Galarian Zigzagoon",
    "Galarian Zigzagoon",
    "Galarian Zigzagoon",
    "Galarian Zigzagoon",

    "Eevee",
  ]
  const levelRange: number[] = [5, 5, 5, 6, 6, 7]

  useEffect(() => {
    setRandomPokemon(generatePokemon(encounters, levelRange))
  }, [])

  return (
    <div className="relative w-screen h-screen flex items-center justify-center select-none">
      <p className="absolute top-12 font-bold text-2xl text-blue-500">
        Route 1
      </p>
      <p
        onClick={() => router.push("/storage")}
        className="absolute top-3 right-4 text-blue-500 hover:text-blue-600 underline cursor-pointer"
      >
        Storage
      </p>
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
              setRandomPokemon(generatePokemon(encounters, levelRange))
            }}
            className="mt-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 py-1"
          >
            Catch
          </button>
          <button
            onClick={() => {
              setRandomPokemon(generatePokemon(encounters, levelRange))
            }}
            className="mt-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 py-1"
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
                  className="relative border rounded-md w-min hover:border-blue-500 cursor-pointer overflow-hidden p-1"
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
                  <div className="absolute top-0 inset-x-0 text-xs px-1 pt-0.5">
                    {pokemon.ivs
                      .filter((iv) => iv > 29)
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
