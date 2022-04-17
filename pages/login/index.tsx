import React, { SyntheticEvent, useState } from "react"
import { FaUserAlt } from "react-icons/fa"
import { useUserStorage } from "../../providers/user.provider"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/router"

const Login = () => {
  const { createUser } = useUserStorage()
  const router = useRouter()
  const [name, setName] = useState("")

  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    createUser({
      username: name,
      level: 1,
      id: uuidv4(),
    })
    router.push("/encounter")
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center text-slate-600 select-none">
      <form
        onSubmit={(e) => onFormSubmit(e)}
        action=""
        className="flex flex-col items-center justify-center"
      >
        <p className="text-blue-500 font-bold text-2xl mb-4">Create Trainer</p>
        <div className="relative flex items-center justify-start">
          <FaUserAlt className="absolute left-3 text-xs text-slate-500" />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Trainer Name"
            className="bg-slate-100 rounded-md py-1 pl-8 pr-4 outline-none text-sm"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white w-full rounded-md py-1 text-sm mt-3">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
