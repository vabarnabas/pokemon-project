import Image from "next/image"
import React from "react"
import { useImporter } from "../../data/useImporter"
import { Pokemon } from "../../data/usePokemon"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"
import { getStars } from "../../services/helper"

interface Props {
  pokemon: Pokemon
  onClick: (...params: any) => void
}

const PokemonTile: React.FC<Props> = ({ pokemon, onClick }) => {
  const { getPokemonSprite } = useImporter()
  const { removePokemon } = usePokemonStorage()

  return (
    <div
      key={pokemon.id}
      onClick={() => onClick(pokemon)}
      onDoubleClick={() => {
        removePokemon(pokemon.id)
      }}
      className="relative aspect-square h-20 w-20 cursor-pointer overflow-hidden rounded-md border p-2 hover:border-blue-500"
    >
      <div className="relative h-full w-full">
        <Image
          src={getPokemonSprite(pokemon.baseData.sprite, pokemon.shiny)}
          layout="fill"
        />
      </div>
      <div className="absolute inset-x-0 top-0 flex space-x-0.5 bg-white bg-opacity-80 px-1 pt-0.5 text-xs">
        {pokemon.ivs
          .filter((iv) => iv > 28)
          .map((iv, index) => (
            <div key={iv + index} className="">
              {iv === 31 ? "🌟" : "⭐️"}
            </div>
          ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-white bg-opacity-80 px-1 pb-0.5 text-xs">
        <p className="">{`lv. ${pokemon.level}`}</p>
        {pokemon.shiny && <p className="">✨</p>}
      </div>
    </div>
  )
}

export default PokemonTile
