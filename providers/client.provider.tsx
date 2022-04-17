import { createClient, Provider } from "urql"

const client = createClient({
  url: "https://vabarnabas-pokemon.hasura.app/v1/graphql",
  fetchOptions: {
    headers: {
      "x-hasura-admin-secret":
        "Fz2O6wmw719biJMeb7c63qE3rM9FoUeH831HLtavIZGqPJewwIZjgZZV4Cen40pU",
    },
  },
})

interface Props {
  children: React.ReactNode
}

export const ClientProvider: React.FC<Props> = ({ children }) => (
  <Provider value={client}>{children}</Provider>
)
