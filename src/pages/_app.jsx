import '../styles/globals.css'
import Layout from '../../components/Layout'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools"
import ContextProvider from '../../Context/context'
import { useContext } from 'react'
const queryClient = new QueryClient()
export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ContextProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
