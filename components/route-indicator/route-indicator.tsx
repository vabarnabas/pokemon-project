import React from "react"
import { useImporter } from "../../data/useImporter"
import { Route } from "../../data/useRoutes"
import { HiOutlineInformationCircle } from "react-icons/hi"
import ScrollContainer from "react-indiana-drag-scroll"
import { route } from "next/dist/server/router"
import { useRouter } from "next/router"

interface Props {
  route: Route
}

const RouteIndicator: React.FC<Props> = ({ route: currentRoute }) => {
  const { routesData } = useImporter()
  const router = useRouter()

  return (
    <div className="fixed top-12 w-full h-12 flex items-center justify-start border-b space-x-4 border-slate-200 select-none px-6 text-slate-600">
      <ScrollContainer className="w-full grid grid-flow-col gap-x-2">
        {routesData.map((route) => (
          <div
            onClick={() =>
              router.push({
                pathname: router.pathname,
                query: { r: route.slug },
              })
            }
            key={route.slug}
            className=""
          >
            <p
              className={`px-3 py-0.5 text-sm font-semibold text-center rounded-full text-white ${
                route.slug === currentRoute.slug
                  ? "bg-blue-500"
                  : "bg-slate-400 "
              }`}
            >
              {route.name}
            </p>
          </div>
        ))}
      </ScrollContainer>
      <div className="relative ml-auto group">
        <HiOutlineInformationCircle className="hover:text-blue-500 cursor-pointer " />
        <div className="group-hover:block hidden absolute right-0 top-[155%] text-xs bg-slate-200 px-2 py-1 rounded-md w-max">
          {currentRoute.encounters
            .sort((a, b) => {
              if (a.weight > b.weight) {
                return -1
              }
              return 1
            })
            .map((encounter) => (
              <div key={encounter.value + encounter.weight} className="flex">
                <p className="">
                  {encounter.value}{" "}
                  <span className="font-semibold">{`${encounter.weight}%`}</span>
                </p>
              </div>
            ))}
          <p className="">
            Shiny Chance{" "}
            <span className="font-semibold">
              {`${(1 / (currentRoute.shinyChange || 500)) * 100}%`}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RouteIndicator
