"use client"
import Image from "next/image";
import { useState, useMemo } from "react"
import { Search, Filter, Calendar, ListOrderedIcon as AlphabeticalSort, Star, TrendingUp, Play } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { games } from "@/lib/games-data"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  // Popular games (first 8 games for the hero section)
  const popularGames = games.slice(0, 8)

  const genres = useMemo(() => {
    const allGenres = games.flatMap((game) => game.genre)
    return ["all", ...Array.from(new Set(allGenres))]
  }, [])

  const years = useMemo(() => {
    const allYears = games.map((game) => game.year.toString())
    return ["all", ...Array.from(new Set(allYears)).sort()]
  }, [])

  const filteredGames = useMemo(() => {
    const filtered = games.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGenre = selectedGenre === "all" || game.genre.includes(selectedGenre)
      const matchesYear = selectedYear === "all" || game.year.toString() === selectedYear

      return matchesSearch && matchesGenre && matchesYear
    })

    // Sort games
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.title.localeCompare(b.title)
      } else if (sortBy === "year") {
        return b.year - a.year
      }
      return 0
    })

    return filtered
  }, [searchTerm, selectedGenre, selectedYear, sortBy])

  return (
    <div className="min-h-screen bg-black">
      
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-black/50 backdrop-blur-sm relative z-50">
        <div className="container mx-auto px-4 py-6">
         {/* mylead-verification: a59c8829723a60cd430c848d302431ca */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              GAMING ONE
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light">Relive PS2 Nostalgia</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
              <span className="px-3 py-1 bg-purple-600/20 rounded-full border border-purple-500/30">
                🎮 {games.length}+ Classic Games
              </span>
              <span className="px-3 py-1 bg-blue-600/20 rounded-full border border-blue-500/30">🕹️ PCX2 Compatible</span>
            </div>
          </div>
        </div>
      </header>

      {/* Letterboxd-style Hero Section with Game Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Game Image */}
        <div className="absolute inset-0 z-0">
        
          {/* Multiple overlay gradients for cinematic effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
            {/* Left Side - Welcome Text */}
            <div className="text-left">
              <div className="mb-8">
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Welcome to
                  <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Gaming One
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-lg">
                  Discover, track, and relive the greatest PlayStation 2 games ever made. Your nostalgic journey starts
                  here.
                </p>
              </div>

              {/* Featured Game Info */}
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-md">
                <div className="flex items-center gap-3 mb-4">
                  <Play className="w-6 h-6 text-purple-400" />
                  <span className="text-purple-400 font-semibold">FEATURED GAME</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">God of War</h3>
                <p className="text-gray-300 text-sm mb-4">
                  The legendary action-adventure that redefined gaming. Experience Kratos brutal journey through
                  ancient Greece.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">9.2</span>
                  </div>
                  <span className="text-gray-400">2005</span>
                  <span className="px-2 py-1 bg-purple-600/20 rounded text-purple-300 text-xs">Action</span>
                </div>
              </div>
            </div>

            {/* Right Side - Popular Games Grid */}
            <div className="lg:ml-8">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-3xl font-bold text-white">Popular This Week</h3>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {popularGames.map((game, index) => (
                  <Link key={game.id} href={`/game/${game.id}`}>
                    <Card className="group bg-black/20 backdrop-blur-sm border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer">
                      <CardContent className="p-0">
                        <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                          <Image
                            src={game.coverImage }
                            alt={game.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />

                          {/* Rank Badge */}
                          <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                            #{index + 1}
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Game Info on Hover */}
                          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white font-bold text-xs truncate mb-1">{game.title}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-300 text-xs">{game.year}</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-white text-xs font-semibold">
                                  {game.rating.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-2xl font-bold text-purple-400">{games.length}+</div>
                  <div className="text-gray-300 text-sm">Games</div>
                </div>
                <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-2xl font-bold text-blue-400">15+</div>
                  <div className="text-gray-300 text-sm">Genres</div>
                </div>
                <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-gray-300 text-sm">Free</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-gray-400 text-sm mb-2">Explore All Games</p>
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="container mx-auto px-4 py-16 bg-black">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 mb-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-3">Find Your Perfect Game</h3>
            <p className="text-gray-400 text-lg">Use the filters below to discover your next favorite PS2 classic</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 rounded-xl"
              />
            </div>

            {/* Genre Filter */}
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="h-12 bg-gray-800/50 border-gray-600 text-white rounded-xl">
                <Filter className="w-5 h-5 mr-2" />
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-700">
                    {genre === "all" ? "All Genres" : genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Year Filter */}
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="h-12 bg-gray-800/50 border-gray-600 text-white rounded-xl">
                <Calendar className="w-5 h-5 mr-2" />
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {years.map((year) => (
                  <SelectItem key={year} value={year} className="text-white hover:bg-gray-700">
                    {year === "all" ? "All Years" : year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-12 bg-gray-800/50 border-gray-600 text-white rounded-xl">
                <AlphabeticalSort className="w-5 h-5 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="name" className="text-white hover:bg-gray-700">
                  Name A-Z
                </SelectItem>
                <SelectItem value="year" className="text-white hover:bg-gray-700">
                  Year (Newest)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-300 text-lg">
            Showing <span className="text-purple-400 font-semibold">{filteredGames.length}</span> games
          </p>
        </div>

        {/* All Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredGames.map((game) => (
            <Link key={game.id} href={`/game/${game.id}`}>
              <Card className="group bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer">
                <CardContent className="p-0">
                  <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                    <Image
                      src={game.coverImage}
alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs text-white font-medium truncate">{game.title}</p>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-white text-sm mb-1 truncate group-hover:text-purple-300 transition-colors">
                      {game.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{game.year}</span>
                      <span className="px-2 py-1 bg-purple-600/20 rounded text-purple-300">{game.genre[0]}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-white mb-2">No games found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </section>

      {/* Footer Disclaimer */}
      <footer className="border-t border-purple-500/20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="mb-4">
              <span className="text-2xl">💡</span>
            </div>
        <p className="text-gray-300 max-w-2xl mx-auto">
  This site is for nostalgic purposes. All game files are meant for backup only. Please own the original copies. Games are compatible with PCX2 emulator (PS2 emulator).
</p>

            <div className="mt-6 text-sm text-gray-500">
              <p>&copy; 2024 GAMING ONE. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
