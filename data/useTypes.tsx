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
}

export const useTypes = () => {
  const typesData: PokemonType[] = [
    {
      id: 0,
      name: "???",
      defensive: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      offensive: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 1,
      name: "Normal",
      defensive: [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
      offensive: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0.5, 1],
    },
    {
      id: 2,
      name: "Fire",
      defensive: [
        1, 0.5, 2, 0.5, 1, 0.5, 1, 1, 2, 1, 1, 0.5, 2, 1, 1, 1, 0.5, 0.5,
      ],
      offensive: [1, 0.5, 0.5, 2, 1, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1],
    },
    {
      id: 3,
      name: "Water",
      defensive: [1, 0.5, 0.5, 2, 2, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1],
      offensive: [1, 2, 0.5, 0.5, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1],
    },
    {
      id: 4,
      name: "Grass",
      defensive: [
        1, 2, 0.5, 0.5, 0.5, 0.5, 2, 1, 2, 0.5, 2, 1, 2, 1, 1, 1, 1, 1,
      ],
      offensive: [
        1, 0.5, 2, 0.5, 1, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1,
      ],
    },
    {
      id: 5,
      name: "Electric",
      defensive: [1, 1, 1, 1, 0.5, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 0.5, 1],
      offensive: [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1],
    },
  ]

  const getType = (identifier: string | number) => {
    return typesData[
      typesData
        .map((type) => {
          return type[typeof identifier === "string" ? "name" : "id"]
        })
        .indexOf(identifier)
    ]
  }

  return { typesData, getType }
}
