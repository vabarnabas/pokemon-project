import { PokemonMove, useMoves } from "./useMoves"
import { PokemonType, useTypes } from "./useTypes"
import { v4 as uuidv4 } from "uuid"
import { useUserStorage } from "../providers/user.provider"
import { getWeightedArray, WeightedString } from "../services/helper"

type EggGroup =
  | "Monster"
  | "Human-Like"
  | "Water 1"
  | "Water 2"
  | "Water 3"
  | "Bug"
  | "Mineral"
  | "Flying"
  | "Amorphous"
  | "Field"
  | "Fairy"
  | "Ditto"
  | "Grass"
  | "Dragon"
export interface BasePokemon {
  dexId: number
  form?: number
  name: string
  gender: WeightedString[]
  eggGroup: EggGroup[]
  stamina: number
  attack: number
  defense: number
  types: [type1: PokemonType, type2?: PokemonType]
  movePool: PokemonMove[]
  sprite: string
}

export interface Pokemon {
  id: string
  createdAt: number
  baseData: BasePokemon
  gender: string
  level: number
  ivs: [stamina: number, attack: number, defense: number]
  move1: PokemonMove
  move2: PokemonMove
  shiny: boolean
  ot: {
    id: string
    username: string
  }
}

export const usePokemon = () => {
  const { getType } = useTypes()
  const { getMove } = useMoves()
  const { userStorage } = useUserStorage()

  const pokemonData: BasePokemon[] = [
    {
      dexId: 133,
      name: "Eevee",
      gender: [
        { weight: 88, value: "male" },
        { weight: 12, value: "female" },
      ],
      eggGroup: ["Field"],
      stamina: 55,
      attack: 50,
      defense: 60,
      types: [getType("Normal")],
      movePool: [getMove("Tackle")],
      sprite: "EEVEE",
    },
    {
      dexId: 136,
      name: "Flareon",
      gender: [
        { weight: 88, value: "male" },
        { weight: 12, value: "female" },
      ],
      eggGroup: ["Field"],
      stamina: 65,
      attack: 110,
      defense: 85,
      types: [getType("Fire")],
      movePool: [getMove("Tackle")],
      sprite: "FLAREON",
    },
    {
      dexId: 134,
      name: "Vaporeon",
      gender: [
        { weight: 88, value: "male" },
        { weight: 12, value: "female" },
      ],
      eggGroup: ["Field"],
      stamina: 100,
      attack: 80,
      defense: 80,
      types: [getType("Water")],
      movePool: [getMove("Tackle")],
      sprite: "VAPOREON",
    },
    {
      dexId: 470,
      name: "Leafeon",
      gender: [
        { weight: 88, value: "male" },
        { weight: 12, value: "female" },
      ],
      eggGroup: ["Field"],
      stamina: 65,
      attack: 85,
      defense: 100,
      types: [getType("Grass")],
      movePool: [getMove("Tackle")],
      sprite: "LEAFEON",
    },
    {
      dexId: 135,
      name: "Jolteon",
      gender: [
        { weight: 88, value: "male" },
        { weight: 12, value: "female" },
      ],
      eggGroup: ["Field"],
      stamina: 80,
      attack: 90,
      defense: 95,
      types: [getType("Electric")],
      movePool: [getMove("Tackle")],
      sprite: "JOLTEON",
    },
    {
      dexId: 361,
      name: "Snorunt",
      gender: [
        { weight: 50, value: "male" },
        { weight: 50, value: "female" },
      ],
      eggGroup: ["Fairy", "Mineral"],
      stamina: 50,
      attack: 50,
      defense: 50,
      types: [getType("Ice")],
      movePool: [getMove("Tackle")],
      sprite: "SNORUNT",
    },
    {
      dexId: 296,
      name: "Makuhita",
      gender: [
        { weight: 75, value: "male" },
        { weight: 25, value: "female" },
      ],
      eggGroup: ["Human-Like"],
      stamina: 50,
      attack: 40,
      defense: 30,
      types: [getType("Fighting")],
      movePool: [getMove("Tackle")],
      sprite: "MAKUHITA",
    },
    {
      dexId: 23,
      name: "Ekans",
      gender: [
        { weight: 50, value: "male" },
        { weight: 50, value: "female" },
      ],
      eggGroup: ["Dragon", "Field"],
      stamina: 45,
      attack: 50,
      defense: 50,
      types: [getType("Poison")],
      movePool: [getMove("Tackle")],
      sprite: "EKANS",
    },
    {
      dexId: 328,
      name: "Trapinch",
      gender: [
        { weight: 50, value: "male" },
        { weight: 50, value: "female" },
      ],
      eggGroup: ["Bug", "Dragon"],
      stamina: 30,
      attack: 75,
      defense: 45,
      types: [getType("Ground")],
      movePool: [getMove("Tackle")],
      sprite: "TRAPINCH",
    },
    {
      dexId: 63,
      name: "Abra",
      gender: [
        { weight: 75, value: "male" },
        { weight: 25, value: "female" },
      ],
      eggGroup: ["Human-Like"],
      stamina: 60,
      attack: 65,
      defense: 35,
      types: [getType("Psychic")],
      movePool: [getMove("Tackle")],
      sprite: "ABRA",
    },
    {
      dexId: 167,
      name: "Spinarak",
      gender: [
        { weight: 50, value: "male" },
        { weight: 50, value: "female" },
      ],
      eggGroup: ["Bug"],
      stamina: 35,
      attack: 50,
      defense: 40,
      types: [getType("Bug"), getType("Poison")],
      movePool: [getMove("Tackle")],
      sprite: "SPINARAK",
    },
    {
      dexId: 246,
      name: "Larvitar",
      gender: [
        { weight: 50, value: "male" },
        { weight: 50, value: "female" },
      ],
      eggGroup: ["Monster"],
      stamina: 45,
      attack: 55,
      defense: 50,
      types: [getType("Rock"), getType("Ground")],
      movePool: [getMove("Tackle")],
      sprite: "LARVITAR",
    },
    {
      dexId: 355,
      name: "Duskull",
      gender: [
        { weight: 50, value: "male" },
        { weight: 50, value: "female" },
      ],
      eggGroup: ["Amorphous"],
      stamina: 25,
      attack: 35,
      defense: 90,
      types: [getType("Ghost")],
      movePool: [getMove("Tackle")],
      sprite: "DUSKULL",
    },
    {
      dexId: 610,
      name: "Axew",
      gender: [
        { weight: 50, value: "male" },
        { weight: 50, value: "female" },
      ],
      eggGroup: ["Dragon", "Monster"],
      stamina: 50,
      attack: 60,
      defense: 50,
      types: [getType("Dragon")],
      movePool: [getMove("Tackle")],
      sprite: "AXEW",
    },
    {
      dexId: 81,
      name: "Magnemite",
      gender: [{ weight: 100, value: "genderless" }],
      eggGroup: ["Mineral"],
      stamina: 35,
      attack: 65,
      defense: 65,
      types: [getType("Electric"), getType("Steel")],
      movePool: [getMove("Tackle")],
      sprite: "MAGNEMITE",
    },
    {
      dexId: 280,
      name: "Ralts",
      gender: [
        { weight: 50, value: "male" },
        { weight: 50, value: "female" },
      ],
      eggGroup: ["Amorphous", "Human-Like"],
      stamina: 35,
      attack: 35,
      defense: 30,
      types: [getType("Psychic"), getType("Fairy")],
      movePool: [getMove("Tackle")],
      sprite: "RALTS",
    },
    {
      dexId: 16,
      name: "Pidgey",
      gender: [
        { weight: 50, value: "male" },
        { weight: 50, value: "female" },
      ],
      eggGroup: ["Flying"],
      stamina: 50,
      attack: 40,
      defense: 35,
      types: [getType("Normal"), getType("Flying")],
      movePool: [getMove("Tackle")],
      sprite: "PIDGEY",
    },
    {
      dexId: 17,
      name: "Pidgeotto",
      gender: [
        { weight: 50, value: "male" },
        { weight: 50, value: "female" },
      ],
      eggGroup: ["Flying"],
      stamina: 65,
      attack: 55,
      defense: 50,
      types: [getType("Normal"), getType("Flying")],
      movePool: [getMove("Tackle")],
      sprite: "PIDGEOTTO",
    },
    {
      dexId: 18,
      name: "Pidgeot",
      gender: [
        { weight: 50, value: "male" },
        { weight: 50, value: "female" },
      ],
      eggGroup: ["Flying"],
      stamina: 90,
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
      gender: [
        { weight: 50, value: "male" },
        { weight: 50, value: "female" },
      ],
      eggGroup: ["Field"],
      stamina: 50,
      attack: 30,
      defense: 40,
      types: [getType("Dark"), getType("Normal")],
      movePool: [getMove("Tackle")],
      sprite: "ZIGZAGOON_1",
    },
    {
      dexId: 263,
      name: "Shinx",
      gender: [
        { weight: 50, value: "male" },
        { weight: 50, value: "female" },
      ],
      eggGroup: ["Field"],
      stamina: 45,
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
    levelRange: [minLevel: number, maxLevel: number],
    isShiny?: boolean,
    shinyChance?: number,
    ivs?: [hp: number, attack: number, defense: number]
  ): Pokemon => {
    const pokemon = getPokemon(
      pokemonPool[Math.floor(Math.random() * pokemonPool.length)]
    )
    const genderArray = getWeightedArray(pokemon.gender)
    return {
      id: uuidv4(),
      createdAt: Date.now(),
      baseData: pokemon,
      gender: genderArray[Math.floor(Math.random() * genderArray.length)],
      level: Math.floor(
        Math.random() * (levelRange[1] - levelRange[0]) + levelRange[0]
      ),
      shiny: isShiny ?? 1 === Math.ceil(Math.random() * (shinyChance ?? 500)),
      ivs: ivs ?? [
        Math.floor(Math.random() * 31),
        Math.floor(Math.random() * 31),
        Math.floor(Math.random() * 31),
      ],
      move1: pokemon.movePool[Math.floor(Math.random() * pokemonPool.length)],
      move2: pokemon.movePool[Math.floor(Math.random() * pokemonPool.length)],
      ot: {
        id: userStorage.id,
        username: userStorage.username,
      },
    }
  }

  return {
    pokemonData,
    getPokemon,
    getPokemonSprite,
    generatePokemon,
  }
}
