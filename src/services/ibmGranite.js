/**
 * IBM Granite / watsonx.ai Provider
 *
 * Attempts to connect to IBM watsonx.ai (IBM Cloud).
 * Falls back automatically to a rich mock provider if IBM services are unavailable.
 * Mock responses use the heritage knowledge base directly — never random hallucination.
 *
 * Environment variables (optional — app works without them):
 *   VITE_WATSONX_API_KEY      — IBM Cloud API key
 *   VITE_WATSONX_PROJECT_ID   — watsonx.ai project ID
 *   VITE_WATSONX_URL          — watsonx.ai endpoint URL (e.g. https://us-south.ml.cloud.ibm.com)
 */

import { AHMEDABAD_KNOWLEDGE, MODHERA_KNOWLEDGE, CHARACTERS, PERIODS } from '../data/heritageKnowledge.js';

const WATSONX_MODEL = 'ibm/granite-13b-chat-v2';
const WATSONX_GENERATE_URL = (baseUrl) =>
  `${baseUrl}/ml/v1/text/generation?version=2023-05-29`;

// ─── IBM Cloud Auth ───────────────────────────────────────────────────────────

async function getIBMAccessToken(apiKey) {
  const resp = await fetch('https://iam.cloud.ibm.com/identity/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`
  });
  if (!resp.ok) throw new Error('IBM IAM auth failed');
  const data = await resp.json();
  return data.access_token;
}

// ─── IBM Granite Generate ─────────────────────────────────────────────────────

