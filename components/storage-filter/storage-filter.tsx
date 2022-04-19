import React, { useState } from "react"
import { useImporter } from "../../data/useImporter"
import { Route } from "../../data/useRoutes"
import { HiOutlineInformationCircle } from "react-icons/hi"
import ScrollContainer from "react-indiana-drag-scroll"
import { useRouter } from "next/router"

interface Props {
  activators: string[]
  setActivators(activators: string[]): void
}

const StorageFilter: React.FC<Props> = ({ activators, setActivators }) => {
  const filterList = [
    { name: "Shiny", value: "shiny" },
    { name: "1*", value: "1*" },
    { name: "2*", value: "2*" },
    { name: "3*", value: "3*" },
  ]

  return (
    <div className="fixed top-12 flex h-12 w-full select-none items-center justify-between space-x-4 border-b border-slate-200 bg-white px-6 text-slate-600">
      <ScrollContainer className="grid w-min grid-flow-col gap-x-2">
        {filterList.map((filter) => (
          <p
            key={filter.name}
            onClick={() => {
              activators.includes(filter.value)
                ? setActivators(
                    activators.filter((item) => item !== filter.value)
                  )
                : setActivators([...activators, filter.value])
            }}
            className={`w-max cursor-pointer rounded-full px-3 py-0.5 text-center text-sm font-semibold text-white ${
              activators.includes(filter.value) ? "bg-blue-500" : "bg-slate-400"
            }`}
          >
            {filter.name}
          </p>
        ))}
      </ScrollContainer>
      <div className="group relative ml-auto">
        <HiOutlineInformationCircle className="cursor-pointer hover:text-blue-500" />
      </div>
    </div>
  )
}

export default StorageFilter
