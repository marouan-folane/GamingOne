import grandt from "./grand.jpg";
import god from "./godofwar.jpg";
import shadow from "./shadow-of-the-colossus.jpg";
import final from "./final-fantasy-x.jpg";
import tekken from "./tekken-5.jpg";
import headhunter from "./headhunter.jpg";
import star from "./star-ocean-till-the-end-of-time.jpg";
import wild from "./wild-arms-3.jpg";
import atelier from "./atelier-iris-3.jpg";
import road from "./road-trip.jpg";
import teen from "./teen-titans.jpg";
import pac from "./pac-man-feve.jpg";
import neo from "./neo-contra.jpg";
import ghost from "./ghost-recon.jpg";
import kingdom from "./kingdom-hearts.jpg";
import resident from "./resident-evil-4.jpg";
import dragon from "./dragon-ball-z-budokai-3.jpg";
import guitar from "./guitar-hero-.jpg";
import burnout from "./burnout.jpg";
import sly from "./sly-3.jpg";
import metal from "./metal-gear-solid-4.jpg";
import mad from "./madden-2005.jpg";
import { StaticImageData } from "next/image";


export interface Game {
  id: string;
  title: string;
  coverImage: StaticImageData;
  genre: string[];
  year: number;
  description: string;
   rating: number;
}