async function graniteGenerate(prompt, params = {}) {
  const apiKey = import.meta.env.VITE_WATSONX_API_KEY;
  const projectId = import.meta.env.VITE_WATSONX_PROJECT_ID;
  const baseUrl = import.meta.env.VITE_WATSONX_URL || 'https://us-south.ml.cloud.ibm.com';

  if (!apiKey || !projectId) {
    throw new Error('IBM_CREDENTIALS_MISSING');
  }

  const token = await getIBMAccessToken(apiKey);

  const body = {
    model_id: WATSONX_MODEL,
    input: prompt,
    parameters: {
      max_new_tokens: params.maxTokens || 600,
      min_new_tokens: 50,
      decoding_method: 'greedy',
      temperature: params.temperature || 0.7,
      repetition_penalty: 1.1,
      ...params.extra
    },
    project_id: projectId
  };

  const resp = await fetch(WATSONX_GENERATE_URL(baseUrl), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Granite API error: ${err}`);
  }

  const data = await resp.json();
  return data.results?.[0]?.generated_text?.trim() || '';
}

// ─── Mock Provider ────────────────────────────────────────────────────────────
// Rich, knowledge-grounded mock responses. Clearly labeled as AI-generated.
// Never pretends to be real IBM Granite when credentials are absent.

const MOCK_RESPONSES = {

  detectHeritage: (input) => {
    const lower = (input || '').toLowerCase();
    const isModhera = lower.includes('modhera') || lower.includes('sun temple') || lower.includes('surya') || lower.includes('kund');

    if (isModhera) {
      return {
        location: 'Modhera Sun Temple, Mehsana District, Gujarat',
        architecturalElement: 'Maru-Gurjara temple complex — Sabha Mandapa, Surya Kund, Guda Mandapa',
        historicalContext: 'Built c. 1026 CE by King Bhimdev I of the Chaulukya (Solanki) dynasty. One of the finest examples of Solanki-era temple architecture in India.',
        culturalSignificance: 'Dedicated to Surya (Sun God). Precisely oriented for solar alignments at equinoxes and solstices. Represents the peak of Solanki architectural and astronomical achievement.',
        conservationConcern: 'Salt crystallization damage to carved stone surfaces; loss of shikhara (main tower); vibration from increased tourist traffic; fine sculpture weathering.',
        confidence: 0.94
      };
    }

    return {
      location: 'Ahmedabad Walled City (UNESCO World Heritage City)',
      architecturalElement: 'Traditional Pol neighbourhood — wooden facade residential architecture, carved jharokha bay windows, shared community spaces',
      historicalContext: 'Pol system dates to 15th-century Ahmedabad, founded 1411 CE by Sultan Ahmad Shah. Pols were self-contained community clusters organized by caste, trade or religion.',
      culturalSignificance: 'Represents one of Asia\'s most sophisticated pre-modern urban planning traditions. Social architecture designed for community resilience, ventilation, and shared life.',
      conservationConcern: 'Deteriorating wooden elements due to lack of maintenance and traditional craftsmen; absentee owners; urban pressure from encroachment and demolition.',
      confidence: 0.91
    };
  },

  timeTravel: (location, period) => {
    const isModhera = (location || '').toLowerCase().includes('modhera');
    const periodData = Object.values(PERIODS).find(p => p.year === period) || PERIODS.nineteenHundreds;

    if (isModhera) {
      return `**AI RECONSTRUCTION — inspired by historical and cultural sources**

TIME: ${periodData.year}

The Surya Kund glimmers in the pre-dawn darkness. Around the stepped tank, the 108 miniature shrines hold small oil lamps — their light reflected in the still water below.

A group of pilgrims who have walked from Patan over three days sits quietly on the upper steps, waiting. They have timed their arrival precisely. In minutes, the sun will rise above the eastern horizon.

The Sabha Mandapa is alive with the sound of temple bells and the recitation of the Surya Ashtakam. Priests move through the pillared hall, their white and saffron garments catching the last of the oil-lamp light.

Then it happens.

The sun clears the horizon. Its first light enters the Sabha Mandapa through the eastern archway. It moves slowly across the carved columns — illuminating apsaras, planetary deities, scenes from the Ramayana — as if the temple itself is waking.

The pilgrims rise. The priests chant louder. The light reaches the sanctum.

This is why King Bhimdev I built this.
Not merely a temple. A machine for catching light.
A prayer written in stone and solved by the sun.

The sound of water birds fills the kund. The day has begun.`;
    }

    if (period === '1850') {
      return `**AI RECONSTRUCTION — inspired by historical and cultural sources**

TIME: 1850 — Ahmedabad, Gujarat

The pol gate is still closed. It is not yet dawn.

A chowkidar (night watchman) sits at the pol darwaza entrance, wrapped in a shawl against the cool October morning. He has sat here every night for thirty years.

Inside the pol, the first sounds begin: a temple bell, the scrape of a grinding stone, the smell of wood smoke from a kitchen fire beginning. The chabutro at the centre of the pol already has two pigeons on it from last night.

By the time the sun touches the carved wooden facades, the pol is alive. The upper floors of the havelis — three and four storeys of intricate wood carving, freshly painted in ochre and white — catch the light beautifully.

The pol carpenter is already at work, repairing a carved bracket on the house of Mahajan Seth. The sound of his mallet on the chisel carries through the narrow lane.

A merchant's family passes — carrying cotton bales to the markets near the river. The great textile trade is at its height.

Children chase a dog through the lane. An elderly woman places a divo (oil lamp) in the carved niche beside her doorway.

This pol has operated this way — the same rhythms, the same sounds, the same morning light on the same carved wood — for four hundred years.`;
    }

    return `**AI RECONSTRUCTION — inspired by historical and cultural sources**

TIME: ${periodData.year} — Ahmedabad, Gujarat

The narrow lane of the pol is filling with the sounds of morning.

A merchant opens his cloth shop — bolts of cotton and silk stacked ceiling-high behind him. He calls to the food vendor across the lane. The food vendor does not hear him — he is busy with a large pot of oil, dropping swirls of batter into it, the jalebi spiralling golden in the heat.

Children pour out of a doorway, school bags over their shoulders, dodging around an elderly man who sits on the otla (raised platform) outside his house, reading a newspaper.

The wooden balconies above — carved with peacocks and elephants — are draped with bright fabrics set out to air.

Somewhere deep in the pol, a woman sings while grinding spices.

The pol has its own gravity. It pulls you inward, slows you down, makes you part of its rhythm.

The architecture is doing exactly what it was designed to do: creating a human scale, a communal speed, a life lived in shared proximity rather than isolated privacy.

The day is beginning. The pol remembers.`;
  },

  characterResponse: (characterId, location, question) => {
    const isModhera = (location || '').toLowerCase().includes('modhera');
    const chars = isModhera ? CHARACTERS.modhera : CHARACTERS.ahmedabad;

    const responses = {
      sun: {
        default: `I have been here since before there was a "here."

I watched King Bhimdev's architects lay the first stone of the Surya Kund. They argued for weeks about the angle — the precise degree at which I would enter the Sabha Mandapa at the equinox. They had no instruments beyond shadows and knowledge passed down from astronomers before them.

They were right.

I have been entering that doorway at the same angle, on the same mornings, for a thousand years.

What do you see when you look at this temple? Stone? Carving?

Look at the geometry. Follow the mathematics of the stairwell. Count the shrines around the kund — 108. That is not decoration. That is cosmology.

Then ask yourself: what happens when the people who understand why 108 matters disappear?`,
        whatHaveYouSeen: `I have watched empires.

I watched the Chaulukya dynasty — the Solankis — reach their height of power and wisdom. I watched their architects embed astronomical precision into stone with tools simpler than anything you carry in your pocket.

I watched armies cross this plain. I watched the shikhara of my own temple fall — whether to earthquake or raid, the stones do not agree on the answer.

I watched the British arrive, survey, measure and document. At least they recorded what they found.

I watch now as the carved surfaces slowly dissolve in the rain. Salt crystallizes in the fine cuts of the apsara's fingers. Weather takes what armies did not.

I have watched more than you want to know.

Come back at dawn. I will show you what I have not yet lost.`,
        whatAreYouAfraidOf: `Indifference.

Not the bulldozer. Not the earthquake. Indifference.

The earthquake came for my shikhara and it fell. But the stone carvers who remained rebuilt what they could. The community remembered.

What I cannot survive is the visitor who looks at these stones and sees only a backdrop for a photograph. The tourist who is here at noon — when the light is flat and the geometry is dead — and wonders why the temple doesn't "feel like anything."

Come at dawn. Come at the equinox. Come when the light touches the first pillar of the Sabha Mandapa and moves — slowly — across the apsaras toward the sanctum.

Then you will understand what we built here.

Then you will understand what is at risk when nobody teaches their children to read light.`,
        whatIsDisappearing: `The knowledge of how to look.

The temple still stands. The solar alignments still work. At the equinox, I still enter the Sabha Mandapa at the angle Bhimdev's architects calculated a thousand years ago.

But fewer and fewer people know to come at dawn.

Fewer know what the 108 shrines mean. Fewer can read the iconographic sequence carved across the exterior — the visual scripture that describes an entire cosmology in stone.

The temple is here. But the literacy to read it is disappearing.

That is what conservation must protect. Not just the stone. The knowledge of what the stone means.`
      },

      resident: {
        default: `Eh. You want to know about this pol?

I'll tell you what my grandfather told me. He told me what his grandfather told him. This pol was built before anyone here was born and it will stand after everyone here is gone.

The question is — will it still be a pol? Or will it just be a building?

You see the wooden facade on that house over there? Three years ago, the second-floor bracket fell. The family wanted to fix it in concrete. I had to argue for two months — concrete doesn't breathe in this heat! The house would crack in five years. You need wood for wood.

But where do you find someone who knows how to do that work now? Haribhai still knows. But he's sixty-five. And his sons are in Surat, working in a diamond factory.

That's the problem. The wood is rotting. The knowledge is retiring.`,
        whoLivedHere: `My father's family. His father's family. And before that — we stop counting at four generations because nobody wrote anything down.

In this pol, we knew everything about each other. Not because we were nosy — because we were close. If your child was sick, we knew. If your shop had a bad year, we knew. If your family was in trouble, we knew before you had to ask for help.

That's what a pol is. It's not an architecture project. It's a system for keeping humans alive and connected.

Now half the houses are locked. The owners moved to the new city. They come back maybe at Diwali. The wood rots while they are gone.`,
        whatDoYouRemember: `The festivals.

Uttarayan — kite festival — January. Every rooftop in this pol full of people. Manja string everywhere. Children screaming. Old men pretending they're not competitive. Cutting other people's kites.

My wife would spend three days cooking. The smell of til (sesame) ladoos and undhiyu would come out of every kitchen in the pol at the same time.

Now? Half the rooftops have mobile towers on them. The other half are crumbling.

But I still fly kites. On the rooftop. Alone if I have to.`
      },

      house: {
        default: `I have been standing here for one hundred and forty-seven years.

I know because there is a carved stone tablet above my doorway — partially hidden now by the cable wire someone bolted across my face in 1987 — that records the year of my construction.

I was built for a merchant family. Prosperous. Careful. They chose teak from Burma for my staircase balustrade. Look at the grain. Still there. Still holding.

My carved facade took a craftsman and his two sons three years to complete. Every motif has a name. The double peacocks flanking my central window mean prosperity and protection. The elephant heads on my corner brackets are for strength and memory.

Now there is a crack in my second-floor wall. It has been there for eleven years. Nobody has filled it.

I am not asking for much. Just someone to fill the crack.`,
        howOldAreYou: `One hundred and forty-seven years, as I said. Which is young for a pol house.

My neighbour — the one with the green shutters — has a stone lintel dated to the 1720s. She refuses to discuss her age but the carving style on her ground-floor columns is clearly older than anything in this lane.

In the context of this city — founded in 1411 — I am an adolescent.

In the context of what most cities consider "old" — I am ancient.

What I am not is replaceable.`,
        whatIsHurtingYou: `The termites found the east wall beam on the second floor three years ago.

Also: rainwater is getting into the carved bracket above the jharokha — the wooden bay window on my first floor. The waterproofing failed. Every monsoon, water sits in the carving. The wood is darkening. Then softening. Then it will fall.

Also: the family that owns me is negotiating with a developer.

The developer has told them: "The land is worth ten times the building." They are not wrong about the numbers. They are wrong about what the building is worth.

I have heard this conversation three times through my walls. I know how it ends.`
      },

      merchant: {
        default: `Business is business. But this is not just a shop — this is my grandfather's shop.

He started in cotton. My father added silk. I added synthetic blends. My son — if he comes back from Surat — will probably add something I can't imagine yet.

But the shop is the same. Same tiles on the floor. Same carved wooden counter my grandfather stood behind.

You know what tourists always ask me? "Is this handmade?" I say: "Look at the irregularities. If it's perfect, a machine made it. If it breathes, a human did."

That's the problem now. People want perfect. They want cheap. They want fast.

Nobody wants the thing that breathes.`,
      },

      foodVendor: {
        default: `Ey! You want jalebi or you want to talk?

I can do both. But the jalebi won't wait.

This corner — this exact corner — has had a food stall since before my mother was born. Her mother sold here. I sell here. The recipe has not changed.

Gram flour. Fermented overnight. Same proportions. Same oil temperature. The sugar syrup — I make it fresh every morning at 5am. Nobody comes that early. Nobody knows I do it. But the jalebi knows.

You can taste the difference between jalebi made with fresh syrup and jalebi made with yesterday's syrup. Anybody from this pol can tell you. That knowledge is in our tongues.

Now people come here for Instagram pictures. Not for the jalebi.

I don't know what to do about that.`
      },

      sculptor: {
        default: `I spent four years on the apsaras of the Sabha Mandapa.

Four years. One figure at a time. I knew each one by name before I carved her.

The pose, the gesture, the ornament — nothing is decoration. Everything is language. The figure with her foot raised — she is the nupura-sravana, listening to the anklet bells of another dancer who has just passed. She is caught mid-attention.

When you walk through the Sabha Mandapa and the light is right — at dawn in the cold months — you will see her head turn. The light changes her. Every hour she is different.

That was the intention.

We were not carving static images. We were carving presences that the light would animate, differently, every day, for as long as the temple stands.

Are you listening to the stones? Or just looking at them?`
      }
    };

    const charResponses = responses[characterId];
    if (!charResponses) return `I am here. Ask me what you want to know about this place.`;

    const qLower = (question || '').toLowerCase();
    if (qLower.includes('afraid') || qLower.includes('fear')) return charResponses.whatAreYouAfraidOf || charResponses.default;
    if (qLower.includes('seen') || qLower.includes('watched') || qLower.includes('witness')) return charResponses.whatHaveYouSeen || charResponses.default;
    if (qLower.includes('disappear') || qLower.includes('losing') || qLower.includes('lost')) return charResponses.whatIsDisappearing || charResponses.default;
    if (qLower.includes('remember') || qLower.includes('memory')) return charResponses.whatDoYouRemember || charResponses.default;
    if (qLower.includes('who lived') || qLower.includes('family')) return charResponses.whoLivedHere || charResponses.default;
    if (qLower.includes('how old') || qLower.includes('age')) return charResponses.howOldAreYou || charResponses.default;
    if (qLower.includes('hurt') || qLower.includes('pain') || qLower.includes('damage')) return charResponses.whatIsHurtingYou || charResponses.default;

    return charResponses.default;
  },

  analyzeImage: (fileName) => {
    return {
      disclaimer: '⚠️ SIMULATED ANALYSIS — This is not real computer vision. No actual image analysis was performed.',
      location: 'Likely Ahmedabad Walled City — traditional residential architecture',
      architecturalElement: 'Probable wooden facade with carved elements — traditional Gujarati residential style',
      estimatedAge: 'Historically estimated: 100–180 years, based on architectural style',
      condition: 'AI preliminary assessment: moderate weathering visible. Wooden elements may require conservation attention.',
      features: ['Carved wooden facade elements', 'Projecting jharokha (bay window)', 'Traditional masonry construction', 'Heritage-era proportions'],
      confidence: 0.42,
      note: 'For actual conservation assessment, please consult a qualified heritage architect.'
    };
  },

  thenVsNow: (location) => {
    const isModhera = (location || '').toLowerCase().includes('modhera');
    if (isModhera) {
      return {
        then: `In the 11th century, the Modhera Sun Temple was the centre of a thriving pilgrimage economy. The Surya Kund was filled with ritual bathers at dawn. The Sabha Mandapa echoed with Sanskrit hymns and the sound of bell-metal temple instruments. The shikhara of the main sanctum rose above the plains — visible for miles as a landmark of Solanki power and devotion. The iconographic program of sculptures was maintained, repaired, repainted. It was a living temple.`,
        now: `Today the temple is a protected archaeological monument under the ASI. No active worship takes place. The shikhara is gone. The Surya Kund is still largely intact and is one of the finest stepped tanks in India. The sculptures are slowly weathering — salt crystallization is dissolving the finest carved details. The Modhera Dance Festival (held annually, typically in January) brings classical performance back to the site. It is a ruin with an intact soul.`,
        changes: ['Loss of shikhara (main tower)', 'Cessation of active worship', 'Slow erosion of fine stone carving', 'Transformation from living temple to archaeological site', 'Increased tourist footfall changing site character', 'Light pollution reducing pre-dawn experience'],
        conservationNote: `What is being lost at Modhera is not primarily stone — it is legibility. The sculptures are a visual scripture. As the finest carving weathers, the narrative program becomes less readable. As fewer people learn to read Solanki iconography, the meaning embedded in every surface recedes. Conservation here is not just about stone: it is about preserving the knowledge of what the stone says.`
      };
    }
    return {
      then: `In the 19th century, Ahmedabad's pols were complete worlds. Every house was inhabited by the family that built it. The wooden facades were maintained — painted, repaired, extended. Craftsmen lived in the pol and could be called upon to repair a bracket or replace a carved panel. The chabutros were alive with birds fed by every household. The pol gates closed at night for security. Neighbours knew everything about each other. The pol was not a neighbourhood — it was a kinship system expressed in architecture.`,
      now: `Today, many pols are half-empty. Original families have moved to modern apartments in newer parts of the city. Absentee owners leave properties locked for years — wooden facades deteriorating without maintenance. Cable wires, mobile towers and advertising boards are bolted across carved surfaces. Some pols have been entirely demolished for commercial development. UNESCO listing (2017) has increased awareness but conservation remains underfunded. The most endangered element is not the stone or wood — it is the community that gave the pol its meaning.`,
      changes: ['Departure of original families to newer city areas', 'Deterioration of wooden facades from lack of maintenance', 'Loss of skilled craftsmen who knew traditional carpentry', 'Commercial encroachment into residential pol lanes', 'Fragmentation of community life', 'Demolition of individual structures', 'Modern utilities (cables, pipes) bolted across heritage surfaces'],
      conservationNote: `The Ahmedabad pols face a challenge that UNESCO listing alone cannot solve: the heritage is not just architectural — it is social. A pol without its community is a stage set. Conservation must find ways to make the old city economically viable for the families that built it, while preserving the architectural fabric that is its physical expression. The two are inseparable.`
    };
  },

  heritageChaosModhera: () => `**FICTIONALIZED AI SCENE INSPIRED BY HERITAGE**

TIME: Dawn, circa 1050 CE — Modhera Kund

PRIEST (calling down the steps of the kund):
"The pilgrims from Patan are here already! They arrived before the torches were lit!"

HEAD SCULPTOR (without looking up from the stone):
"Good. They can watch me finish the seventh apsara. She's been waiting three months for her anklet."

PILGRIM (breathlessly, having walked three days):
"We timed our arrival for the equinox light — is today the day?"

ASTRONOMER-PRIEST (checking a shadow instrument):
"Four days early. You walked too fast."

PILGRIM:
"Four days? I brought provisions for—"

ASTRONOMER-PRIEST:
"There is food in the village. There is also the Ramayana carved on the second pillar of the Sabha Mandapa if you need something to do. Reading it correctly takes approximately three days."

HEAD SCULPTOR (still not looking up):
"It takes longer if you actually understand it."

(A temple elephant crosses the kund courtyard, scattering pigeons from the 108 shrines, disrupting a carefully arranged flower offering.)

TEMPLE SERVANT (chasing the elephant):
"AGAIN! Every morning! The marigolds were perfect—!"

HEAD SCULPTOR:
"The elephant is not wrong. Surya appreciates a dynamic offering."

(In the eastern sky, the sun begins to rise above the horizon. Everyone falls silent. The light enters the Sabha Mandapa. It moves across the first column.)

EVERYONE:
(silence)

(The light reaches the sanctum.)

HEAD SCULPTOR (quietly, to no one in particular):
"See? Worth the wait."`,

  heritageChaosPol: () => `**FICTIONALIZED AI SCENE INSPIRED BY HERITAGE**

TIME: Morning — A traditional Pol, Ahmedabad

MANIBEN (Food Seller, bellowing from her corner stall):
"MOVE! The jalebi is in the oil! If you stand there the smoke goes in your eyes AND my oil temperature drops AND EVERYTHING IS RUINED!"

RAMBHAI (Merchant, appearing in shop doorway):
"You're blocking my customers! They can't even see my shop sign!"

MANIBEN:
"Your sign is carved wood on a three-hundred-year-old doorway. Everyone in this pol knows where your shop is. They were BORN knowing where your shop is."

RAMBHAI:
"I have NEW customers! Tourists!"

CHHOTU (Child, running at full speed from the depths of the pol):
"MOVE MOVE MOVE — Kaka's pigeon got onto Haribhai's workshop roof and now Haribhai won't give it back until someone moves that bicycle that's been blocking his door for six days—"

MANIBEN:
"That's MY bicycle!"

CHHOTU:
"—and also I found a shortcut through the old haveli if anyone wants to reach the market—"

RAMBHAI:
"What old haveli? That building has been locked for five years!"

CHHOTU:
"The lock is broken. Has been for two years. I fixed the courtyard fountain though. With a piece of teak I found in Haribhai's wood pile."

HARIBHAI (Woodcarver, appearing at the end of the lane, looking exhausted):
"That wasn't scrap wood. That was eighteenth-century teak from a demolished mansion. I was saving it."

CHHOTU:
"The fountain works now."

KAKA (from his otla, not looking up from his newspaper):
"The boy is not wrong. The fountain has not worked since 1987. Sometimes the right person finds the right piece of wood."

(Long pause.)

HARIBHAI:
"...Come. I'll teach you the proper joint for fountain stone. But you carry the wood."

MANIBEN (pressing a hot jalebi into Chhotu's hands):
"Eat first. The wood will wait. The jalebi will not."

KAKA (still not looking up):
"This pol has operated like this for four hundred years. I don't know why anyone is surprised."`
};

