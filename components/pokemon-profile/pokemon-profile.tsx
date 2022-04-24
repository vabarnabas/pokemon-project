import Image from "next/image"
import React, { Fragment } from "react"
import { useImporter } from "../../data/useImporter"
import { Pokemon } from "../../data/usePokemon"
import { HiX } from "react-icons/hi"
import { CgPokemon } from "react-icons/cg"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"
import { Dialog, Transition } from "@headlessui/react"
import { useUserStorage } from "../../providers/user.provider"
import { useMutation } from "urql"
import { mutationCreateGift } from "../../graphql/mutations"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/router"
import { MdOutlineMale, MdOutlineFemale } from "react-icons/md"

interface Button {
  name: string
  color: "bg-blue-500" | "bg-emerald-500" | "bg-rose-500" | "bg-slate-300"
  hoverColor: "bg-blue-600" | "bg-emerald-600" | "bg-rose-600" | "bg-slate-300"
  span: 1 | 2
  action: (...params: any) => void
}
interface Props {
  open: boolean
  pokemon: Pokemon
  onClose(...params: any): void
  buttons?: Button[]
}

const PokemonProfile: React.FC<Props> = ({
  open,
  pokemon,
  onClose,
  buttons,
}) => {
  const router = useRouter()
  const { getPokemonSprite, getTypeSprite } = useImporter()
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
    <Transition show={open} appear as={Fragment}>
      <Dialog
        as="div"
        onClose={() => onClose()}
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
        {Object.keys(pokemon).length > 0 && (
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
              <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                {pokemon.shiny && <p className="ml-1 text-sm">✨</p>}
                <div className="ml-auto flex space-x-1 bg-opacity-80 px-2 text-xs">
                  {pokemon.ivs
                    .filter((iv) => iv > 28)
                    .map((iv: number, index: number) => (
                      <div
                        key={pokemon.id + "_" + iv + "_" + index}
                        className=""
                      >
                        {iv === 31 ? "🌟" : "⭐️"}
                      </div>
                    ))}
                </div>
                <HiX
                  onClick={() => onClose()}
                  className="ml-auto cursor-pointer text-lg hover:text-blue-500"
                />
              </div>
              <div className="relative -mb-2 h-32 w-32">
                <Image
                  src={getPokemonSprite(pokemon.baseData.sprite, pokemon.shiny)}
                  layout="fill"
                  objectFit="cover"
                  unoptimized
                  quality={1}
                />
              </div>
              <p className="text-xs">
                HP:{" "}
                <span className="font-semibold text-blue-500">
                  {Math.floor(
                    0.01 * 2 * pokemon.baseData.stamina +
                      pokemon.ivs[0] +
                      0.5 * pokemon.level
                  ) +
                    pokemon.level +
                    10}
                </span>
              </p>
              <div className="flex items-center">
                <p className="font-bold text-blue-500">
                  {pokemon.baseData.name}
                </p>
                {pokemon.gender === "male" && (
                  <MdOutlineMale className="ml-0.5 text-sm text-blue-500" />
                )}
                {pokemon.gender === "female" && (
                  <MdOutlineFemale className="ml-0.5 text-sm text-pink-500" />
                )}
              </div>
              <p className="-mt-1 text-xs">{`lv. ${pokemon.level}`}</p>
              <div className="my-2 flex space-x-2">
                {pokemon.baseData.types.map((type) => (
                  <div className="relative h-4 w-4">
                    <Image
                      src={getTypeSprite(type?.name || "")}
                      layout="fill"
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-x-4">
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
              <div className="grid w-full grid-cols-2 gap-x-3 gap-y-3">
                {buttons &&
                  buttons.map((button) => (
                    <button
                      key={button.name}
                      onClick={() => button.action()}
                      className={`${button.color} ${
                        button.span === 1 ? "col-span-1" : "col-span-2"
                      } w-full rounded-md px-4 py-1 text-sm text-white outline-none hover:${
                        button.hoverColor
                      }`}
                    >
                      {button.name}
                    </button>
                  ))}
              </div>
              <p className="absolute left-0 top-10 flex items-center justify-center rounded-r-md bg-amber-500 px-2 py-0.5 text-xs text-white">
                {new Date(pokemon.createdAt).toLocaleDateString("en-US")}
                <CgPokemon className="ml-1 text-sm" />
              </p>
            </div>
          </Transition.Child>
        )}
      </Dialog>
    </Transition>
  )
}

export default PokemonProfile
