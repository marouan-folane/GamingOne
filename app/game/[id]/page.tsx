import { games } from "@/lib/games-data"
import { notFound } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar, Tag, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import DownloadCPAButton from "../DownloadCPAButton"

// Ce fichier NE DOIT PAS avoir "use client"

type Props = {
  params: {
    id: string
  }
}

export default async function GamePage({ params }: Props) {
  const game = games.find((g) => g.id === params.id)

  if (!game) return notFound()

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

            <DownloadCPAButton />
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
                <p className="text-gray-300 leading-relaxed">
                  {game.description.replace(/'/g, "&apos;")}
                </p>
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
    </div>
  )
}
