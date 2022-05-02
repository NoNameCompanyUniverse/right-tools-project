import '../styles/globals.scss'
import '../styles/bootstrap-grid.min.css';
import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import {AnimatePresence} from "framer-motion";
import type {AppProps} from 'next/app'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode,
    auth: boolean,
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout,
}

function MyApp({Component, pageProps}: AppPropsWithLayout) {

    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page);
    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {
                    getLayout(<Component {...pageProps} />)
                }
            </AnimatePresence>
        </>
    )
}

export default MyApp
