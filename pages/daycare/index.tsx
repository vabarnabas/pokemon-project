import { Dialog } from "@headlessui/react"
import Image from "next/image"
import React, { useState } from "react"
import { CgPokemon } from "react-icons/cg"
import { HiPlus, HiPlusSm, HiX } from "react-icons/hi"
import { MdOutlineFemale, MdOutlineMale } from "react-icons/md"
import PokemonProfile from "../../components/pokemon-profile/pokemon-profile"
import PokemonTile from "../../components/pokemon-tile/pokemon-tile"
import StorageGrid from "../../components/storage-grid/storage-grid"
import { useImporter } from "../../data/useImporter"
import { Pokemon } from "../../data/usePokemon"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"

interface BreedingPair {
  pokemon1: Pokemon
  pokemon2: Pokemon
}

const Daycare = () => {
  const { getPokemonSprite } = useImporter()
  const { pokemonStorage } = usePokemonStorage()
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>({} as Pokemon)
  const [breedingPair, setBreedingPair] = useState<BreedingPair>(
    {} as BreedingPair
  )
  const [showStorage, setShowStorage] = useState(false)

  return (
    <div className="relative flex h-screen w-screen select-none items-center justify-center text-slate-600">
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
      <Dialog
        open={showStorage}
        onClose={setShowStorage}
        className="fixed inset-0 flex select-none items-center justify-center bg-black/60 text-slate-600"
      >
        <div className="px-6scrollbar-hide fixed bottom-0 flex h-[60vh] w-full flex-col items-center justify-start rounded-t-md bg-white px-6 pt-4 pb-2 md:w-auto">
          <div className="relative h-full w-full overflow-y-auto scrollbar-hide">
            <p className="text-xl font-bold">Pokemon Storage</p>
            <StorageGrid
              storage={pokemonStorage}
              onClick={(pokemon) => {
                setShowStorage(false)
                setSelectedPokemon(pokemon)
              }}
            />
          </div>
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
                  <div key={iv + index} className="">
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
