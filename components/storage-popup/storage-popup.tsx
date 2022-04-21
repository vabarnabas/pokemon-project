import { Transition, Dialog } from "@headlessui/react"
import React, { Fragment, useState } from "react"
import { HiX, HiOutlineInformationCircle } from "react-icons/hi"
import ScrollContainer from "react-indiana-drag-scroll"
import { Pokemon } from "../../data/usePokemon"
import { Filter, getFilterResults } from "../../services/advanced_filter"
import StorageGrid from "../storage-grid/storage-grid"

interface Button {
  name: string
  color: "bg-blue-500" | "bg-emerald-500" | "bg-rose-500" | "bg-slate-300"
  span: 1 | 2
  action(...params: any): void
}

interface Props {
  show: boolean
  onClose(...params: any): void
  storage: Pokemon[]
  onPokemonClick(...params: any): void
  buttons?: Button[]
}

const StoragePopup: React.FC<Props> = ({
  show,
  onClose,
  storage,
  onPokemonClick,
  buttons,
}) => {
  const [activators, setActivators] = useState<string[]>([])

  const filterList = [
    { name: "Shiny", value: "shiny" },
    { name: "1*", value: "1*" },
    { name: "2*", value: "2*" },
    { name: "3*", value: "3*" },
  ]

  const filters: Filter[] = [
    {
      id: "shiny",
      type: "boolean",
      key: "shiny",
      value: true,
      active: activators.includes("shiny"),
    },
    {
      id: "1*",
      type: "stars",
      key: "ivs",
      value: 1,
      active: activators.includes("1*"),
    },
    {
      id: "2*",
      type: "stars",
      key: "ivs",
      value: 2,
      active: activators.includes("2*"),
    },
    {
      id: "3*",
      type: "stars",
      key: "ivs",
      value: 3,
      active: activators.includes("3*"),
    },
  ]

  return (
    <Transition show={show} appear as={Fragment}>
      <Dialog
        as="div"
        onClose={() => onClose()}
        className="fixed inset-0 flex select-none items-center justify-center text-slate-600"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        </Transition.Child>
        <Transition.Child
          className="fixed bottom-0 flex h-[60vh] min-w-[304px] flex-col items-center justify-start overflow-hidden rounded-t-md bg-white px-6 scrollbar-hide"
          as="div"
          enter="ease-in-out transition-all duration-500"
          enterFrom="-bottom-[60%]"
          enterTo=""
          leave="transition-all ease-in-out duration-500"
          leaveFrom=""
          leaveTo="-bottom-[60%]"
        >
          <div className="absolute z-10 w-full bg-white px-6 pt-4">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">Pokemon Storage</p>
              <HiX
                onClick={() => onClose()}
                className="cursor-pointer hover:text-blue-500"
              />
            </div>
            <div className="flex h-min w-full select-none items-center justify-between space-x-4 border-b border-slate-200 bg-white py-2 text-slate-600">
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
                    className={`w-max cursor-pointer rounded-full px-3 py-0.5 text-center text-xs font-semibold text-white ${
                      activators.includes(filter.value)
                        ? "bg-blue-500"
                        : "bg-slate-400"
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
          </div>
          <div className="relative h-full w-full overflow-y-auto pt-4 scrollbar-hide">
            <div className="mt-16 flex justify-center">
              <StorageGrid
                storage={getFilterResults(storage, filters)}
                onClick={(pokemon) => onPokemonClick(pokemon)}
              />
            </div>
          </div>
          {buttons?.map((button) => (
            <button
              onClick={() => button.action()}
              className="mb-4 mt-2 w-full rounded-md bg-rose-500 px-4 py-1 text-sm text-white outline-none hover:bg-rose-600"
            >
              {button.name}
            </button>
          ))}
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default StoragePopup
