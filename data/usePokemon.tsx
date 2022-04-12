import { PokemonMove, useMoves } from "./useMoves"
import { PokemonType, useTypes } from "./useTypes"

export interface BasePokemon {
  id: number
  dexId: number
  name: string
  hp: number
  attack: number
  defense: number
  types: [type1: PokemonType, type2?: PokemonType]
  movePool: PokemonMove[]
  sprite: string
}

export interface Pokemon {
  baseData: BasePokemon
  level: number
  ivs: [hp: number, attack: number, defense: number]
  move1: PokemonMove
  move2: PokemonMove
}

export const usePokemon = () => {
  const { getType } = useTypes()
  const { getMove } = useMoves()

  const pokemonData: BasePokemon[] = [
    {
      id: 1,
      dexId: 133,
      name: "Eevee",
      hp: 55,
      attack: 50,
      defense: 60,
      types: [getType("Normal")],
      movePool: [getMove("Tackle")],
      sprite: "/images/pokemon/EEVEE.png",
    },
    {
      id: 2,
      dexId: 136,
      name: "Flareon",
      hp: 65,
      attack: 110,
      defense: 85,
      types: [getType("Fire")],
      movePool: [getMove("Tackle")],
      sprite: "/images/pokemon/FLAREON.png",
    },
    {
      id: 3,
      dexId: 134,
      name: "Vaporeon",
      hp: 130,
      attack: 80,
      defense: 80,
      types: [getType("Water")],
      movePool: [getMove("Tackle")],
      sprite: "/images/pokemon/VAPOREON.png",
    },
    {
      id: 4,
      dexId: 470,
      name: "Leafeon",
      hp: 65,
      attack: 85,
      defense: 100,
      types: [getType("Grass")],
      movePool: [getMove("Tackle")],
      sprite: "/images/pokemon/LEAFEON.png",
    },
    {
      id: 5,
      dexId: 135,
      name: "Jolteon",
      hp: 65,
      attack: 90,
      defense: 95,
      types: [getType("Electric")],
      movePool: [getMove("Tackle")],
      sprite: "/images/pokemon/JOLTEON.png",
    },
  ]

  const getPokemon = (identifier: string | number) => {
    return pokemonData[
      pokemonData
        .map((pokemon) => {
          return pokemon[typeof identifier === "string" ? "name" : "id"]
        })
        .indexOf(identifier)
    ]
  }

  return { pokemonData, getPokemon }
}
