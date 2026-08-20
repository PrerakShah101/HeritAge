/**
 * Heritage Knowledge Base
 * Verified cultural and historical information for Ahmedabad Walled City
 * and Modhera Sun Temple. Used as retrieval context before LLM generation.
 */

export const AHMEDABAD_KNOWLEDGE = {
  overview: `Ahmedabad's Walled City (Old City) was founded in 1411 CE by Sultan Ahmad Shah of the Muzaffarid dynasty. 
  It became a UNESCO World Heritage City in 2017 — India's first. The city is renowned for its unique pol neighbourhood 
  system, intricate wooden architecture, religious pluralism, and centuries of textile and trade culture.`,

  pol: {
    definition: `A "pol" is a traditional cluster of houses in Ahmedabad, sharing a common entrance gate called "pol darwaza". 
    Pols were built as self-contained communities, typically organized by caste, trade or religious affiliation. 
    They date back to the 15th century and represent one of the most sophisticated pre-modern urban planning systems in India.`,
    features: [
      "Narrow, winding lanes that confuse outsiders and protect residents",
      "Shared communal spaces — chabutro (bird feeder platform), temples, wells",
      "Wooden facades with intricate carving — peacocks, elephants, floral motifs",
      "Otla — a raised platform at the entrance of homes for socializing",
      "Ventilated courtyard-based architecture adapted to Gujarat's hot climate",
      "Niches in walls for oil lamps (divos)",
      "Common wall construction that provides thermal mass and earthquake resistance",
      "Jharokha — projecting wooden bay windows for women to observe street life"
    ],
    communities: `Pols housed diverse communities: Hindu merchants (Vanias), Muslims, Jains, and craftsmen. 
    Each pol had its own character but they were interconnected, representing Ahmedabad's syncretic urban culture.`,
    decline: `Many pols are under threat from urban pressure, migration of original families to newer areas, 
    neglect, commercial encroachment, and subdivision of properties. Wooden elements are deteriorating due to lack 
    of maintenance and skilled craftsmen who knew traditional carpentry are vanishing.`
  },

  woodenArchitecture: {
    description: `Ahmedabad's wooden architecture is among the finest urban wood carving traditions in Asia. 
    Buildings feature elaborately carved facades — multiple stories of wooden balconies, screens, columns and brackets.`,
    elements: [
      "Jali — perforated wooden screens allowing ventilation and privacy",
      "Toranas — decorative archways at entrances",
      "Khatri — decorative wooden brackets",
      "Carved peacocks, parrots, elephants symbolizing prosperity and protection",
      "Lotus motifs reflecting Hindu and Jain religious symbolism"
    ],
    craftsmanship: `The wood carvers (suthar community) passed techniques through generations. 
    Today fewer than a handful of traditional craftsmen remain who can reproduce historic joinery.`
  },

  teenDarwaza: {
    description: `Teen Darwaza (Three Gates) is a monumental triple gateway built in the 15th century 
    by Sultan Ahmad Shah as the royal entrance to the Maidan Shahi (royal square). It is one of the finest 
    examples of Indo-Saracenic architecture in Gujarat.`,
    architecture: `The gateway combines Islamic pointed arches with Hindu ornamental brackets and jaalis. 
    The central arch is the tallest, flanked by two smaller arches. Intricate stone carving decorates every surface.`,
    significance: `Teen Darwaza once opened onto the royal ceremonial grounds. Today it stands at the 
    edge of the old city, a gateway between the medieval walled city and the modern urban fabric.`
  },

  markets: {
    description: `Ahmedabad's old city markets have traded continuously for over 600 years. 
    Major markets include Manek Chowk (gold, silver, vegetables — and famously a street food zone at night), 
    Law Garden (handicrafts and textiles), and the cloth market districts.`,
    textiles: `Ahmedabad was historically known as the "Manchester of the East" for its textile industry. 
    The Patola silk weaving tradition (double ikat weaving from Patan, nearby) and block printing from 
    surrounding regions moved through Ahmedabad's markets to global trade routes.`
  },

  religiousLife: `Ahmedabad's walled city contains over 200 temples and mosques often within meters of each other.
  The Jama Masjid (1424 CE), Rani Rupavati Mosque, the Hutheesing Jain Temple, and dozens of small 
  neighbourhood temples document centuries of religious coexistence and architectural dialogue.`,

  dailyLife: {
    morning: `Mornings in the old city begin with the sounds of temple bells, azaan, the clatter of shop shutters 
    opening, and the smell of tea and freshly fried fafda-jalebi (a traditional Gujarati breakfast combination).`,
    food: `Gujarati cuisine is predominantly vegetarian. Street food includes: fafda (gram flour fritters), 
    jalebi (sweet fried spiral), dhokla (fermented rice-lentil cake), sev (fried gram flour noodles), 
    khamani, and thepla. Food is an integral part of social life in the pol.`,
    festivals: `Uttarayan (Makar Sankranti — kite festival in January) transforms the entire old city into 
    a rooftop celebration. Navratri (nine nights of Garba dance) fills the pols with music and colour.`
  },

  conservation: `Ahmedabad Heritage Management Plan, prepared after UNESCO listing, identifies over 600 heritage 
  structures. Key challenges: rapid urbanization, absentee ownership, lack of incentives for owners to maintain 
  wooden facades, loss of traditional building skills, flooding vulnerability along the Sabarmati River.`
};

