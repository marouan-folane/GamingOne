"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Lock, X } from "lucide-react"

interface DownloadCPAButtonProps {
  gameName?: string
}

export default function DownloadCPAButton({ gameName = "Game" }: DownloadCPAButtonProps) {
  const [showCPAModal, setShowCPAModal] = useState(false)

  return (
    <>
      {showCPAModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-4xl w-full relative max-h-[95vh] overflow-hidden">
            <button
              onClick={() => setShowCPAModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 bg-gray-800 rounded-full p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <Lock className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Unlock Download</h3>
              <p className="text-gray-300 text-sm">
                Complete the offer below to unlock{" "}
                <span className="text-purple-400 font-semibold">{gameName}</span>
              </p>
            </div>

            <div className="w-full h-[70vh] bg-gray-800 rounded-lg overflow-hidden">
              <iframe
                src="https://best-click.pro/a/PNN2ws4yqi1ZL"
                className="w-full h-full border-none"
                title="CPA Offer"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
                loading="lazy"
              />
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">
                Complete the offer above to unlock your download • Safe and secure
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <Button
          onClick={() => setShowCPAModal(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <Download className="w-5 h-5 mr-2" />
          Download {gameName}
        </Button>
        <p className="text-xs text-gray-400 text-center mt-2">
          Free download • Complete quick offer to unlock
        </p>
      </div>
    </>
  )
}