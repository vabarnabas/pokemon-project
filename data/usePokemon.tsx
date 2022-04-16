import { PokemonMove, useMoves } from "./useMoves"
import { PokemonType, useTypes } from "./useTypes"
import { v4 as uuidv4 } from "uuid"

export interface BasePokemon {
  dexId: number
  form?: number
  name: string
  hp: number
  attack: number
  defense: number
  types: [type1: PokemonType, type2?: PokemonType]
  movePool: PokemonMove[]
  sprite: string
}

export interface Pokemon {
  id: string
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
      dexId: 355,
      name: "Duskull",
      hp: 20,
      attack: 35,
      defense: 90,
      types: [getType("Ghost")],
      movePool: [getMove("Tackle")],
      sprite: "DUSKULL",
    },
    {
      dexId: 610,
      name: "Axew",
      hp: 45,
      attack: 60,
      defense: 50,
      types: [getType("Dragon")],
      movePool: [getMove("Tackle")],
      sprite: "AXEW",
    },
    {
      dexId: 81,
      name: "Magnemite",
      hp: 25,
      attack: 65,
      defense: 65,
      types: [getType("Electric"), getType("Steel")],
      movePool: [getMove("Tackle")],
      sprite: "MAGNEMITE",
    },
    {
      dexId: 280,
      name: "Ralts",
      hp: 30,
      attack: 35,
      defense: 30,
      types: [getType("Psychic"), getType("Fairy")],
      movePool: [getMove("Tackle")],
      sprite: "RALTS",
    },
    {
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
      dexId: 17,
      name: "Pidgeotto",
      hp: 60,
      attack: 55,
      defense: 50,
      types: [getType("Normal"), getType("Flying")],
      movePool: [getMove("Tackle")],
      sprite: "PIDGEOTTO",
    },
    {
      dexId: 18,
      name: "Pidgeot",
      hp: 85,
      attack: 75,
      defense: 70,
      types: [getType("Normal"), getType("Flying")],
      movePool: [getMove("Tackle")],
      sprite: "PIDGEOT",
    },
    {
      dexId: 263,
      form: 1,
      name: "Galarian Zigzagoon",
      hp: 40,
      attack: 30,
      defense: 40,
      types: [getType("Dark"), getType("Normal")],
      movePool: [getMove("Tackle")],
      sprite: "ZIGZAGOON_1",
    },
    {
      dexId: 263,
      name: "Shinx",
      hp: 45,
      attack: 55,
      defense: 35,
      types: [getType("Electric")],
      movePool: [getMove("Tackle")],
      sprite: "SHINX",
    },
  ]

  const getPokemonSprite = (fileName: string, isShiny?: boolean) => {
    return !isShiny
      ? `/images/pokemon/normal/${fileName}.png`
      : `/images/pokemon/shiny/${fileName}.png`
  }

  const getPokemon = (identifier: string) => {
    return pokemonData[
      pokemonData
        .map((pokemon) => {
          return pokemon.name
        })
        .indexOf(identifier)
    ]
  }

  const generatePokemon = (
    pokemonPool: string[],
    levelRange: number[],
    isShiny?: boolean,
    shinyChance?: number,
    ivs?: [hp: number, attack: number, defense: number]
  ): Pokemon => {
    const pokemon = getPokemon(
      pokemonPool[Math.floor(Math.random() * pokemonPool.length)]
    )
    return {
      id: uuidv4(),
      baseData: pokemon,
      level: levelRange[Math.floor(Math.random() * levelRange.length)],
      shiny: isShiny ?? 1 === Math.floor(Math.random() * (shinyChance ?? 500)),
      ivs: ivs ?? [
        Math.floor(Math.random() * 31),
        Math.floor(Math.random() * 31),
        Math.floor(Math.random() * 31),
      ],
      move1: pokemon.movePool[Math.floor(Math.random() * pokemonPool.length)],
      move2: pokemon.movePool[Math.floor(Math.random() * pokemonPool.length)],
    }
  }

  return {
    pokemonData,
    getPokemon,
    getPokemonSprite,
    generatePokemon,
  }
}
