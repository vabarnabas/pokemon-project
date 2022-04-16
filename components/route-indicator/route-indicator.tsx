import React from "react"
import { useImporter } from "../../data/useImporter"
import { Route } from "../../data/useRoutes"

interface Props {
  route: Route
}

const RouteIndicator: React.FC<Props> = ({ route: currentRoute }) => {
  const { routesData } = useImporter()

  return (
    <div className="fixed top-12 w-full h-12 flex items-center justify-start space-x-2 border-b border-slate-200 select-none px-6">
      {routesData.map((route) => (
        <div key={route.slug} className="">
          <p
            className={`px-3 py-0.5 text-sm font-semibold text-center rounded-full text-white ${
              route.slug === currentRoute.slug ? "bg-blue-500" : "bg-slate-400 "
            }`}
          >
            {route.name}
          </p>
        </div>
      ))}
    </div>
  )
}

export default RouteIndicator
