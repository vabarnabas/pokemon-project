import React from "react"
import { Pokemon } from "../../data/usePokemon"
import PokemonTile from "../pokemon-tile/pokemon-tile"

interface Props {
  storage: Pokemon[]
  onClick(...params: any): void
}

const StorageGrid: React.FC<Props> = ({ storage, onClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2 pt-28 pb-4">
      {storage
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1
          }
          return 1
        })
        .map((pokemon) => (
          <PokemonTile
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => onClick(pokemon)}
          />
        ))}
    </div>
  )
}

export default StorageGrid