// ─── Main Provider Interface ──────────────────────────────────────────────────

let usingMock = false;

async function generate(taskType, params = {}) {
  // Try IBM Granite first; fall back to mock if credentials missing or call fails
  try {
    const apiKey = import.meta.env.VITE_WATSONX_API_KEY;
    if (!apiKey) throw new Error('IBM_CREDENTIALS_MISSING');

    const prompt = buildPrompt(taskType, params);
    const result = await graniteGenerate(prompt, { maxTokens: params.maxTokens || 600 });
    usingMock = false;
    return { text: result, source: 'ibm-granite', mock: false };
  } catch (err) {
    usingMock = true;
    return { text: mockDispatch(taskType, params), source: 'mock-heritage-provider', mock: true };
  }
}

function mockDispatch(taskType, params) {
  switch (taskType) {
    case 'detectHeritage': return MOCK_RESPONSES.detectHeritage(params.input);
    case 'timeTravel': return MOCK_RESPONSES.timeTravel(params.location, params.period);
    case 'characterResponse': return MOCK_RESPONSES.characterResponse(params.characterId, params.location, params.question);
    case 'analyzeImage': return MOCK_RESPONSES.analyzeImage(params.fileName);
    case 'thenVsNow': return MOCK_RESPONSES.thenVsNow(params.location);
    case 'heritageChaosPol': return MOCK_RESPONSES.heritageChaosPol();
    case 'heritageChaosModhera': return MOCK_RESPONSES.heritageChaosModhera();
    default: return 'The heritage speaks. Ask it a question.';
  }
}

