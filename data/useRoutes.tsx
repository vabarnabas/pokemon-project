export interface Route {
  name: string
  slug: string
  encounters: string[]
  levelRange: number[]
  shinyChange?: number
}

export const useRoutes = () => {
  const routesData: Route[] = [
    {
      name: "Route 1",
      slug: "route1",
      encounters: [
        "Pidgey",
        "Pidgey",
        "Pidgey",
        "Pidgey",
        "Pidgey",
        "Shinx",
        "Shinx",
        "Pidgeotto",
        "Galarian Zigzagoon",
        "Galarian Zigzagoon",
        "Galarian Zigzagoon",
        "Galarian Zigzagoon",
        "Axew",
        "Ralts",
        "Eevee",
        "Eevee",
      ],
      levelRange: [5, 5, 5, 6, 6, 7],
    },
    {
      name: "Route 2",
      slug: "route2",
      encounters: ["Magnemite"],
      levelRange: [5, 5, 5, 6, 6, 7],
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
