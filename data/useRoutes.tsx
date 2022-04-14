export interface Route {
  name: string
  encounters: string[]
  levelRange: number[]
}

export const useRoutes = () => {
  const routesData = [{}]
  return { routesData }
}
