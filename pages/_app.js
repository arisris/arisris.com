import { SWRConfig } from "swr"

import "tailwindcss/tailwind.css"
import "tailwindcss/screens.css"

const fetcher = function(resource, init) {
  return fetch(resource, init).then((data) => data.json())
}

function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}
export default App
