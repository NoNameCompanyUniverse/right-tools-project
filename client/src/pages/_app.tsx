import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss'
import '../styles/bootstrap-grid.min.css';
import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import {AnimatePresence} from "framer-motion";
import type {AppProps} from 'next/app'
import {useRouter} from 'next/router';
import {useState, useEffect} from "react";
import Preloader from "../components/Preloader";
import {ToastContainer} from "react-toastify";
import {SessionProvider, useSession} from "next-auth/react";


type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode,
    auth: boolean,
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout,
}

function MyApp({Component, pageProps}: AppPropsWithLayout) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = () => {
            setIsLoading(true);
            document.body.style.paddingRight = `${window.innerWidth - document.body.offsetWidth}px`;
            document.body.style.overflow = 'hidden';
        };
        const handleRouteComplete = () => {
            setIsLoading(false);
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        };
        router.events.on('routeChangeStart', handleRouteChange);
        router.events.on('routeChangeComplete', handleRouteComplete);
    }, [router.events]);
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page);
    return (
        <>
            {isLoading && <Preloader/>}
            <SessionProvider session={pageProps.session}>
                <AnimatePresence exitBeforeEnter>
                    {
                        Component.auth ? (
                            <Auth>
                                {
                                    getLayout(<><Component {...pageProps} /></>)
                                }
                            </Auth>
                        ) : (getLayout(<><Component {...pageProps} /></>))
                    }
                </AnimatePresence>
            </SessionProvider>
            <ToastContainer theme={'colored'} position={'bottom-right'}/>
        </>
    )
}

// @ts-ignore
function Auth({children}) {
    const router = useRouter()
    const {data: session, status} = useSession()
    useEffect(() => {
        if (status === 'loading') return
        if (status === 'unauthenticated') router.push('/auth')
    }, [router, status])
    if (status === 'authenticated') {
        return children
    }
    return <Preloader/>
}

export default MyApp