export const games: Game[] = [
  {
    id: "gta-san-andreas",
    title: "Grand Theft Auto: San Andreas",
    coverImage: grandt,
    genre: ["Action", "Adventure", "Open World"],
    year: 2004,
    description:
      'Follow Carl "CJ" Johnson as he returns to his hometown of Los Santos and gets caught up in gang warfare, corruption, and family drama in this epic open-world adventure.',
    rating: 9.2
  },
  {
    id: "god-of-war",
    title: "God of War",
    coverImage: god,
    genre: ["Action", "Adventure", "Hack and Slash"],
    year: 2005,
    description:
      "Play as Kratos, a Spartan warrior seeking revenge against the gods of Olympus in this brutal and epic action-adventure game.",
  rating: 9.0
    },
  {
    id: "shadow-of-the-colossus",
    title: "Shadow of the Colossus",
    coverImage: shadow,
    genre: ["Action", "Adventure", "Puzzle"],
    year: 2005,
    description:
      "Embark on a breathtaking journey to defeat massive colossi in a forbidden land to save a mysterious girl named Mono.",
  rating: 8.7
    },
  {
    id: "final-fantasy-x",
    title: "Final Fantasy X",
    coverImage: final,
    genre: ["RPG", "Adventure"],
    year: 2001,
    description:
      "Join Tidus and Yuna on an emotional journey through the world of Spira in this beloved JRPG masterpiece.",
 rating: 8.2
    },
  {
    id: "metal-gear-solid-3",
    title: "Metal Gear Solid 3: Snake Eater",
    coverImage: metal,
    genre: ["Action", "Stealth", "Adventure"],
    year: 2004,
    description:
      "Experience the origin story of Big Boss in this critically acclaimed stealth-action game set during the Cold War.",
     rating: 8.2
    },
  {
    id: "tekken-5",
    title: "Tekken 5",
    coverImage: tekken,
    genre: ["Fighting", "Action"],
    year: 2004,
    description:
      "The King of Iron Fist Tournament returns with improved graphics, new characters, and refined fighting mechanics.",
  rating: 9.1
    },
  {
    id: "headhunter",
    title: "Headhunter",
    coverImage: headhunter,
    genre: ["Action", "Adventure", "Stealth"],
    year: 2002,
    description:
      "Play as Jack Wade, a bounty hunter in a futuristic world where you must track down criminals and uncover dark secrets.",
  rating: 8.9
    },
  {
    id: "star-ocean-till-the-end-of-time",
    title: "Star Ocean: Till The End of Time",
    coverImage: star,
    genre: ["RPG", "Adventure", "Sci-Fi"],
    year: 2003,
    description:
      "Embark on an epic space-faring adventure with real-time combat and a deep storyline spanning multiple planets.",
  rating: 9.2
    },
  {
    id: "wild-arms-3",
    title: "Wild Arms 3",
    coverImage: wild,
    genre: ["RPG", "Western", "Adventure"],
    year: 2002,
    description:
      "Explore a post-apocalyptic western world with four drifters seeking to restore life to their dying planet.",
  rating: 7.8
    },
  {
    id: "atelier-iris-3",
    title: "Atelier Iris 3: Grand Phantasm",
    coverImage: atelier,
    genre: ["RPG", "Adventure", "Fantasy"],
    year: 2007,
    description:
      "Master the art of alchemy in this charming JRPG featuring item crafting, exploration, and magical adventures.",
    rating: 9.2
    },
  {
    id: "road-trip",
    title: "Road Trip",
    coverImage: road,
    genre: ["Racing", "Adventure"],
    year: 2002,
    description:
      "Take a cross-country road trip in this unique racing game featuring customizable cars and scenic routes.",
     rating: 9.2
    },
  {
    id: "teen-titans",
    title: "Teen Titans",
    coverImage: teen,
    genre: ["Action", "Beat 'em up", "Superhero"],
    year: 2006,
    description:
      "Join Robin, Starfire, Raven, Beast Boy, and Cyborg in this action-packed beat 'em up based on the animated series.",
  rating: 9.2
    },
  {
    id: "pac-man-fever",
    title: "Pac-Man Fever",
    coverImage: pac,
    genre: ["Party", "Mini-games", "Arcade"],
    year: 2002,
    description:
      "Experience classic Pac-Man gameplay with modern twists in this collection of mini-games and party modes.",
  rating: 8.5
    },
  {
    id: "neo-contra",
    title: "Neo Contra",
    coverImage: neo,
    genre: ["Action", "Shooter", "Arcade"],
    year: 2004,
    description:
      "The legendary Contra series returns with intense run-and-gun action, massive bosses, and cooperative gameplay.",
  rating: 7.2
    },
  {
    id: "ghost-recon",
    title: "Tom Clancy's Ghost Recon",
    coverImage: ghost,
    genre: ["Action", "Tactical", "Shooter"],
    year: 2002,
    description:
      "Lead an elite team of soldiers in tactical combat missions around the world in this military shooter.",
  rating: 7.2
    },
  {
    id: "kingdom-hearts",
    title: "Kingdom Hearts",
    coverImage: kingdom,
    genre: ["RPG", "Action", "Adventure"],
    year: 2002,
    description:
      "Experience the magical crossover between Disney and Final Fantasy in this unique action-RPG adventure.",
     rating: 9.2
    },{
    id: "resident-evil-4",
    title: "Resident Evil 4",
    coverImage: resident,
    genre: ["Horror", "Action", "Survival"],
    year: 2005,
    description:
      "Leon S. Kennedy investigates the disappearance of the President's daughter in this revolutionary survival horror game.",
  rating: 9.1
    },
  {
    id: "dragon-ball-z-budokai-3",
    title: "Dragon Ball Z: Budokai 3",
    coverImage: dragon,
    genre: ["Fighting", "Action", "Anime"],
    year: 2004,
    description:
      "Experience the ultimate Dragon Ball Z fighting game with an extensive roster and Dragon Universe story mode.",
  rating: 9.8
    },
  {
    id: "guitar-hero-2",
    title: "Guitar Hero II",
    coverImage: guitar,
    genre: ["Music", "Rhythm"],
    year: 2006,
    description: "Rock out to classic and modern hits in this legendary music rhythm game that defined a generation.",
 rating: 7.2
  },
  {
    id: "burnout-3",
    title: "Burnout 3: Takedown",
    coverImage: burnout,
    genre: ["Racing", "Action"],
    year: 2004,
    description:
      "Experience high-speed racing with spectacular crashes and takedowns in this adrenaline-fueled racing game.",
  rating: 8.5
    },
  {
    id: "sly-3",
    title: "Sly 3: Honor Among Thieves",
    coverImage: sly,
    genre: ["Platform", "Adventure", "Stealth"],
    year: 2005,
    description: "Join Sly Cooper and his gang in their final heist as they attempt to crack the Cooper Vault.",
 
 rating: 8.2 },
  {
    id: "madden-2005",
    title: "Madden NFL 2005",
    coverImage: mad,
    genre: ["Sports", "Football"],
    year: 2004,
    description:
      "Experience authentic NFL action with improved graphics, gameplay, and the revolutionary Hit Stick feature.",
  rating: 9.2
    },
];