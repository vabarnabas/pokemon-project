import "../styles/globals.css"
import type { AppProps } from "next/app"
import { PokemonStorageProvider } from "../providers/pokemon.storage.provider"
import { UserStorageProvider } from "../providers/user.provider"
import { ClientProvider } from "../providers/client.provider"
import { ItemStorageProvider } from "../providers/item.storage.provider"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClientProvider>
      <UserStorageProvider>
        <ItemStorageProvider>
          <PokemonStorageProvider>
            <Component {...pageProps} />
          </PokemonStorageProvider>
        </ItemStorageProvider>
      </UserStorageProvider>
    </ClientProvider>
  )
}

export default MyApp
