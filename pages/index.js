import Head from 'next/head'
// import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SignForm from '@/components/containers/SignForm'
import VerifyForm from '@/components/containers/VerifyForm'
import contract from '../public/smart-contract/abi.json';
import Navigation from '@/components/Navigation'
import SignContext from '@/components/helpers/SignContext'
import { useState } from 'react'

export default function Home() {
  const [signInfo, setSignInfo] = useState({});
  return (
    <>
      <Head>
        <title>Eth sign and send</title>
        <meta name="description" content="Eth sign and send messages" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <Header/>
        <div className='forms'>
          <SignContext.Provider value={{signInfo, setSignInfo}}>
          <SignForm/>
          <VerifyForm/>
          </SignContext.Provider>
        </div>
      </div>
      <Footer/>
    </>
  )
}