function buildPrompt(taskType, params) {
  const ahmdCtx = JSON.stringify(AHMEDABAD_KNOWLEDGE, null, 2).slice(0, 2000);
  const modCtx = JSON.stringify(MODHERA_KNOWLEDGE, null, 2).slice(0, 2000);

  const baseContext = `You are an AI heritage storyteller for HERITAGE: ALIVE, an experience about Ahmedabad's Walled City and Modhera Sun Temple.
Use only the following verified heritage knowledge. Do not invent specific historical events or claim fictional characters actually existed.
Always clearly label AI reconstructions.

HERITAGE KNOWLEDGE (Ahmedabad): ${ahmdCtx}
HERITAGE KNOWLEDGE (Modhera): ${modCtx}`;

  switch (taskType) {
    case 'timeTravel':
      return `${baseContext}

Create an immersive historical scene for ${params.location} in ${params.period}.
Include: setting, people, sounds, activities, architecture, food and social life.
Label it clearly: AI RECONSTRUCTION — inspired by historical and cultural sources
Be immersive and literary. Maximum 300 words.`;

    case 'characterResponse':
      return `${baseContext}

You are playing the character: ${params.characterId} at ${params.location}.
Respond to this question: "${params.question}"
Be personal, historically grounded, and conversational — not encyclopedic.
Express genuine concerns about heritage preservation naturally. Maximum 200 words.`;

    case 'thenVsNow':
      return `${baseContext}

For ${params.location}, provide:
1. THEN: Historical description (2-3 sentences)
2. NOW: Current situation (2-3 sentences)  
3. KEY CHANGES: 5-7 bullet points
4. CONSERVATION NOTE: What is being lost and why it matters (2-3 sentences)
Format as JSON with keys: then, now, changes (array), conservationNote`;

    default:
      return `${baseContext}\n\n${params.input || ''}`;
  }
}

export function isUsingMock() { return usingMock; }

export default {
  generate,
  isUsingMock,
  MOCK_RESPONSES
};
