// src/data/content.ts
import fadeImg from "../assets/gallery/fade.png";
import beardImg from "../assets/gallery/beard.png";
import lineupImg from "../assets/gallery/lineup.png";
import classicImg from "../assets/gallery/classic.png";
import taperImg from "../assets/gallery/taper.png";
import classicImgs from "../assets/gallery/classic1.png";

import marcusImg from "../assets/barbers/marcus.jpg";
import julesImg from "../assets/barbers/jules.png";
import aminaImg from "../assets/barbers/amina.jpg";

export type Service = {
  id: string;
  name: string;
  minutes: number;
  priceFrom: number;
  description: string;
  popular?: boolean;
};

export type Barber = {
  id: string;
  name: string;
  title: string;
  image: string;
  specialty: string[];
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
};

export const SERVICES: Service[] = [
  {
    id: "cut",
    name: "Signature Cut",
    minutes: 30,
    priceFrom: 45,
    description: "Precision cut with clean finish. NYC-ready.",
    popular: true,
  },
  {
    id: "fade",
    name: "Skin Fade",
    minutes: 40,
    priceFrom: 55,
    description: "Seamless fade with crisp lineup and detail work.",
    popular: true,
  },
  {
    id: "beard",
    name: "Beard Sculpt",
    minutes: 25,
    priceFrom: 35,
    description: "Trim, shape, and finish oils for a refined look.",
  },
  {
    id: "cutbeard",
    name: "Cut + Beard Combo",
    minutes: 30,
    priceFrom: 40,
    description: "Full look: cut, fade, beard sculpt, premium finish.",
    popular: true,
  },
  {
    id: "kids",
    name: "Kids Cut (12 & under)",
    minutes: 25,
    priceFrom: 35,
    description: "Patient, friendly service with clean results.",
  },
  {
    id: "lineup",
    name: "Lineup / Shape-Up",
    minutes: 15,
    priceFrom: 20,
    description: "Quick refresh for hairline, beard line, and edges.",
  },
];

export const BARBERS: Barber[] = [
  {
    id: "marcus",
    name: "Luck",
    title: "",
    image: marcusImg,
    specialty: ["Skin fades", "Lineups", "Texture work", "Kids cuts"],
  },
  {
    id: "jules",
    name: "Ange De Dieu",
    title: "",
    image: julesImg,
    specialty: ["Beards", "Classic cuts", "Kids cuts"],
  },
  {
    id: "amina",
    name: "Roland",
    title: "",
    image: aminaImg,
    specialty: ["Tapers", "Designs", "Detail work"],
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Devon P.",
    rating: 5,
    date: "Nov 2025",
    text: "Best fade I’ve had in NYC. Booking was easy and the shop vibe is premium.",
  },
  {
    id: "r2",
    name: "Chris M.",
    rating: 5,
    date: "Oct 2025",
    text: "Beard sculpt is elite. Walked out looking brand new.",
  },
  {
    id: "r3",
    name: "Samira K.",
    rating: 5,
    date: "Sep 2025",
    text: "Super patient with my son. Great results every time.",
  },
  {
    id: "r4",
    name: "Anthony L.",
    rating: 4,
    date: "Aug 2025",
    text: "Great service and punctual. The lineup stays sharp.",
  },
];

export const FAQ = [
  {
    q: "Do you take walk-ins?",
    a: "Yes, when we have availability. Booking ahead is fastest.",
  },
  {
    q: "What if I’m running late?",
    a: "We offer a 7-minute grace period. After that we may need to reschedule.",
  },
  {
    q: "Do you cut all hair types?",
    a: "Yes. Our team works with all textures and styles.",
  },
  {
    q: "What payments do you accept?",
    a: "Cards, cash, and contactless payments. Tips appreciated.",
  },
] as const;

export const TIMES = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
] as const;

export const HERO_IMAGE = fadeImg;

export const GALLERY = [
  { label: "Skin Fade", image: fadeImg },
  { label: "Beard Sculpt", image: beardImg },
  { label: "Sharp Lineup", image: lineupImg },
  { label: "Classic Cut", image: classicImg },
  { label: "Taper Fade", image: taperImg },
  { label: "Classic Cut", image: classicImgs },
] as const;

export const STATS = [
  { label: "Avg rating", value: "4.6/5" },
  { label: "Return clients", value: "89%" },
  { label: "Typical wait", value: "Under 10 min" },
] as const;
