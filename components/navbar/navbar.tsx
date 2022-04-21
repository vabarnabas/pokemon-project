import { Menu } from "@headlessui/react"
import React from "react"
import { HiChevronDown } from "react-icons/hi"

export interface MenuItem {
  name: string
  action: (...params: any) => void
}

interface Props {
  menuItems: MenuItem[]
}

const Navbar: React.FC<Props> = ({ menuItems }) => {
  return (
    <div className="left0 fixed top-0 flex h-12 w-full items-center justify-center border-b border-slate-200 bg-white px-6">
      <p className="mr-auto cursor-pointer select-none font-bold">
        <span className="text-blue-500">Pokemon</span> Project
      </p>
      {menuItems.length > 1 ? (
        <Menu as="div" className="relative flex">
          <Menu.Button className="flex items-center justify-center space-y-2 rounded-md text-sm font-semibold outline-none hover:text-blue-500">
            Menu
            <HiChevronDown className="ml-1 text-lg" />
          </Menu.Button>
          <Menu.Items
            as="div"
            className="bg-soft-gray absolute top-[110%] right-0 flex w-max origin-top-right flex-col items-end justify-center space-y-1 rounded-md border bg-white px-2 py-2 outline-none"
          >
            {menuItems.map((item) => (
              <Menu.Item
                onClick={() => item?.action && item?.action()}
                as="div"
                className="w-full"
                key={item.name}
              >
                {({ active }) => (
                  <div
                    className={`flex w-full cursor-pointer items-center justify-end rounded-md px-3 py-1 text-right text-sm font-semibold ${
                      active ? "bg-blue-500 text-slate-50" : ""
                    }`}
                  >
                    <p>{item.name}</p>
                  </div>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      ) : (
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
      )}
    </div>
  )
}

export default Navbar
