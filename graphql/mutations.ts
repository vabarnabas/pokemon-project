import { gql } from "urql"

export const mutationCreateGift = gql`
  mutation mutationCreateGift(
    $id: uuid
    $message: String = ""
    $pokemon: String
    $trainer: String
  ) {
    insert_gift_one(
      object: {
        id: $id
        message: $message
        pokemon: $pokemon
        trainer: $trainer
      }
    ) {
      id
    }
  }
`
