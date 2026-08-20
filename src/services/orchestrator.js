/**
 * Heritage Orchestrator
 * Central AI orchestrator that decides which agents to call.
 * Emits step-by-step status updates for the immersive agent activity display.
 */

import granite from './ibmGranite.js';

// ─── Intent Detection ─────────────────────────────────────────────────────────

function detectIntent(userInput) {
  const lower = userInput.toLowerCase();
  const intents = [];

  // Always detect heritage context first
  intents.push('detectHeritage');

  if (lower.match(/1800|1850|1900|1905|1950|1955|back in time|used to|used to be|history|historical|past|then|what was|what were|period|era|century/)) {
    intents.push('timeTravel');
  }

  if (lower.match(/talk to|speak to|meet|character|who lived|building talk|wall talk|chat with|introduce|resident|merchant|vendor|craftsman|child|temple|sun|sculptor|surya/)) {
    intents.push('character');
  }

  if (lower.match(/changed|change|difference|different|then vs now|before.*after|compared|comparison|what.*lost|losing/)) {
    if (!intents.includes('timeTravel')) intents.push('timeTravel');
    intents.push('thenVsNow');
  }

  if (lower.match(/chaos|fun|scene|story|daily life|everyday|what happen/)) {
    intents.push('chaos');
  }

  return intents;
}

// ─── Status Messages ──────────────────────────────────────────────────────────

const STATUS_STEPS = {
  detecting:  '🔎 Looking at the place...',
  remembering:'🧠 Remembering its history...',
  imagining:  '👥 Imagining its people...',
  storytelling:'🗣️ Bringing the story to life...',
  done:       '✦ THE CITY REMEMBERS'
};

// ─── Heritage Detective Agent ─────────────────────────────────────────────────

async function heritageDetectiveAgent(input, location, onStatus) {
  onStatus(STATUS_STEPS.detecting);
  await delay(600);
  const result = await granite.generate('detectHeritage', { input: `${location} ${input}` });
  return result.text; // returns structured object from mock
}

// ─── Time Travel Agent ────────────────────────────────────────────────────────

async function timeTravelAgent(location, period, detectionResult, onStatus) {
  onStatus(STATUS_STEPS.remembering);
  await delay(700);
  const result = await granite.generate('timeTravel', { location, period: period || '1900' });
  return result.text;
}

// ─── Character Agent ──────────────────────────────────────────────────────────

async function characterAgent(characterId, location, question, onStatus) {
  onStatus(STATUS_STEPS.imagining);
  await delay(600);
  onStatus(STATUS_STEPS.storytelling);
  await delay(400);
  const result = await granite.generate('characterResponse', { characterId, location, question });
  return result.text;
}

// ─── Then vs Now Agent ────────────────────────────────────────────────────────

async function thenVsNowAgent(location, onStatus) {
  onStatus(STATUS_STEPS.remembering);
  await delay(700);
  const result = await granite.generate('thenVsNow', { location });
  return result.text;
}

// ─── Image Analysis ───────────────────────────────────────────────────────────

async function imageAnalysisAgent(fileName, onStatus) {
  onStatus(STATUS_STEPS.detecting);
  await delay(800);
  onStatus(STATUS_STEPS.remembering);
  await delay(600);
  const result = await granite.generate('analyzeImage', { fileName });
  return result.text;
}

// ─── Heritage Chaos Agent ─────────────────────────────────────────────────────

async function heritageChaosAgent(location, onStatus) {
  onStatus('🔥 Summoning the chaos...');
  await delay(700);
  const isModhera = (location || '').toLowerCase().includes('modhera');
  const result = await granite.generate(isModhera ? 'heritageChaosModhera' : 'heritageChaosPol', { location });
  return result.text;
}

// ─── Main Orchestrator ────────────────────────────────────────────────────────

async function orchestrate({ userInput, location, period, characterId, mode, fileName, onStatus = () => {} }) {

  if (mode === 'imageAnalysis') {
    const analysis = await imageAnalysisAgent(fileName, onStatus);
    onStatus(STATUS_STEPS.done);
    return { type: 'imageAnalysis', data: analysis };
  }

  if (mode === 'chaos') {
    const scene = await heritageChaosAgent(location, onStatus);
    onStatus(STATUS_STEPS.done);
    return { type: 'chaos', data: scene };
  }

  if (mode === 'thenVsNow') {
    const detection = await heritageDetectiveAgent(userInput || location, location, onStatus);
    const comparison = await thenVsNowAgent(location, onStatus);
    onStatus(STATUS_STEPS.done);
    return { type: 'thenVsNow', detection, data: comparison };
  }

  if (mode === 'character' && characterId) {
    const detection = await heritageDetectiveAgent(userInput || '', location, onStatus);
    const response = await characterAgent(characterId, location, userInput, onStatus);
    onStatus(STATUS_STEPS.done);
    return { type: 'character', detection, characterId, data: response };
  }

  if (mode === 'timeTravel') {
    const detection = await heritageDetectiveAgent(userInput || location, location, onStatus);
    const scene = await timeTravelAgent(location, period, detection, onStatus);
    onStatus(STATUS_STEPS.done);
    return { type: 'timeTravel', detection, data: scene };
  }

  // Auto-detect intent from free text
  const intents = detectIntent(userInput || '');
  let result = { intents };

  const detection = await heritageDetectiveAgent(userInput, location, onStatus);
  result.detection = detection;

  if (intents.includes('timeTravel')) {
    result.scene = await timeTravelAgent(location, period || '1900', detection, onStatus);
  }

  if (intents.includes('character') && characterId) {
    result.characterResponse = await characterAgent(characterId, location, userInput, onStatus);
  }

  if (intents.includes('thenVsNow')) {
    result.comparison = await thenVsNowAgent(location, onStatus);
  }

  onStatus(STATUS_STEPS.done);
  return { type: 'orchestrated', ...result };
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { orchestrate, heritageDetectiveAgent, timeTravelAgent, characterAgent, thenVsNowAgent, imageAnalysisAgent, heritageChaosAgent, STATUS_STEPS };
export default orchestrate;
