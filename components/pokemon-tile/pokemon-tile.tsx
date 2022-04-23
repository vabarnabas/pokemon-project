import Image from "next/image"
import React from "react"
import { MdOutlineFemale, MdOutlineMale } from "react-icons/md"
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

  return (
    <div
      key={pokemon.id}
      onClick={() => onClick(pokemon)}
      className="relative aspect-square h-20 w-20 cursor-pointer overflow-hidden rounded-md border p-2 hover:border-blue-500"
    >
      <div className="relative h-full w-full">
        <Image
          alt={pokemon.baseData.name}
          src={getPokemonSprite(pokemon.baseData.sprite, pokemon.shiny)}
          layout="fill"
          objectFit="cover"
          unoptimized
          quality={1}
        />
      </div>
      <div className="absolute inset-x-0 top-0 flex space-x-0.5 bg-white bg-opacity-80 px-1 pt-0.5 text-xs">
        {pokemon.ivs
          .filter((iv) => iv > 28)
          .map((iv, index) => (
            <div key={pokemon.id + "_" + iv + "_" + index} className="">
              {iv === 31 ? "🌟" : "⭐️"}
            </div>
          ))}
      </div>
      <div className="absolute right-0 top-0 px-1 pt-1">
        {pokemon.gender === "male" && (
          <MdOutlineMale className="ml-0.5 text-xs text-blue-500" />
        )}
        {pokemon.gender === "female" && (
          <MdOutlineFemale className="ml-0.5 text-xs text-pink-500" />
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-white bg-opacity-80 px-1 pb-0.5 text-xs">
        <p className="">{`lv. ${pokemon.level}`}</p>
        {pokemon.shiny && <p className="">✨</p>}
      </div>
    </div>
  )
}

export default PokemonTile
