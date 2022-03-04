import Head from 'next/head'
import AudioPlayer from '../components/AudioPlayer'


export default function Home() {
  return (
    <div className='app'>
      <Head>
        <title>Audio Player</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>audio player</h1>
           <AudioPlayer />
      </main>

      <footer className='footer'>
        
      </footer>
    </div>
  )
}
