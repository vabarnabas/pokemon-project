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
  const filterList = [{ name: "Shiny", value: "shiny" }]

  return (
    <div className="fixed top-12 w-full h-12 flex items-center justify-between border-b space-x-4 bg-white border-slate-200 select-none px-6 text-slate-600">
      <ScrollContainer className="w-min grid grid-flow-col gap-x-2">
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
            className={`cursor-pointer px-3 py-0.5 text-sm font-semibold text-center rounded-full text-white w-max ${
              activators.includes(filter.value)
                ? "bg-blue-500"
                : "bg-slate-400 "
            }`}
          >
            {filter.name}
          </p>
        ))}
      </ScrollContainer>
      <div className="relative ml-auto group">
        <HiOutlineInformationCircle className="hover:text-blue-500 cursor-pointer " />
      </div>
    </div>
  )
}

export default StorageFilter
