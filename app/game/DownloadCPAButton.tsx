"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Download } from "lucide-react"

export default function DownloadCPAButton() {
  const [showCPAModal, setShowCPAModal] = useState(false)

  // Redirect URL after completing offer
  const redirectUrl = "https://romsfun.com/roms/playstation-2/"

  // Handle dialog open change (close event)
  const handleDialogChange = (open: boolean) => {
    setShowCPAModal(open)
    if (!open) {
      // Modal closed → redirect user
      window.location.href = redirectUrl
    }
  }

  useEffect(() => {
    if (showCPAModal) {
      const timeout = setTimeout(() => {
        const inlineScript = document.createElement("script")
        inlineScript.innerHTML = "const adblockRedirect = 'https://bestlocker.eu/adblock';"
        document.body.appendChild(inlineScript)

        const lockerScript = document.createElement("script")
        lockerScript.id = "cpljs-dad085b0-6f94-11f0-a126-8a5fb7be40ea"
        lockerScript.src = "https://bestlocker.eu/iframeLoader/dad085b0-6f94-11f0-a126-8a5fb7be40ea"
        lockerScript.type = "text/javascript"
        document.body.appendChild(lockerScript)

        const noScriptTag = document.createElement("noscript")
        noScriptTag.innerHTML = `<meta http-equiv="refresh" content="0;url=https://bestlocker.eu/noscript"/>`
        document.head.appendChild(noScriptTag)
      }, 1000)

      return () => {
        clearTimeout(timeout)
        const existingScript = document.getElementById("cpljs-dad085b0-6f94-11f0-a126-8a5fb7be40ea")
        if (existingScript) existingScript.remove()
      }
    }
  }, [showCPAModal])

  return (
    <>
      <Button
        onClick={() => setShowCPAModal(true)}
        className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 text-lg"
        size="lg"
      >
        <Download className="w-5 h-5 mr-2" />
        Download Game
      </Button>

      <Dialog open={showCPAModal} onOpenChange={handleDialogChange}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">🎮 Complete to Download</DialogTitle>
            <DialogDescription className="text-gray-300 text-center">
              Complete the verification below to start your download.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-gray-700/50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-300 mb-3">
                Complete the verification below to start your download.
              </p>

              <div
                id="cpa-locker-container"
                className="min-h-[200px] bg-black/20 border border-purple-500/30 rounded-lg p-4 mb-4"
              >
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
                    <p className="text-xs text-gray-400">Loading verification...</p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-400 text-center">
                <p>After completing verification, your download will start automatically.</p>
                <p className="mt-1">Game will be compatible with PCX2 emulator.</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
