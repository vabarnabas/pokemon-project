import "../styles/globals.css"
import type { AppProps } from "next/app"
import { PokemonStorageProvider } from "../providers/pokemon.storage.provider"
import { UserStorageProvider } from "../providers/user.provider"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserStorageProvider>
      <PokemonStorageProvider>
        <Component {...pageProps} />
      </PokemonStorageProvider>
    </UserStorageProvider>
  )
}

export default MyApp
