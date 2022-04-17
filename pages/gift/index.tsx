import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { CgPokemon } from "react-icons/cg"
import { HiX } from "react-icons/hi"
import { useMutation, useQuery } from "urql"
import { useImporter } from "../../data/useImporter"
import { Pokemon } from "../../data/usePokemon"
import { mutationDeleteGift } from "../../graphql/mutations"
import { queryGetGift } from "../../graphql/queries"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"

const Gift = () => {
  const [pokemon, setPokemon] = useState({} as Pokemon)
  const router = useRouter()
  const { gid: giftId } = router.query
  const [{ data, fetching }, getGift] = useQuery({
    query: queryGetGift,
    pause: true,
    variables: { id: giftId },
  })
  const [, removeGift] = useMutation(mutationDeleteGift)
  const { getPokemonSprite } = useImporter()
  const { addPokemon } = usePokemonStorage()

  const runGift = async () => {
    await getGift({ requestPolicy: "network-only" })
  }

  const acceptGift = async () => {
    addPokemon(pokemon)
    await removeGift({ id: giftId })
    router.push("/encounter")
  }

  useEffect(() => {
    if (router.isReady && !giftId) {
      router.push("/encounter")
    } else {
      runGift()
    }
  }, [router.isReady])

  useEffect(() => {
    if (data && data.gift_by_pk !== null) {
      setPokemon(JSON.parse(data?.gift_by_pk?.pokemon))
    }
    if (data && data.gift_by_pk === null) {
      router.push("/encounter")
    }
  }, [data])

  return (
    <div className="h-screen w-screen flex items-center justify-center select-none">
      {data && Object.keys(pokemon).length > 0 && (
        <div className="flex items-center justify-center flex-col text-slate-600">
          <p className="mb-4 font-semibold">
            <span className="font-bold text-blue-500">
              {data.gift_by_pk.trainer}
            </span>{" "}
            have sent you a gift!
          </p>
          <div className="relative bg-slate-100 rounded-md px-8 pt-4 pb-4 flex flex-col items-center justify-center">
            <p className="absolute left-0 px-2 py-0.5 rounded-r-md text-white top-10 text-xs bg-amber-500 flex items-center justify-center">
              {new Date(pokemon.createdAt).toLocaleDateString("en-US")}
              <CgPokemon className="text-sm ml-1" />
            </p>
            <div className="absolute inset-x-3 top-3 flex items-center justify-between">
              {pokemon.shiny && <p className="ml-1 text-sm">✨</p>}
              <HiX
                onClick={() => {}}
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
            <div className="grid grid-cols-2 gap-x-4">
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
            <button
              onClick={() => {
                acceptGift()
              }}
              className="bg-emerald-500 hover:bg-emerald-600 px-4 py-1 rounded-md text-white text-sm col-span-2 w-full"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gift
