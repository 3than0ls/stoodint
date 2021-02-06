import Navbar from '~/components/Navbar/Navbar'
import '~/styles/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-app-gray min-h-screen">
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
