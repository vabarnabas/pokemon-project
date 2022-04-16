import type { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useImporter } from "../data/useImporter"

const Home: NextPage = () => {
  const { getPokemon, pokemonData, getPokemonSprite, getTypeSprite } =
    useImporter()
  const router = useRouter()

  useEffect(() => {
    router.push("/encounter")
  }, [])

  const [battleArray, setBattleArray] = useState<string[]>([])
  const [typeTrump, setTypeTrump] = useState("")

  const togglePokemon = (pokemon: string) => {
    battleArray.includes(pokemon)
      ? setBattleArray(battleArray.filter((item) => item !== pokemon))
      : battleArray.length < 2 && setBattleArray([...battleArray, pokemon])
  }

  useEffect(() => {
    if (battleArray.length === 2) {
      const pokemons = [getPokemon(battleArray[0]), getPokemon(battleArray[1])]
      const attackingType = pokemons[0].types[0]
      let effectiveness
      if (pokemons[1].types?.[1]) {
        effectiveness =
          pokemons[1].types[0].defensive[attackingType.id - 1] *
          pokemons[1].types[1].defensive[attackingType.id - 1]
      } else {
        effectiveness = pokemons[1].types[0].defensive[attackingType.id - 1]
      }
      setTypeTrump(JSON.stringify(effectiveness))
    } else {
      setTypeTrump("")
    }
  }, [battleArray])

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start px-8 py-6 select-none overflow-x-hidden">
      <p className="mb-4 font-semibold text-blue-500">
        {JSON.stringify(battleArray) + " " + typeTrump}
      </p>
      <div className="grid grid-cols-5 gap-4">
        {pokemonData.map((pokemon) => (
          <div
            onClick={() => togglePokemon(pokemon.name)}
            key={pokemon.dexId.toString() + (pokemon?.form || "")}
            className={`flex flex-col items-center justify-center border rounded-md py-2 px-4 cursor-pointer ${
              battleArray.includes(pokemon.name) ? "border-blue-500" : ""
            }`}
          >
            <div className="relative h-32 w-32">
              <Image src={getPokemonSprite(pokemon.sprite)} layout="fill" />
            </div>
            <p className="font-semibold text-blue-500">{pokemon.name}</p>
            <div className="flex items-center justify-center space-x-2">
              {pokemon.types.map((type) => (
                <div className="relative h-4 w-8">
                  <Image
                    layout="fill"
                    src={getTypeSprite(type?.sprite || "")}
                  />
                </div>
              ))}
            </div>
            <div className="mt-1 text-xs grid grid-cols-3 gap-1">
              <div className="text-center flex flex-col items-center justify-center">
                <p className="">HP</p>
                <p className="">{pokemon.hp}</p>
              </div>
              <div className="text-center flex flex-col items-center justify-center">
                <p className="">ATK</p>
                <p className="">{pokemon.attack}</p>
              </div>
              <div className="text-center flex flex-col items-center justify-center">
                <p className="">DEF</p>
                <p className="">{pokemon.defense}</p>
              </div>
            </div>
            <div className="mt-2">
              {pokemon.movePool.map((move) => (
                <div
                  key={move.id}
                  className="bg-slate-100 py-1 px-1 rounded-md flex flex-col items-center justify-center"
                >
                  <p className=" text-center text-sm">{move.name}</p>
                  <div className="relative h-4 w-8">
                    <Image layout="fill" src={getTypeSprite(move.type.name)} />
                  </div>
                  <div className="flex space-x-2 mt-0.5 px-1">
                    <div className="flex flex-col items-center justify-center text-xs">
                      <p className="">Power</p>
                      <p className="">{move.power}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center text-xs">
                      <p className="">Accuracy</p>
                      <p className="">{move.accuracy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
