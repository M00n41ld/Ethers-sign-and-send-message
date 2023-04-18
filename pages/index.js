import Head from 'next/head'
// import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SignForm from '@/components/SignForm'
import VerifyForm from '@/components/VerifyForm'
import contract from '../public/smart-contract/abi.json';
import Navigation from '@/components/Navigation'
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
     <Navigation href={'/prizes'} text={'Prizes list'}/>
      <Head>
        <title>Eth sign and send</title>
        <meta name="description" content="Eth sign and send messages" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <Header/>
        <div className='forms'>
          <SignForm/>
          <VerifyForm/>
        </div>
        <Footer/>
      </div>
    </>
  )
}
