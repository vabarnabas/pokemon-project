import { useRouter } from "next/router"
import React from "react"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"

const Dev = () => {
  const router = useRouter()
  const { clearStorage } = usePokemonStorage()

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <button
        onClick={() => {
          clearStorage()
          router.push("/encounter")
        }}
        className="bg-rose-500 hover:bg-rose-600 px-4 py-1 rounded-md text-white text-sm"
      >
        Clear Storage
      </button>
    </div>
  )
}

export default Dev
