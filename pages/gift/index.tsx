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
    <div className="flex h-screen w-screen select-none items-center justify-center">
      {data && Object.keys(pokemon).length > 0 && (
        <div className="flex flex-col items-center justify-center text-slate-600">
          <p className="mb-4 font-semibold">
            <span className="font-bold text-blue-500">
              {data.gift_by_pk.trainer}
            </span>{" "}
            have sent you a gift!
          </p>
          <div className="relative flex flex-col items-center justify-center rounded-md bg-slate-100 px-8 pt-4 pb-4">
            <p className="absolute left-0 top-10 flex items-center justify-center rounded-r-md bg-amber-500 px-2 py-0.5 text-xs text-white">
              {new Date(pokemon.createdAt).toLocaleDateString("en-US")}
              <CgPokemon className="ml-1 text-sm" />
            </p>
            <div className="absolute inset-x-3 top-3 flex items-center justify-between">
              {pokemon.shiny && <p className="ml-1 text-sm">✨</p>}
              <HiX
                onClick={() => {}}
                className="ml-auto cursor-pointer text-lg hover:text-blue-500"
              />
            </div>
            <div className="flex">
              <p className="font-bold text-blue-500">{pokemon.baseData.name}</p>
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
                  <div key={pokemon.id + "_" + iv + "_" + index} className="">
                    {iv === 31 ? "🌟" : "⭐️"}
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="flex flex-col items-center justify-center">
                <p className="font-bold text-blue-500">Stats</p>
                <div className="grid grid-cols-3 gap-x-1 text-xs">
                  <div className="flex flex-col items-center justify-center">
                    <p className="">HP</p>
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
            <p className="my-3 text-xs">
              OT:{" "}
              <span className="font-semibold text-blue-500">
                {pokemon.ot.username}
              </span>
            </p>
            <button
              onClick={() => {
                acceptGift()
              }}
              className="col-span-2 w-full rounded-md bg-emerald-500 px-4 py-1 text-sm text-white hover:bg-emerald-600"
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