export const MODHERA_KNOWLEDGE = {
  overview: `The Modhera Sun Temple (Surya Mandir) is a 11th-century Hindu temple dedicated to Surya, the Sun God. 
  Built by King Bhimdev I of the Chaulukya (Solanki) dynasty around 1026 CE, it stands near the village of Modhera 
  in Mehsana district, Gujarat. It is among the finest examples of Maru-Gurjara (Solanki) architectural style.`,

  architecture: {
    style: `Maru-Gurjara style — a regional expression of Nagara temple architecture found in Gujarat and Rajasthan. 
    Characterized by multi-faceted shikhara (tower), intricate carved panels, and a harmonious relationship between 
    interior and exterior ornament.`,
    complex: `The temple complex consists of three elements arranged on an east-west axis: 
    1. Surya Kund (stepwell/tank) — at the entrance, for ritual purification
    2. Sabha Mandapa (Assembly Hall) — a pillared hall for ritual gatherings  
    3. Guda Mandapa (Sanctum Vestibule) — leading to the main shrine
    Note: the sanctum (garbhagriha) no longer has its shikhara (tower), which may have collapsed in an earthquake.`
  },

  suryaKund: {
    description: `Surya Kund is a rectangular stepped tank (vav/kund) measuring approximately 176 x 120 feet. 
    It has 108 miniature shrines arranged on its stepped sides — 108 being sacred in Hindu cosmology.`,
    significance: `The kund was designed so that at dawn on the equinoxes and solstices, the rising sun would 
    illuminate the entire tank and reflect perfectly in the water. This is one of the most sophisticated 
    examples of solar astronomy embedded in architecture anywhere in the ancient world.`
  },

  sabhaMandapa: {
    description: `The Sabha Mandapa (Assembly Hall) is a pillared hall with 52 intricately carved columns. 
    Each pillar depicts scenes from Hindu epics — the Ramayana, Mahabharata — as well as celestial beings, 
    apsaras (divine nymphs), and geometric patterns.`,
    light: `The hall was designed so that at the winter and summer solstices, the rising sun's light enters 
    through specific openings and illuminates the deity in the sanctum. No such precise solar engineering 
    exists in Gujarat's contemporary structures.`
  },

  sculptures: {
    description: `The entire exterior surface of the temple is covered in carved stone sculptures. 
    Major iconographic programs include:`,
    elements: [
      "Surya (Sun God) depicted in military attire with a sword — unique North Indian iconography",
      "Ashtadikpalas — guardians of eight directions at cardinal points",
      "Erotic sculptures (mithuna) — representing fertility, life force, and the union of opposites",
      "Apsaras in 16 different standard poses (shodasha nayika)",
      "Kirtimukha — the 'face of glory', a protective apotropaic face on architectural elements",
      "Vyalas — mythological leonine creatures on pillar bases",
      "Planetary deities (Navagraha) carved in sequence"
    ]
  },

  solarAlignment: `The temple is precisely oriented so that at the equinoxes (March and September), 
  the rising sun illuminates the main deity directly. At solstices, the angle shifts. 
  This solar engineering — built without modern instruments — demonstrates extraordinary astronomical knowledge 
  of the Solanki-era builders. The word "Modhera" may derive from "Mitra" — an ancient solar deity.`,

  history: `King Bhimdev I built the temple shortly after the defeat of Mahmud of Ghazni's invasions. 
  The temple was a statement of cultural resilience and devotion. It was later partially damaged — 
  the image of the main deity was reportedly removed or damaged during subsequent Sultanate-era raids. 
  The Archaeological Survey of India (ASI) has maintained the site since the 19th century. 
  The Modhera Dance Festival is held annually at the temple, reviving the classical Bharatanatyam tradition 
  in its original sacred architectural setting.`,

  significance: `Modhera represents the peak of Solanki architectural achievement. 
  It was built before the great Somnath Temple was destroyed, and stands as testimony to 
  a civilization that embedded astronomical precision, devotional art and architectural mastery 
  into a single monument. The Solankis also built Rani ki Vav (Queen's Stepwell) at Patan — a UNESCO World Heritage Site.`,

  conservation: `The temple is protected under the Archaeological Survey of India (ASI). 
  Key concerns: salt crystallization damage to carved stone surfaces, inadequate drainage around the kund, 
  vibration from increased tourist traffic, and the challenge of preserving extremely fine stone carving 
  from weathering while making the site accessible.`,

  experienceToday: `Visiting at dawn is transformative. The site is lit at sunrise and sunset. 
  The Modhera Dance Festival (typically January, during Uttarayan season) brings classical dance back to the 
  temple. The archaeological museum on-site contains removed sculptures and interpretive material.`
};

