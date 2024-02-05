// import '@/styles/globals.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import "@/styles/style.css";
import "@/styles/healthCheck.css";
import "@/styles/thankyou.css";

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql`,
    headers: {
      "x-apollo-operation-name": "fileUpload",
    },
  }),
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
