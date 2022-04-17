import "../styles/globals.css"
import type { AppProps } from "next/app"
import { PokemonStorageProvider } from "../providers/pokemon.storage.provider"
import { UserStorageProvider } from "../providers/user.provider"
import { ClientProvider } from "../providers/client.provider"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClientProvider>
      <UserStorageProvider>
        <PokemonStorageProvider>
          <Component {...pageProps} />
        </PokemonStorageProvider>
      </UserStorageProvider>
    </ClientProvider>
  )
}

export default MyApp
