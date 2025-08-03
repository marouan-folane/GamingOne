"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, Lock, X, CheckCircle } from "lucide-react"

interface DownloadCPAButtonProps {
  gameName?: string
}

export default function DownloadCPAButton({ gameName = "Game" }: DownloadCPAButtonProps) {
  const [showCPAModal, setShowCPAModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [offerCompleted, setOfferCompleted] = useState(false)

  useEffect(() => {
    if (showCPAModal) {
      setIsLoading(true)
      
      const timeout = setTimeout(() => {
        try {
          // Clean up any existing scripts first
          const existingInlineScript = document.querySelector('script[data-mylead-inline]')
          const existingLockerScript = document.getElementById("cpljs-a24d1a68-708f-11f0-96fe-c2a106037d45")
          const existingNoScript = document.querySelector('noscript[data-mylead]')
          
          if (existingInlineScript) existingInlineScript.remove()
          if (existingLockerScript) existingLockerScript.remove()
          if (existingNoScript) existingNoScript.remove()

          // Add the adblock redirect script
          const inlineScript = document.createElement("script")
          inlineScript.setAttribute('data-mylead-inline', 'true')
          inlineScript.innerHTML = "const adblockRedirect = 'https://bestlocker.eu/adblock';"
          document.body.appendChild(inlineScript)

          // Add the main locker script
          const lockerScript = document.createElement("script")
          lockerScript.id = "cpljs-a24d1a68-708f-11f0-96fe-c2a106037d45"
          lockerScript.src = "https://bestlocker.eu/iframeLoader/a24d1a68-708f-11f0-96fe-c2a106037d45"
          lockerScript.type = "text/javascript"
          lockerScript.async = true
          
          // Add load event listener
          lockerScript.onload = () => {
            setIsLoading(false)
          }
          
          lockerScript.onerror = () => {
            setIsLoading(false)
            console.error("Failed to load MyLead content locker")
          }
          
          document.body.appendChild(lockerScript)

          // Add noscript fallback
          const noScriptTag = document.createElement("noscript")
          noScriptTag.setAttribute('data-mylead', 'true')
          noScriptTag.innerHTML = `<meta http-equiv="refresh" content="0;url=https://bestlocker.eu/noscript"/>`
          document.head.appendChild(noScriptTag)

          // Listen for completion (you might need to adjust this based on MyLead's callback)
          const checkCompletion = setInterval(() => {
            // This is a placeholder - you'll need to implement actual completion detection
            // based on MyLead's documentation
            if (window.mylead && window.mylead.completed) {
              setOfferCompleted(true)
              clearInterval(checkCompletion)
            }
          }, 1000)

        } catch (error) {
          console.error("Error loading MyLead content locker:", error)
          setIsLoading(false)
        }
      }, 1000)

      return () => {
        clearTimeout(timeout)
        // Cleanup function
        const inlineScript = document.querySelector('script[data-mylead-inline]')
        const lockerScript = document.getElementById("cpljs-a24d1a68-708f-11f0-96fe-c2a106037d45")
        const noScriptTag = document.querySelector('noscript[data-mylead]')
        
        if (inlineScript) inlineScript.remove()
        if (lockerScript) lockerScript.remove()
        if (noScriptTag) noScriptTag.remove()
      }
    }
  }, [showCPAModal])

  const handleDownloadClick = () => {
    setShowCPAModal(true)
  }

  const handleClose = () => {
    setShowCPAModal(false)
    setIsLoading(false)
  }

  const handleDirectDownload = () => {
    // Implement your actual download logic here
    const downloadUrl = "#" // Replace with actual download URL
    window.open(downloadUrl, '_blank')
    setShowCPAModal(false)
  }

  if (showCPAModal) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center mb-6">
            {offerCompleted ? (
              <>
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Offer Completed!</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Thank you! You can now download <span className="text-purple-400 font-semibold">{gameName}</span>
                </p>
                <Button
                  onClick={handleDirectDownload}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Start Download
                </Button>
              </>
            ) : (
              <>
                <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Unlock Download</h3>
                <p className="text-gray-300 text-sm">
                  Complete a quick offer to unlock <span className="text-purple-400 font-semibold">{gameName}</span>
                </p>
              </>
            )}
          </div>

          {!offerCompleted && (
            <>
              {isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
                  <p className="text-gray-400 mt-2">Loading offer...</p>
                </div>
              )}

              {/* The MyLead content locker will be injected here */}
              <div id="mylead-container" className="min-h-[300px]">
                {!isLoading && (
                  <div className="text-center text-gray-400 py-8">
                    <p className="text-sm">Complete the offer above to unlock your download</p>
                    <p className="text-xs mt-2 text-gray-500">This helps us keep the content free</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6">
      <Button
        onClick={handleDownloadClick}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <Download className="w-5 h-5 mr-2" />
        Download {gameName}
      </Button>
      
      <p className="text-xs text-gray-400 text-center mt-2">
        Free download • Complete quick offer to unlock
      </p>
    </div>
  )
}