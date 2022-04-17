import { gql } from "urql"

export const queryGetGift = gql`
  query queryGetGift($id: uuid = "") {
    gift_by_pk(id: $id) {
      id
      message
      pokemon
      trainer
    }
  }
`
