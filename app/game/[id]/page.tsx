"use client"
import { useState, useEffect } from "react"
import { ArrowLeft, Download, Calendar, Tag, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { games } from "@/lib/games-data"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface GamePageProps {
  params: {
    id: string
  }
}

export default function GamePage({ params }: GamePageProps) {
  const [showCPAModal, setShowCPAModal] = useState(false)
  const game = games.find((g) => g.id === params.id)

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
        const existingScript = document.getElementById(
          "cpljs-dad085b0-6f94-11f0-a126-8a5fb7be40ea"
        )
        if (existingScript) existingScript.remove()
      }
    }
  }, [showCPAModal])

  if (!game) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Game Not Found</h1>
          <Link href="/">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleDownload = () => {
    setShowCPAModal(true)
  }

  const handleCPAComplete = () => {
    window.open("https://romsfun.com/roms/playstation-2/", "_blank")
    setShowCPAModal(false)
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-purple-500/20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-purple-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[3/4] relative w-full h-full">
                  <Image
                    src={game.coverImage ?? "/placeholder.svg"}
                    alt={game.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleDownload}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 text-lg"
              size="lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Game
            </Button>

            <p className="text-xs text-gray-400 mt-2 text-center">
              Compatible with PCX2 Emulator
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{game.title}</h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {game.genre.map((g, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-purple-600/20 text-purple-300 border-purple-500/30"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {g}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 text-gray-300 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Released: {game.year}</span>
                </div>
              </div>
            </div>

            <Card className="bg-gray-800/50 border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Game Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{game.description.replace(/'/g, "&apos;")}</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Game Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-purple-300 mb-2">Genres</h4>
                    <p className="text-gray-300">{game.genre.join(", ")}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-300 mb-2">Release Year</h4>
                    <p className="text-gray-300">{game.year}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-300 mb-2">Platform</h4>
                    <p className="text-gray-300">PlayStation 2</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-300 mb-2">Emulator</h4>
                    <p className="text-gray-300">PCX2 Compatible</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={showCPAModal} onOpenChange={setShowCPAModal}>
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
    </div>
  )
}
