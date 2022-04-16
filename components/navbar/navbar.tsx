import React from "react"

export interface MenuItem {
  name: string
  action: (...params: any) => void
}

interface Props {
  menuItems: MenuItem[]
}

const Navbar: React.FC<Props> = ({ menuItems }) => {
  return (
    <div className="fixed top-0 left0 w-full h-12 border-b bg-white border-slate-200 px-6 flex items-center justify-center">
      <p className="mr-auto font-bold cursor-pointer select-none">
        <span className="text-blue-500">Pokemon</span> Project
      </p>
      <div className="ml-auto flex items-center justify-center space-x-4">
        {menuItems.map((item) => (
          <p
            key={item.name}
            onClick={() => item.action()}
            className="cursor-pointer text-sm font-semibold hover:text-blue-500"
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Navbar
