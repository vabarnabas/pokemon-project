import { Dialog } from "@headlessui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { CgPokemon } from "react-icons/cg"
import { HiPlus, HiPlusSm, HiX } from "react-icons/hi"
import { MdOutlineFemale, MdOutlineMale } from "react-icons/md"
import Navbar from "../../components/navbar/navbar"
import PokemonProfile from "../../components/pokemon-profile/pokemon-profile"
import PokemonTile from "../../components/pokemon-tile/pokemon-tile"
import StorageGrid from "../../components/storage-grid/storage-grid"
import { useImporter } from "../../data/useImporter"
import { EggGroup, Pokemon } from "../../data/usePokemon"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"

interface BreedingPair {
  pokemon1: Pokemon
  pokemon2: Pokemon
}

type BreedingPair2 = [pokemon1: Pokemon, pokemon2: Pokemon]

const Daycare = () => {
  const router = useRouter()
  const { getPokemonSprite, getPokemon, generatePokemon } = useImporter()
  const { pokemonStorage, removePokemon, addPokemon } = usePokemonStorage()
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>({} as Pokemon)
  const [breedingPair, setBreedingPair] = useState<BreedingPair>(
    {} as BreedingPair
  )
  const [breeding, setBreeding] = useState<BreedingPair2>([
    {} as Pokemon,
    {} as Pokemon,
  ])
  const [showStorage, setShowStorage] = useState(false)

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
          {Object.keys(breedingPair?.pokemon1 || {}).length > 0 ? (
            <PokemonTile pokemon={breedingPair.pokemon1} onClick={() => {}} />
          ) : (
            <div
              onClick={() => setShowStorage(true)}
              className="group relative flex aspect-square h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-md border p-2 hover:border-blue-500"
            >
              <HiPlus className="text-2xl text-slate-400 group-hover:text-blue-500" />
            </div>
          )}
          {Object.keys(breedingPair?.pokemon1 || {}).length > 0 &&
            (Object.keys(breedingPair.pokemon2 || {}).length > 0 ? (
              <PokemonTile pokemon={breedingPair.pokemon2} onClick={() => {}} />
            ) : (
              <div
                onClick={() => setShowStorage(true)}
                className="group relative flex aspect-square h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-md border p-2 hover:border-blue-500"
              >
                <HiPlus className="text-2xl text-slate-400 group-hover:text-blue-500" />
              </div>
            ))}
        </div>
        {Object.keys(breedingPair?.pokemon1 || {}).length > 0 &&
          Object.keys(breedingPair?.pokemon2 || {}).length > 0 && (
            <div className="flex flex-col items-center justify-center">
              <PokemonTile
                pokemon={generatePokemon(
                  [
                    breedingPair.pokemon1.gender === "female"
                      ? breedingPair.pokemon1.baseData.name
                      : breedingPair.pokemon2.baseData.name,
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
                        (breedingPair.pokemon1.ivs[0] +
                          breedingPair.pokemon2.ivs[0]) /
                          2
                      ) === 31
                        ? "text-emerald-500"
                        : Math.floor(
                            (breedingPair.pokemon1.ivs[0] +
                              breedingPair.pokemon2.ivs[0]) /
                              2
                          ) > 28
                        ? "text-blue-500"
                        : ""
                    }`}
                  >
                    {[
                      breedingPair.pokemon1.ivs[0],
                      breedingPair.pokemon2.ivs[0],
                    ]
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
                        (breedingPair.pokemon1.ivs[1] +
                          breedingPair.pokemon2.ivs[1]) /
                          2
                      ) === 31
                        ? "text-emerald-500"
                        : Math.floor(
                            (breedingPair.pokemon1.ivs[1] +
                              breedingPair.pokemon2.ivs[1]) /
                              2
                          ) > 28
                        ? "text-blue-500"
                        : ""
                    }`}
                  >
                    {[
                      breedingPair.pokemon1.ivs[1],
                      breedingPair.pokemon2.ivs[1],
                    ]
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
                        (breedingPair.pokemon1.ivs[2] +
                          breedingPair.pokemon2.ivs[2]) /
                          2
                      ) === 31
                        ? "text-emerald-500"
                        : Math.floor(
                            (breedingPair.pokemon1.ivs[2] +
                              breedingPair.pokemon2.ivs[2]) /
                              2
                          ) > 28
                        ? "text-blue-500"
                        : ""
                    }`}
                  >
                    {[
                      breedingPair.pokemon1.ivs[2],
                      breedingPair.pokemon2.ivs[2],
                    ]
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
                        breedingPair.pokemon1.gender === "female"
                          ? breedingPair.pokemon1.baseData.name
                          : breedingPair.pokemon2.baseData.name,
                      ],
                      [1, 1],
                      undefined,
                      50,
                      [
                        Math.floor(
                          (breedingPair.pokemon1.ivs[0] +
                            breedingPair.pokemon2.ivs[0]) /
                            2
                        ),
                        Math.floor(
                          (breedingPair.pokemon1.ivs[1] +
                            breedingPair.pokemon2.ivs[1]) /
                            2
                        ),
                        Math.floor(
                          (breedingPair.pokemon1.ivs[2] +
                            breedingPair.pokemon2.ivs[2]) /
                            2
                        ),
                      ]
                    )
                  )
                  removePokemon(breedingPair.pokemon1.id)
                  removePokemon(breedingPair.pokemon2.id)
                  setBreedingPair({} as BreedingPair)
                }}
                className="mt-6 w-full rounded-md bg-blue-500 px-4 py-1 text-sm text-white outline-none hover:bg-blue-600"
              >
                Breed
              </button>
              <button
                onClick={() => setBreedingPair({} as BreedingPair)}
                className="mt-3 w-full rounded-md bg-rose-500 px-4 py-1 text-sm text-white outline-none hover:bg-rose-600"
              >
                Reset
              </button>
            </div>
          )}
      </div>
      <Dialog
        open={showStorage}
        onClose={setShowStorage}
        className="fixed inset-0 flex select-none items-center justify-center bg-black/60 text-slate-600"
      >
        <div className="fixed bottom-0 flex h-[60vh] w-full flex-col items-center justify-start rounded-t-md bg-white px-6 scrollbar-hide md:w-auto">
          <div className="relative h-full w-full overflow-y-auto pt-4 scrollbar-hide">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">Pokemon Storage</p>
              <HiX
                onClick={() => setShowStorage(false)}
                className="cursor-pointer hover:text-blue-500"
              />
            </div>
            <div className="flex justify-center">
              <StorageGrid
                storage={
                  Object.keys(breedingPair?.pokemon1 || {}).length === 0
                    ? pokemonStorage
                    : pokemonStorage.filter(
                        (pokemon) =>
                          pokemon.gender ===
                            (breedingPair?.pokemon1?.gender === "male"
                              ? "female"
                              : "male") &&
                          pokemon.baseData.eggGroup.some((element) =>
                            breedingPair?.pokemon1?.baseData?.eggGroup.includes(
                              element
                            )
                          )
                      )
                }
                onClick={(pokemon) => {
                  setShowStorage(false)
                  setSelectedPokemon(pokemon)
                }}
              />
            </div>
          </div>
          <button
            onClick={() => setBreedingPair({} as BreedingPair)}
            className="mb-4 w-full rounded-md bg-rose-500 px-4 py-1 text-sm text-white outline-none hover:bg-rose-600"
          >
            Reset
          </button>
        </div>
      </Dialog>
      <Dialog
        open={Object.keys(selectedPokemon).length > 0}
        onClose={() => setSelectedPokemon({} as Pokemon)}
        className="fixed inset-0 flex select-none items-center justify-center bg-black/60 text-slate-600"
      >
        {Object.keys(selectedPokemon).length > 0 && (
          <div className="relative flex flex-col items-center justify-center rounded-md bg-white px-10 pt-4 pb-4">
            <p className="absolute left-0 top-10 flex items-center justify-center rounded-r-md bg-amber-500 px-2 py-0.5 text-xs text-white">
              {new Date(selectedPokemon.createdAt).toLocaleDateString("en-US")}
              <CgPokemon className="ml-1 text-sm" />
            </p>
            <div className="absolute inset-x-3 top-3 flex items-center justify-between">
              {selectedPokemon.shiny && <p className="ml-1 text-sm">✨</p>}
              <HiX
                onClick={() => setSelectedPokemon({} as Pokemon)}
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
                  if (breedingPair?.pokemon1 === undefined) {
                    setBreedingPair({
                      ...breedingPair,
                      pokemon1: selectedPokemon,
                    })
                    setSelectedPokemon({} as Pokemon)
                  }
                  if (breedingPair?.pokemon1 !== undefined) {
                    setBreedingPair({
                      ...breedingPair,
                      pokemon2: selectedPokemon,
                    })
                    setSelectedPokemon({} as Pokemon)
                  }
                }}
                className="${ selectedPokemon.level < 100 col-span-2 rounded-md bg-blue-500 px-4 py-1 text-sm text-white outline-none hover:bg-blue-600"
              >
                Select
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default Daycare
