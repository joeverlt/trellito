import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  const persistor = persistStore(store)
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <PersistGate persistor={persistor}>
          {() => <Component {...pageProps} />}
        </PersistGate>
      </SessionProvider>
    </Provider>
  )
}
