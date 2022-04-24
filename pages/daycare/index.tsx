import { Dialog, Transition } from "@headlessui/react"
import { useRouter } from "next/router"
import React, { Fragment, useState } from "react"
import { HiOutlineInformationCircle, HiPlus, HiX } from "react-icons/hi"
import PokemonProfile from "../../components/pokemon-profile/pokemon-profile"
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

      <PokemonProfile
        pokemon={selectedPokemon}
        open={Object.keys(selectedPokemon).length > 0}
        onClose={() => setSelectedPokemon({} as Pokemon)}
        buttons={[
          {
            name: "Select",
            color: "bg-blue-500",
            hoverColor: "bg-blue-600",
            span: 2,
            action: () => {
              breedingPair.push(selectedPokemon)
              setSelectedPokemon({} as Pokemon)
            },
          },
        ]}
      />
    </div>
  )
}

export default Daycare
