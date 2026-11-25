export const social = {
  linkedin: "https://www.linkedin.com/in/haura-hanarissa-putri-ba0573274",
  instagram: "https://www.instagram.com/howrahana/",
  medium: "https://howrahana.medium.com/activity",
  email: "https://www.linkedin.com/in/haura-hanarissa-putri-ba0573274/overlay/contact-info/",
} as const

export const sources = {
  mediumProfile: "https://howrahana.medium.com/activity",
  opsiPdf:
    "https://pusatprestasinasional.kemendikdasmen.go.id/uploads/lampiran_pengumuman/Surat%20Keputusan%20Pemenang%20OPSI%20Nasional%202024.pdf",
  schoolArchive: "https://sma3jogja.sch.id/prestasi/page/26/",
  wyiiwa2023:
    "https://sma3jogja.sch.id/prestasi/medali-perak-world-youth-invention-and-innovation-award-2023/",
  coff2025:
    "https://sma3jogja.sch.id/prestasi/gold-medal-dan-best-performance-dalam-kompetisi-paduan-suara-coff-2025-jogjakarta/",
  baliChoir:
    "https://sma3jogja.sch.id/prestasi/2nd-place-in-competition-pop-and-jazz-category-gold-medal-level-4-qualified-to-championship-14th-bali-international-choir-festival-dan-gold-medal-in-championship-pop-and-jazz-category-14th-bali-inter/",
} as const

export const educationSchools = [
  {
    school: "INSTITUT TEKNOLOGI BANDUNG",
    major: "Fakultas Teknologi Industri",
    logo: "/logos/itb.png",
    source: social.linkedin,
  },
  {
    school: "SMA NEGERI 3 YOGYAKARTA",
    major: "Ilmu Pengetahuan Alam (Padmanaba)",
    logo: "/logos/padmanaba.png",
    source: sources.schoolArchive,
  },
] as const

export const educationNote =
  "padmanaba ipa di sma 3 jogja, lalu fti itb — riset, paduan suara, lomba sains."

export const research = {
  title: "VIRBLOREX",
  href: sources.opsiPdf,
  tagline: "ruang biophilic VR kurangi stres",
} as const

export const achievements = [
  {
    label: "Silver medal, WYIIA 2023",
    caption: "World Youth Invention and Innovation Award 2023",
    href: sources.wyiiwa2023,
    source: sources.wyiiwa2023,
    image: "https://sma3jogja.sch.id/wp-content/uploads/2024/04/Medali-Perunggu-KIR-RUMAISHA-SYIFA-CAROLINA-dkk-scaled.jpg",
  },
  {
    label: "Bronze medal, OPSI 2024",
    caption: "VIRBLOREX · OPSI Padmanaba 13",
    href: sources.opsiPdf,
    source: sources.opsiPdf,
    image: "https://sma3jogja.sch.id/wp-content/uploads/2024/11/foto-HAURA-HANARISSA-PUTRI.jpg",
  },
  {
    label: "Gold medal, COFF 2025",
    caption: "Padmanaba Choir · team",
    href: sources.coff2025,
    source: sources.coff2025,
    image: "https://sma3jogja.sch.id/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-20-at-14.39.57.jpeg",
  },
  {
    label: "Bali Choir Festival 2025",
    caption: "14th Bali International Choir Festival · team",
    href: sources.baliChoir,
    source: sources.baliChoir,
    image: "https://sma3jogja.sch.id/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-03-at-10.49.59-scaled.jpeg",
  },
] as const