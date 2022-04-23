import { Dialog, Transition } from "@headlessui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { Fragment, useState } from "react"
import { CgPokemon } from "react-icons/cg"
import { HiOutlineInformationCircle, HiPlus, HiX } from "react-icons/hi"
import { MdOutlineFemale, MdOutlineMale } from "react-icons/md"
import ScrollContainer from "react-indiana-drag-scroll"
import Navbar from "../../components/navbar/navbar"
import PokemonTile from "../../components/pokemon-tile/pokemon-tile"
import StorageGrid from "../../components/storage-grid/storage-grid"
import StoragePopup from "../../components/storage-popup/storage-popup"
import { useImporter } from "../../data/useImporter"
import { Pokemon } from "../../data/usePokemon"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"
import { Filter, getFilterResults } from "../../services/advanced_filter"

type BreedingPair = Pokemon[]

const Daycare = () => {
  const router = useRouter()
  const [activators, setActivators] = useState<string[]>([])
  const { getPokemonSprite, getPokemon, generatePokemon } = useImporter()
  const { pokemonStorage, removePokemon, addPokemon } = usePokemonStorage()
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>({} as Pokemon)
  const [breedingPair, setBreedingPair] = useState<BreedingPair>([])
  const [showStorage, setShowStorage] = useState(false)

  console.log(
    breedingPair.length >= 1 &&
      breedingPair.filter((object) => object.id !== breedingPair[0].id)
  )

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
    <div className="relative flex h-screen w-screen select-none items-center justify-center text-slate-600">
      <Navbar
        menuItems={[
          {
            name: "Back",
            action: () => router.back(),
          },
        ]}
      />
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="grid grid-flow-col gap-x-12">
          {breedingPair.length > 0 ? (
            <PokemonTile
              pokemon={breedingPair[0]}
              onClick={() => {
                setBreedingPair(
                  breedingPair.filter(
                    (object) => object.id !== breedingPair[0].id
                  )
                )
              }}
            />
          ) : (
            <div
              onClick={() => setShowStorage(true)}
              className="group relative flex aspect-square h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-md border p-2 hover:border-blue-500"
            >
              <HiPlus className="text-2xl text-slate-400 group-hover:text-blue-500" />
            </div>
          )}
          {breedingPair.length > 0 &&
            (breedingPair.length > 1 ? (
              <PokemonTile
                pokemon={breedingPair[1]}
                onClick={() => {
                  setBreedingPair(
                    breedingPair.filter(
                      (object) => object.id !== breedingPair[1].id
                    )
                  )
                }}
              />
            ) : (
              <div
                onClick={() => setShowStorage(true)}
                className="group relative flex aspect-square h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-md border p-2 hover:border-blue-500"
              >
                <HiPlus className="text-2xl text-slate-400 group-hover:text-blue-500" />
              </div>
            ))}
        </div>
        {breedingPair.length === 2 && (
          <div className="flex flex-col items-center justify-center">
            <PokemonTile
              pokemon={generatePokemon(
                [
                  breedingPair[0].gender === "female"
                    ? breedingPair[0].baseData.name
                    : breedingPair[1].baseData.name,
                ],
                [1, 1],
                false,
                25,
                [0, 0, 0]
              )}
              onClick={() => {}}
            />
            <p className="mt-6 font-bold text-blue-500">IVs</p>
            <div className="grid grid-cols-3 gap-x-2 text-xs">
              <div className="flex flex-col items-center justify-center">
                <p className="">STA</p>
                <p
                  className={`${
                    Math.floor(
                      (breedingPair[0].ivs[0] + breedingPair[1].ivs[0]) / 2
                    ) === 31
                      ? "text-emerald-500"
                      : Math.floor(
                          (breedingPair[0].ivs[0] + breedingPair[1].ivs[0]) / 2
                        ) > 28
                      ? "text-blue-500"
                      : ""
                  }`}
                >
                  {[breedingPair[0].ivs[0], breedingPair[1].ivs[0]]
                    .sort((a, b) => {
                      if (a > b) {
                        return 1
                      }
                      return -1
                    })
                    .join(" - ")}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="">ATK</p>
                <p
                  className={`${
                    Math.floor(
                      (breedingPair[0].ivs[1] + breedingPair[1].ivs[1]) / 2
                    ) === 31
                      ? "text-emerald-500"
                      : Math.floor(
                          (breedingPair[0].ivs[1] + breedingPair[1].ivs[1]) / 2
                        ) > 28
                      ? "text-blue-500"
                      : ""
                  }`}
                >
                  {[breedingPair[0].ivs[1], breedingPair[1].ivs[1]]
                    .sort((a, b) => {
                      if (a > b) {
                        return 1
                      }
                      return -1
                    })
                    .join(" - ")}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="">DEF</p>
                <p
                  className={`${
                    Math.floor(
                      (breedingPair[0].ivs[2] + breedingPair[1].ivs[2]) / 2
                    ) === 31
                      ? "text-emerald-500"
                      : Math.floor(
                          (breedingPair[0].ivs[2] + breedingPair[1].ivs[2]) / 2
                        ) > 28
                      ? "text-blue-500"
                      : ""
                  }`}
                >
                  {[breedingPair[0].ivs[2], breedingPair[1].ivs[2]]
                    .sort((a, b) => {
                      if (a > b) {
                        return 1
                      }
                      return -1
                    })
                    .join(" - ")}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                addPokemon(
                  generatePokemon(
                    [
                      breedingPair[0].gender === "female"
                        ? breedingPair[0].baseData.name
                        : breedingPair[1].baseData.name,
                    ],
                    [1, 1],
                    undefined,
                    50,
                    [
                      Math.floor(
                        (breedingPair[0].ivs[0] + breedingPair[1].ivs[0]) / 2
                      ),
                      Math.floor(
                        (breedingPair[0].ivs[1] + breedingPair[1].ivs[1]) / 2
                      ),
                      Math.floor(
                        (breedingPair[0].ivs[2] + breedingPair[1].ivs[2]) / 2
                      ),
                    ]
                  )
                )
                removePokemon(breedingPair[0].id)
                removePokemon(breedingPair[1].id)
                setBreedingPair([])
              }}
              className="mt-6 w-full rounded-md bg-blue-500 px-4 py-1 text-sm text-white outline-none hover:bg-blue-600"
            >
              Breed
            </button>
            <button
              onClick={() => setBreedingPair([])}
              className="mt-3 w-full rounded-md bg-rose-500 px-4 py-1 text-sm text-white outline-none hover:bg-rose-600"
            >
              Reset
            </button>
          </div>
        )}
      </div>
      <StoragePopup
        show={showStorage}
        storage={
          breedingPair.length === 0
            ? pokemonStorage
            : pokemonStorage.filter(
                (pokemon) =>
                  pokemon.gender ===
                    (breedingPair?.[0]?.gender === "male"
                      ? "female"
                      : "male") &&
                  pokemon.baseData.eggGroup.some((element) =>
                    breedingPair?.[0]?.baseData?.eggGroup.includes(element)
                  )
              )
        }
        onClose={() => setShowStorage(false)}
        onPokemonClick={(pokemon) => {
          setSelectedPokemon(pokemon)
          setShowStorage(false)
        }}
      />
      {/* <Transition show={showStorage} appear as={Fragment}>
        <Dialog
          as="div"
          onClose={() => setShowStorage(false)}
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
                  onClick={() => setShowStorage(false)}
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
                  storage={getFilterResults(
                    breedingPair.length === 0
                      ? pokemonStorage
                      : pokemonStorage.filter(
                          (pokemon) =>
                            pokemon.gender ===
                              (breedingPair?.[0]?.gender === "male"
                                ? "female"
                                : "male") &&
                            pokemon.baseData.eggGroup.some((element) =>
                              breedingPair?.[0]?.baseData?.eggGroup.includes(
                                element
                              )
                            )
                        ),
                    filters
                  )}
                  onClick={(pokemon) => {
                    setShowStorage(false)
                    setSelectedPokemon(pokemon)
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => setBreedingPair([])}
              className="mb-4 mt-2 w-full rounded-md bg-rose-500 px-4 py-1 text-sm text-white outline-none hover:bg-rose-600"
            >
              Reset
            </button>
          </Transition.Child>
        </Dialog>
      </Transition> */}
      <Transition
        show={Object.keys(selectedPokemon).length > 0}
        appear
        as={Fragment}
      >
        <Dialog
          onClose={() => {
            setSelectedPokemon({} as Pokemon)
            setShowStorage(true)
          }}
          className="fixed inset-0 flex select-none items-center justify-center text-slate-600"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/60" />
          </Transition.Child>
          {Object.keys(selectedPokemon).length > 0 && (
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="relative flex flex-col items-center justify-center rounded-md bg-white px-10 pt-4 pb-4">
                <p className="absolute left-0 top-10 flex items-center justify-center rounded-r-md bg-amber-500 px-2 py-0.5 text-xs text-white">
                  {new Date(selectedPokemon.createdAt).toLocaleDateString(
                    "en-US"
                  )}
                  <CgPokemon className="ml-1 text-sm" />
                </p>
                <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                  {selectedPokemon.shiny && <p className="ml-1 text-sm">✨</p>}
                  <HiX
                    onClick={() => {
                      setSelectedPokemon({} as Pokemon)
                      setShowStorage(true)
                    }}
                    className="ml-auto cursor-pointer text-lg hover:text-blue-500"
                  />
                </div>
                <div className="flex items-center">
                  <p className="font-bold text-blue-500">
                    {selectedPokemon.baseData.name}
                  </p>
                  {selectedPokemon.gender === "male" && (
                    <MdOutlineMale className="ml-0.5 text-sm text-blue-500" />
                  )}
                  {selectedPokemon.gender === "female" && (
                    <MdOutlineFemale className="ml-0.5 text-sm text-pink-500" />
                  )}
                </div>
                <p className="-mt-1 text-sm">{`lv. ${selectedPokemon.level}`}</p>
                <div className="relative h-32 w-32">
                  <Image
                    src={getPokemonSprite(
                      selectedPokemon.baseData.sprite,
                      selectedPokemon.shiny
                    )}
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                  />
                </div>
                <div className="flex space-x-1 bg-opacity-80 px-2 py-0.5 text-xs">
                  {selectedPokemon.ivs
                    .filter((iv) => iv > 28)
                    .map((iv, index) => (
                      <div
                        key={selectedPokemon.id + "_" + iv + "_" + index}
                        className=""
                      >
                        {iv === 31 ? "🌟" : "⭐️"}
                      </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-x-3">
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-bold text-blue-500">Stats</p>
                    <div className="grid grid-cols-3 gap-x-1 text-xs">
                      <div className="flex flex-col items-center justify-center">
                        <p className="">STA</p>
                        <p className="">{selectedPokemon.baseData.stamina}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <p className="">ATK</p>
                        <p className="">{selectedPokemon.baseData.attack}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <p className="">DEF</p>
                        <p className="">{selectedPokemon.baseData.attack}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-bold text-blue-500">IVs</p>
                    <div className="grid grid-cols-3 gap-x-1 text-xs">
                      <div className="flex flex-col items-center justify-center">
                        <p className="">STA</p>
                        <p
                          className={`${
                            selectedPokemon.ivs[0] === 31
                              ? "text-emerald-500"
                              : selectedPokemon.ivs[0] > 28
                              ? "text-blue-500"
                              : ""
                          }`}
                        >
                          {selectedPokemon.ivs[0]}
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <p className="">ATK</p>
                        <p
                          className={`${
                            selectedPokemon.ivs[1] === 31
                              ? "text-emerald-500"
                              : selectedPokemon.ivs[1] > 28
                              ? "text-blue-500"
                              : ""
                          }`}
                        >
                          {selectedPokemon.ivs[1]}
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <p className="">DEF</p>
                        <p
                          className={`${
                            selectedPokemon.ivs[2] === 31
                              ? "text-emerald-500"
                              : selectedPokemon.ivs[2] > 28
                              ? "text-blue-500"
                              : ""
                          }`}
                        >
                          {selectedPokemon.ivs[2]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="my-3 text-xs">
                  OT:{" "}
                  <span className="font-semibold text-blue-500">
                    {selectedPokemon.ot.username}
                  </span>
                </p>
                <div className="grid w-full grid-cols-2 gap-x-3 gap-y-3">
                  <button
                    onClick={() => {
                      if (breedingPair.length < 2) {
                        breedingPair.push(selectedPokemon)
                      }
                      setSelectedPokemon({} as Pokemon)
                    }}
                    className="${ selectedPokemon.level < 100 col-span-2 rounded-md bg-blue-500 px-4 py-1 text-sm text-white outline-none hover:bg-blue-600"
                  >
                    Select
                  </button>
                </div>
              </div>
            </Transition.Child>
          )}
        </Dialog>
      </Transition>
    </div>
  )
}

export default Daycare
