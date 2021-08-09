import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context"
import { offsetLimitPagination } from "@apollo/client/utilities";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
const TOKEN = "token";

export const logUserIn = async (token) => {
    await AsyncStorage.setItem(TOKEN, token)
    isLoggedInVar(true)
    tokenVar(token)
};

const httpLink = createHttpLink({
    uri: "https://tender-owl-93.loca.lt/graphql",
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
    link: authLink.concat(httpLink),
    cache,
})

export default client;