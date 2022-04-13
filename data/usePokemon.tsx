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
  shiny: boolean
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
      sprite: "EEVEE",
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
      sprite: "FLAREON",
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
      sprite: "VAPOREON",
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
      sprite: "LEAFEON",
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
      sprite: "JOLTEON",
    },
    {
      id: 6,
      dexId: 361,
      name: "Snorunt",
      hp: 50,
      attack: 50,
      defense: 50,
      types: [getType("Ice")],
      movePool: [getMove("Tackle")],
      sprite: "SNORUNT",
    },
    {
      id: 7,
      dexId: 296,
      name: "Makuhita",
      hp: 70,
      attack: 40,
      defense: 30,
      types: [getType("Fighting")],
      movePool: [getMove("Tackle")],
      sprite: "MAKUHITA",
    },
    {
      id: 8,
      dexId: 23,
      name: "Ekans",
      hp: 35,
      attack: 50,
      defense: 50,
      types: [getType("Poison")],
      movePool: [getMove("Tackle")],
      sprite: "EKANS",
    },
    {
      id: 9,
      dexId: 328,
      name: "Trapinch",
      hp: 45,
      attack: 75,
      defense: 45,
      types: [getType("Ground")],
      movePool: [getMove("Tackle")],
      sprite: "TRAPINCH",
    },
    {
      id: 10,
      dexId: 16,
      name: "Pidgey",
      hp: 40,
      attack: 40,
      defense: 35,
      types: [getType("Normal"), getType("Flying")],
      movePool: [getMove("Tackle")],
      sprite: "PIDGEY",
    },
    {
      id: 11,
      dexId: 63,
      name: "Abra",
      hp: 25,
      attack: 65,
      defense: 35,
      types: [getType("Psychic")],
      movePool: [getMove("Tackle")],
      sprite: "ABRA",
    },
    {
      id: 12,
      dexId: 167,
      name: "Spinarak",
      hp: 45,
      attack: 50,
      defense: 40,
      types: [getType("Bug"), getType("Poison")],
      movePool: [getMove("Tackle")],
      sprite: "SPINARAK",
    },
    {
      id: 13,
      dexId: 246,
      name: "Larvitar",
      hp: 50,
      attack: 55,
      defense: 50,
      types: [getType("Rock"), getType("Ground")],
      movePool: [getMove("Tackle")],
      sprite: "LARVITAR",
    },
    {
      id: 14,
      dexId: 355,
      name: "Duskull",
      hp: 20,
      attack: 35,
      defense: 90,
      types: [getType("Ghost")],
      movePool: [getMove("Tackle")],
      sprite: "DUSKULL",
    },
  ]

  const getPokemonSprite = (fileName: string, isShiny: boolean = false) => {
    return !isShiny ? `/images/pokemon/${fileName}.png` : ``
  }

  const getPokemon = (identifier: string | number) => {
    return pokemonData[
      pokemonData
        .map((pokemon) => {
          return pokemon[typeof identifier === "string" ? "name" : "id"]
        })
        .indexOf(identifier)
    ]
  }

  return { pokemonData, getPokemon, getPokemonSprite }
}