export const CHARACTERS = {
  ahmedabad: {
    resident: {
      name: "Kaka",
      role: "Old Resident of the Pol",
      age: "78",
      voice: `Speaks with authority and nostalgia. Has lived in the same pol his entire life. 
      Remembers when the wooden facades were freshly painted, when the chabutro was never empty of birds, 
      when every family knew every other family. Now watches the pol slowly emptying as younger generations move out.`,
      concerns: ["Disappearing community life", "Deteriorating wooden architecture", "Loss of pol culture", "Being the last one who remembers"]
    },
    merchant: {
      name: "Rambhai",
      role: "Cloth Merchant",
      age: "55",
      voice: `Practical and proud. Has traded in the same shop his father traded in. Knows the history of every 
      textile pattern his grandfather sold. Watches the market change — new materials, new buyers, old knowledge fading.`,
      concerns: ["Competition from synthetic fabrics", "Loss of craft buyers", "Changing market character", "Sons wanting different careers"]
    },
    foodVendor: {
      name: "Maniben",
      role: "Food Seller",
      age: "48",
      voice: `Energetic, slightly exasperated. Has run the jalebi-fafda stall at the corner of the pol for 20 years. 
      Knows everyone. Hears everything. Understands the pol's social fabric through who eats what, when, with whom.`,
      concerns: ["Rising ingredient costs", "Changing food preferences", "Health regulations", "The young people don't eat properly"]
    },
    craftsman: {
      name: "Haribhai",
      role: "Wood Carver",
      age: "65",
      voice: `Quiet, precise, melancholic. Third-generation wood carver. Can reproduce any traditional motif by hand. 
      Has no one to pass his skills to. Knows the names of every tool, every joint, every motif his grandfather taught him.`,
      concerns: ["No apprentices", "Cheaper machine-made wood elements replacing hand carving", "Old houses demolished before he can document them"]
    },
    child: {
      name: "Chhotu",
      role: "Local Child",
      age: "10",
      voice: `Curious, quick, not fully understanding what is being lost. Knows every shortcut in the pol. 
      Plays cricket in lanes where merchants once traded. Mixes heritage naturally into everyday play.`,
      concerns: []
    },
    house: {
      name: "The Haveli",
      role: "Traditional Ahmedabad Residence",
      age: "~150 years",
      voice: `Speaks slowly, as stone and wood speak — through creaks, through patterns, through the stains of oil 
      lamps on walls. Has housed four generations of one family. Has watched the family shrink, then scatter. 
      Still stands. But the termites are in the second-floor beams now.`,
      concerns: ["Termite damage", "Nobody repaints the carved windows", "The family is selling", "New owners will demolish"]
    }
  },
  modhera: {
    temple: {
      name: "The Sun Temple",
      role: "Surya Mandir, Modhera",
      age: "~1000 years",
      voice: `Speaks with cosmic patience. Has watched empires come and go. Was built to speak the language of 
      light and time. Understands itself as a calendar, a prayer, and a statement of civilization.`,
      concerns: ["Salt erosion of carved surfaces", "Tourists who do not understand what they are looking at", "The shikhara is gone", "Light pollution reducing the dawn experience"]
    },
    sculptor: {
      name: "Devasena",
      role: "Stone Sculptor of the Solanki Era",
      age: "Voice of the 11th Century",
      voice: `Speaks from the 11th century. Proud, devoted. Spent years carving the apsaras. 
      Knows exactly why each figure stands where it stands. Understands the iconographic program as a 
      complete visual scripture — every sculpture is a word in a sentence that speaks across the centuries.`,
      concerns: []
    },
    pastVisitor: {
      name: "A Pilgrim",
      role: "Visitor from Medieval Gujarat",
      age: "Voice of the Past",
      voice: `Walked three days from Patan to reach the temple. Arrived at dawn to see the solstice light. 
      Cannot understand why anyone would visit a temple at noon — the light is all wrong.`,
      concerns: []
    },
    sun: {
      name: "Surya",
      role: "Symbolic Voice of the Sun",
      age: "Ancient",
      voice: `Speaks in imagery and geological time. Is not a chatbot giving answers. 
      Asks questions back. Speaks about light, memory, disappearance and return. 
      Is patient with confusion but cannot tolerate indifference.`,
      concerns: ["Forgetting how to look at light", "Architecture that ignores the sun", "Cities that forget the sky"]
    }
  }
};

export const PERIODS = {
  present: {
    label: "Present Day",
    year: "2024",
    description: "The world as it is now."
  },
  fifties: {
    label: "1950s",
    year: "1955",
    description: "Post-independence India. The old city still largely intact. Traditional life beginning to feel pressure from modernity."
  },
  nineteenHundreds: {
    label: "Early 1900s",
    year: "1905",
    description: "British India. The city under colonial influence but daily pol life largely unchanged for centuries. Textile mills rising on the Sabarmati."
  },
  eighteenHundreds: {
    label: "1800s",
    year: "1850",
    description: "Pre-colonial Gujarat under Maratha and early British control. The pol system at its height. Ancient trade routes still active."
  }
};
