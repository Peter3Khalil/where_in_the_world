import '../styles/globals.css'
import Layout from '../../components/Layout'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import {ReactQueryDevtools} from "react-query/devtools"
const queryClient = new QueryClient()
export default function App({ Component, pageProps }) {

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        
          <Layout>
            <Component {...pageProps}/>
          </Layout>
        
      </Hydrate>
      {/* <ReactQueryDevtools position='bottom-right' initialIsOpen={false}/> */}
    </QueryClientProvider>
  )
}
