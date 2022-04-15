import React from "react"
import { Route } from "../../data/useRoutes"

interface Props {
  route: Route
}

const RouteIndicator: React.FC<Props> = ({ route }) => {
  return (
    <div className="fixed top-12 w-full h-12 flex items-center justify-between border-b border-slate-200 select-none px-6">
      <p className="px-3 py-0.5 text-sm font-semibold text-center rounded-full text-white bg-slate-400">
        {route.name}
      </p>
    </div>
  )
}

export default RouteIndicator
