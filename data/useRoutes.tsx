import { WeightedString } from "../services/helper"

export interface Route {
  name: string
  slug: string
  encounters: WeightedString[]
  levelRange: WeightedString[]
  shinyChange?: number
}

export const useRoutes = () => {
  const routesData: Route[] = [
    {
      name: "Route 1",
      slug: "route1",
      encounters: [
        {
          value: "Pidgey",
          weight: 30,
        },
        {
          value: "Galarian Zigzagoon",
          weight: 25,
        },
        {
          value: "Eevee",
          weight: 18,
        },
        {
          value: "Axew",
          weight: 1,
        },
        {
          value: "Shinx",
          weight: 18,
        },
        {
          value: "Pidgeotto",
          weight: 2,
        },
        {
          value: "Ralts",
          weight: 6,
        },
      ],
      levelRange: [
        {
          value: "5",
          weight: 30,
        },
        {
          value: "6",
          weight: 30,
        },
        {
          value: "7",
          weight: 25,
        },
        {
          value: "8",
          weight: 10,
        },
        {
          value: "9",
          weight: 5,
        },
      ],
    },
    {
      name: "Route 2",
      slug: "route2",
      encounters: [
        {
          value: "Pidgey",
          weight: 30,
        },
        {
          value: "Galarian Zigzagoon",
          weight: 25,
        },
        {
          value: "Eevee",
          weight: 18,
        },
        {
          value: "Axew",
          weight: 1,
        },
        {
          value: "Shinx",
          weight: 18,
        },
        {
          value: "Pidgeotto",
          weight: 2,
        },
        {
          value: "Pidgeot",
          weight: 2,
        },
        {
          value: "Ralts",
          weight: 4,
        },
      ],
      levelRange: [
        {
          value: "5",
          weight: 30,
        },
        {
          value: "6",
          weight: 30,
        },
        {
          value: "7",
          weight: 25,
        },
        {
          value: "8",
          weight: 10,
        },
        {
          value: "9",
          weight: 5,
        },
      ],
    },
  ]

  const getRoute = (identifier: string) => {
    return routesData[
      routesData
        .map((route) => {
          return route.slug
        })
        .indexOf(identifier)
    ]
  }

  return { routesData, getRoute }
}
