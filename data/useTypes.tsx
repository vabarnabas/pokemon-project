export interface PokemonType {
  id: number
  name: string
  defensive: [
    normal: number,
    fire: number,
    water: number,
    grass: number,
    electric: number,
    ice: number,
    fighting: number,
    poison: number,
    ground: number,
    flying: number,
    psychic: number,
    bug: number,
    rock: number,
    ghost: number,
    dragon: number,
    dark: number,
    steel: number,
    fairy: number
  ]
  offensive: [
    normal: number,
    fire: number,
    water: number,
    grass: number,
    electric: number,
    ice: number,
    fighting: number,
    poison: number,
    ground: number,
    flying: number,
    psychic: number,
    bug: number,
    rock: number,
    ghost: number,
    dragon: number,
    dark: number,
    steel: number,
    fairy: number
  ]
  sprite: string
}

export const useTypes = () => {
  const typesData: PokemonType[] = [
    {
      id: 0,
      name: "???",
      defensive: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      offensive: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      sprite: "???",
    },
    {
      id: 1,
      name: "Normal",
      defensive: [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
      offensive: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0.5, 1],
      sprite: "NORMAL",
    },
    {
      id: 2,
      name: "Fire",
      defensive: [
        1, 0.5, 2, 0.5, 1, 0.5, 1, 1, 2, 1, 1, 0.5, 2, 1, 1, 1, 0.5, 0.5,
      ],
      offensive: [1, 0.5, 0.5, 2, 1, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1],
      sprite: "FIRE",
    },
    {
      id: 3,
      name: "Water",
      defensive: [1, 0.5, 0.5, 2, 2, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1],
      offensive: [1, 2, 0.5, 0.5, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1],
      sprite: "WATER",
    },
    {
      id: 4,
      name: "Grass",
      defensive: [1, 2, 0.5, 0.5, 0.5, 2, 1, 2, 0.5, 2, 1, 2, 1, 1, 1, 1, 1, 1],
      offensive: [
        1, 0.5, 2, 0.5, 1, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1,
      ],
      sprite: "GRASS",
    },
    {
      id: 5,
      name: "Electric",
      defensive: [1, 1, 1, 1, 0.5, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 0.5, 1],
      offensive: [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1],
      sprite: "ELECTRIC",
    },
    {
      id: 6,
      name: "Ice",
      defensive: [1, 2, 1, 1, 1, 0.5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      offensive: [1, 0.5, 0.5, 2, 1, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1],
      sprite: "ICE",
    },
    {
      id: 7,
      name: "Fighting",
      defensive: [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 0.5, 1, 1, 0.5, 1, 2],
      offensive: [
        2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5,
      ],
      sprite: "FIGHTING",
    },
    {
      id: 8,
      name: "Poison",
      defensive: [
        1, 1, 1, 0.5, 1, 1, 0.5, 0.5, 2, 1, 2, 0.5, 1, 1, 1, 1, 1, 0.5,
      ],
      offensive: [1, 1, 1, 2, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2],
      sprite: "POISON",
    },
    {
      id: 9,
      name: "Ground",
      defensive: [1, 1, 2, 2, 0, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 1],
      offensive: [1, 2, 1, 0.5, 2, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1],
      sprite: "GROUND",
    },
    {
      id: 10,
      name: "Flying",
      defensive: [1, 1, 1, 0.5, 2, 2, 0.5, 1, 0, 1, 1, 0.5, 2, 1, 1, 1, 1, 1],
      offensive: [1, 1, 1, 2, 0.5, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1],
      sprite: "FLYING",
    },
    {
      id: 11,
      name: "Psychic",
      defensive: [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 0.5, 2, 1, 2, 1, 2, 1, 1],
      offensive: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1],
      sprite: "PSYCHIC",
    },
    {
      id: 12,
      name: "Bug",
      defensive: [1, 2, 1, 0.5, 1, 1, 0.5, 1, 0.5, 2, 1, 1, 2, 1, 1, 1, 1, 1],
      offensive: [
        1, 0.5, 1, 2, 1, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5,
      ],
      sprite: "BUG",
    },
    {
      id: 13,
      name: "Rock",
      defensive: [0.5, 0.5, 2, 2, 1, 1, 2, 0.5, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 1],
      offensive: [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1],
      sprite: "ROCK",
    },
    {
      id: 14,
      name: "Ghost",
      defensive: [0, 1, 1, 1, 1, 1, 0, 0.5, 1, 1, 1, 0.5, 1, 2, 1, 2, 1, 1],
      offensive: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1],
      sprite: "GHOST",
    },
    {
      id: 15,
      name: "Dragon",
      defensive: [1, 0.5, 0.5, 0.5, 0.5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2],
      offensive: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0],
      sprite: "DRAGON",
    },
    {
      id: 16,
      name: "Dark",
      defensive: [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 2, 1, 0.5, 1, 0.5, 1, 2],
      offensive: [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5],
      sprite: "DARK",
    },
    {
      id: 17,
      name: "Steel",
      defensive: [
        0.5, 2, 1, 0.5, 1, 0.5, 2, 0, 2, 0.5, 0.5, 0.5, 0.5, 1, 0.5, 1, 0.5,
        0.5,
      ],
      offensive: [1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2],
      sprite: "STEEL",
    },
    {
      id: 18,
      name: "Fairy",
      defensive: [1, 1, 1, 1, 1, 1, 0.5, 2, 1, 1, 1, 0.5, 1, 1, 0, 0.5, 2, 1],
      offensive: [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1],
      sprite: "FAIRY",
    },
  ]

  /**
   * Gets a specific type's sprite.
   * @param {string} fileName
   * @returns Type's sprite.
   */
  const getTypeSprite = (fileName: string) => {
    return `/images/types/${fileName}.png`
  }

  const getType = (identifier: string | number) => {
    return typesData[
      typesData
        .map((type) => {
          return type[typeof identifier === "string" ? "name" : "id"]
        })
        .indexOf(identifier)
    ]
  }

  return { typesData, getType, getTypeSprite }
}
