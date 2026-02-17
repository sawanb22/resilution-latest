import { useState, useEffect, useRef } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Navbar } from './Component/Common/Navbar'
import { Footer } from './Component/Common/Footer'
import { Resilution } from './pages/Why_resilution/Resilution'
import { Work } from "./pages/Work/Work"
import { About } from './pages/About/About'
import { EdenChatWidget } from './Component/ChatWidget'
import { NewsletterPopup } from './Component/Common/NewsletterPopup'
import NewHome from './pages/Home/NewHome'

// Middleware backend URL from environment
// Middleware backend URL - Fixed to point to Resilution backend
const MIDDLEWARE_URL =
  'https://resilution-chat-backend-850632565452.asia-south1.run.app' // 'http://localhost:3001'

function MetaRouteTracker() {
  const location = useLocation()
  const isFirst = useRef(true)

  useEffect(() => {
    if (!window.fbq) return

    if (isFirst.current) {
      isFirst.current = false
      return
    }

    window.fbq('track', 'PageView')
  }, [location.pathname, location.search])

  return null
}

function App() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('newsletterPopupShown')
    console.log('[NewsletterPopup] Already shown in session?', popupShown ? 'YES' : 'NO')

    if (!popupShown) {
      // Show popup after 3 seconds
      console.log('[NewsletterPopup] Will show in 3 seconds...')
      const timer = setTimeout(() => {
        console.log('[NewsletterPopup] Showing now!')
        setShowPopup(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClosePopup = () => {
    setShowPopup(false)
    // Mark popup as shown for this session
    sessionStorage.setItem('newsletterPopupShown', 'true')
  }

  return (
    <>
      <BrowserRouter>
        {/* Meta Pixel route tracking */}
        <MetaRouteTracker />

        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/why-resilution' element={<Resilution />} />
          <Route path="/blockchain-paradigm" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/new-home" element={<NewHome />} />
        </Routes>
        <Footer />

        {/* Eden Chat Widget - Fresh implementation with Socket.IO */}
        <EdenChatWidget
          middlewareUrl={MIDDLEWARE_URL}
          assetsPath="/chat-widget"
          initialOpen={false}
          heartbeatInterval={25000}
        />

        {/* Newsletter Popup - Shows after 3 seconds on first visit */}
        {showPopup && <NewsletterPopup onClose={handleClosePopup} />}
      </BrowserRouter>
    </>
  )
}

export default App