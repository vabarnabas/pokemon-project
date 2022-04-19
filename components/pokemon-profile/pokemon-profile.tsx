import Image from "next/image"
import React, { useState } from "react"
import { useImporter } from "../../data/useImporter"
import { Pokemon } from "../../data/usePokemon"
import { HiX } from "react-icons/hi"
import { CgPokemon } from "react-icons/cg"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"
import { Dialog } from "@headlessui/react"
import { useUserStorage } from "../../providers/user.provider"
import { useMutation } from "urql"
import { mutationCreateGift } from "../../graphql/mutations"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/router"
import { MdOutlineMale, MdOutlineFemale } from "react-icons/md"

interface Props {
  open: boolean
  pokemon: Pokemon
  setSelectedPokemon: (pokemon: Pokemon) => void
}

const PokemonProfile: React.FC<Props> = ({
  open,
  pokemon,
  setSelectedPokemon,
}) => {
  const router = useRouter()
  const { getPokemonSprite } = useImporter()
  const { userStorage } = useUserStorage()
  const { removePokemon, modifyPokemon } = usePokemonStorage()
  const [, createGift] = useMutation(mutationCreateGift)

  const onGiftCreation = async (pokemon: Pokemon) => {
    const giftId = await createGift({
      id: uuidv4(),
      message: `A gift from ${userStorage.username}, enjoy!`,
      pokemon: JSON.stringify(pokemon),
      trainer: userStorage.username,
    })
    if (giftId.data) {
      removePokemon(pokemon.id)
    }
    router.push({
      pathname: "/gift",
      query: {
        gid: giftId?.data?.insert_gift_one?.id,
      },
    })
  }

  return (
    <Dialog
      open={open}
      onClose={() => setSelectedPokemon({} as Pokemon)}
      className="fixed inset-0 flex select-none items-center justify-center bg-black/60 text-slate-600"
    >
      {Object.keys(pokemon).length > 0 && (
        <div className="relative flex flex-col items-center justify-center rounded-md bg-white px-8 pt-4 pb-4">
          <p className="absolute left-0 top-10 flex items-center justify-center rounded-r-md bg-amber-500 px-2 py-0.5 text-xs text-white">
            {new Date(pokemon.createdAt).toLocaleDateString("en-US")}
            <CgPokemon className="ml-1 text-sm" />
          </p>
          <div className="absolute inset-x-3 top-3 flex items-center justify-between">
            {pokemon.shiny && <p className="ml-1 text-sm">✨</p>}
            <HiX
              onClick={() => setSelectedPokemon({} as Pokemon)}
              className="ml-auto cursor-pointer text-lg hover:text-blue-500"
            />
          </div>
          <div className="flex items-center">
            <p className="font-bold text-blue-500">{pokemon.baseData.name}</p>
            {pokemon.gender === "male" && (
              <MdOutlineMale className="ml-0.5 text-sm text-blue-500" />
            )}
            {pokemon.gender === "female" && (
              <MdOutlineFemale className="ml-0.5 text-sm text-pink-500" />
            )}
          </div>
          <p className="-mt-1 text-sm">{`lv. ${pokemon.level}`}</p>
          <div className="relative h-32 w-32">
            <Image
              src={getPokemonSprite(pokemon.baseData.sprite, pokemon.shiny)}
              layout="fill"
            />
          </div>
          <div className="flex space-x-1 bg-opacity-80 px-2 py-0.5 text-xs">
            {pokemon.ivs
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
                  <p className="">{pokemon.baseData.stamina}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="">ATK</p>
                  <p className="">{pokemon.baseData.attack}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="">DEF</p>
                  <p className="">{pokemon.baseData.attack}</p>
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
                      pokemon.ivs[0] === 31
                        ? "text-emerald-500"
                        : pokemon.ivs[0] > 28
                        ? "text-blue-500"
                        : ""
                    }`}
                  >
                    {pokemon.ivs[0]}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="">ATK</p>
                  <p
                    className={`${
                      pokemon.ivs[1] === 31
                        ? "text-emerald-500"
                        : pokemon.ivs[1] > 28
                        ? "text-blue-500"
                        : ""
                    }`}
                  >
                    {pokemon.ivs[1]}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="">DEF</p>
                  <p
                    className={`${
                      pokemon.ivs[2] === 31
                        ? "text-emerald-500"
                        : pokemon.ivs[2] > 28
                        ? "text-blue-500"
                        : ""
                    }`}
                  >
                    {pokemon.ivs[2]}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="my-3 text-xs">
            OT:{" "}
            <span className="font-semibold text-blue-500">
              {pokemon.ot.username}
            </span>
          </p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-3">
            <button
              onClick={() => {
                if (pokemon.level < 100) {
                  pokemon.level++
                  modifyPokemon(pokemon)
                  setSelectedPokemon(pokemon)
                }
              }}
              className={`col-span-2 rounded-md px-4 py-1 text-sm text-white outline-none ${
                pokemon.level < 100
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-slate-300"
              }`}
            >
              Level Up
            </button>
            <button
              onClick={() => {
                removePokemon(pokemon.id)
                setSelectedPokemon({} as Pokemon)
              }}
              className="rounded-md bg-rose-500 px-4 py-1 text-sm text-white outline-none hover:bg-rose-600"
            >
              Release
            </button>
            <button
              onClick={() => {
                onGiftCreation(pokemon)
              }}
              className="rounded-md bg-rose-500 px-4 py-1 text-sm text-white outline-none hover:bg-rose-600"
            >
              Gift
            </button>
          </div>
        </div>
      )}
    </Dialog>
  )
}

export default PokemonProfile
