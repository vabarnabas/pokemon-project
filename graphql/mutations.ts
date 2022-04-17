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

export const mutationDeleteGift = gql`
  mutation mutationDeleteGift($id: uuid!) {
    delete_gift_by_pk(id: $id) {
      id
    }
  }
`
