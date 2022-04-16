import Image from "next/image"
import React from "react"
import { useImporter } from "../../data/useImporter"
import { Pokemon } from "../../data/usePokemon"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"

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
      className="relative border rounded-md w-min aspect-square p-2 hover:border-blue-500 cursor-pointer overflow-hidden"
    >
      <div className="relative w-16 h-16">
        <Image
          src={getPokemonSprite(pokemon.baseData.sprite, pokemon.shiny)}
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
  )
}

export default PokemonTile
