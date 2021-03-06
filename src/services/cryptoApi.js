import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '14c4b57e4bmsh0a0745e6219a17ap153b00jsn9369ffb0d3f2'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`coins?limit=${count}`)
        }),
        getCryptosWithCondition: builder.query({
            query: ({count, pageCount, searchTerm}) => createRequest(`coins?limit=${count}&search=${searchTerm}&offset=${count * pageCount}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`)
        }),
        getCryptoExchanges: builder.query({
            query: (coinId) => createRequest(`coin/Qwsogvtv82FCd/exchanges`)
        }),
    })
});
 
export const {
    useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetCryptoExchangesQuery, useGetCryptosWithConditionQuery
} = cryptoApi;