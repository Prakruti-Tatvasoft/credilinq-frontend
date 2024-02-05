import { gql } from "@apollo/client";

export const addHealthFormMutation = gql`
  mutation createHealthForm($file: [Upload!]!, $input: CreateHealthFormInput!) {
    createHealthForm(file: $file, input: $input) {
      id
    }
  }
`;
