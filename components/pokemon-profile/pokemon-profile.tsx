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

interface Props {
  pokemon: Pokemon
  setSelectedPokemon: (pokemon: Pokemon) => void
}

const PokemonProfile: React.FC<Props> = ({ pokemon, setSelectedPokemon }) => {
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
      open={true}
      onClose={() => setSelectedPokemon({} as Pokemon)}
      className="fixed inset-0 bg-black/60 flex items-center justify-center text-slate-600 select-none"
    >
      <div className="relative bg-white rounded-md px-8 pt-4 pb-4 flex flex-col items-center justify-center">
        <p className="absolute left-0 px-2 py-0.5 rounded-r-md text-white top-10 text-xs bg-amber-500 flex items-center justify-center">
          {new Date(pokemon.createdAt).toLocaleDateString("en-US")}
          <CgPokemon className="text-sm ml-1" />
        </p>
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          {pokemon.shiny && <p className="ml-1 text-sm">✨</p>}
          <HiX
            onClick={() => setSelectedPokemon({} as Pokemon)}
            className="ml-auto cursor-pointer text-lg hover:text-blue-500"
          />
        </div>
        <div className="flex">
          <p className="text-blue-500 font-bold">{pokemon.baseData.name}</p>
        </div>
        <p className="text-sm -mt-1">{`lv. ${pokemon.level}`}</p>
        <div className="relative h-32 w-32">
          <Image
            src={getPokemonSprite(pokemon.baseData.sprite, pokemon.shiny)}
            layout="fill"
          />
        </div>
        <div className="text-xs px-2 py-0.5 flex space-x-1 bg-opacity-80">
          {pokemon.ivs
            .filter((iv) => iv > 28)
            .map((iv) => (
              <div className="">{iv === 31 ? "🌟" : "⭐️"}</div>
            ))}
        </div>
        <div className="grid grid-cols-2 gap-x-3">
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-blue-500">Stats</p>
            <div className="text-xs grid grid-cols-3 gap-x-1">
              <div className="flex flex-col items-center justify-center">
                <p className="">HP</p>
                <p className="">{pokemon.baseData.hp}</p>
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
            <div className="text-xs grid grid-cols-3 gap-x-1">
              <div className="flex flex-col items-center justify-center">
                <p className="">HP</p>
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
        <p className="text-xs my-3">
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
            className={`px-4 py-1 rounded-md text-white text-sm col-span-2 ${
              pokemon.level < 100
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-slate-400"
            }`}
          >
            Level Up
          </button>
          <button
            onClick={() => {
              removePokemon(pokemon.id)
              setSelectedPokemon({} as Pokemon)
            }}
            className="bg-rose-500 hover:bg-rose-600 px-4 py-1 rounded-md text-white text-sm"
          >
            Release
          </button>
          <button
            onClick={() => {
              onGiftCreation(pokemon)
            }}
            className="bg-rose-500 hover:bg-rose-600 px-4 py-1 rounded-md text-white text-sm"
          >
            Gift
          </button>
        </div>
      </div>
    </Dialog>
  )
}

export default PokemonProfile
