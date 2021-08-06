import { ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
    uri: "https://63f1e0cbc296.ngrok.io",
    cache: new InMemoryCache(),
})

export default client;