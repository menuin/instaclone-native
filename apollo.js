import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context"
import { offsetLimitPagination } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
const TOKEN = "token";

export const logUserIn = async (token) => {
    await AsyncStorage.setItem(TOKEN, token)
    isLoggedInVar(true)
    tokenVar(token)
};

const httpLink = createHttpLink({
    uri: "http://c26dbba746f4.ngrok.io/graphql",
    // uri: "http://localhost:4000/graphql",

});
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            token: tokenVar()
        }
    }
});

export const logUserOut = async () => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar(null);
}

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) console.log("g", graphQLErrors);
    if (networkError) console.log("n", networkError);
})

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                seeFeed: offsetLimitPagination()
            }
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(onErrorLink).concat(httpLink),
    cache,
})

export default client;