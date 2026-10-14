let database;
let lastSound = 0;
export function playSound(kind, amount) {
  const context = window.moltAudio;
  if (!context || context.state !== 'running' || window.moltMuted) return;
  const now = context.currentTime;
  if (now - lastSound < (kind === 0 ? 0.055 : 0.12)) return;
  lastSound = now;
  const gain = context.createGain();
  gain.connect(context.destination);
  if (kind === 1) {
    const duration = 0.35;
    const buffer = context.createBuffer(1, Math.floor(context.sampleRate*duration), context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i=0; i<data.length; i++) data[i] = (Math.random()*2-1)*Math.pow(1-i/data.length,2);
    const noise = context.createBufferSource();
    const filter = context.createBiquadFilter();
    filter.type='lowpass'; filter.frequency.setValueAtTime(900,now); filter.frequency.exponentialRampToValueAtTime(65,now+duration);
    gain.gain.setValueAtTime(0.16*Math.min(1,amount),now);
    noise.buffer=buffer; noise.connect(filter); filter.connect(gain); noise.start();
    noise.onended=()=>{noise.disconnect();filter.disconnect();gain.disconnect();};
  } else {
    const oscillator=context.createOscillator();
    oscillator.type=kind===2?'triangle':'sine';
    const frequency=kind===2?260:430+Math.min(amount,120)*4;
    const duration=kind===2?0.38:0.09;
    oscillator.frequency.setValueAtTime(frequency,now);
    oscillator.frequency.exponentialRampToValueAtTime(frequency*(kind===2?3:1.5),now+duration);
    gain.gain.setValueAtTime(0.0001,now);
    gain.gain.exponentialRampToValueAtTime(0.055,now+0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001,now+duration);
    oscillator.connect(gain);oscillator.start();oscillator.stop(now+duration);
    oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};
  }
}
function openDatabase() {
  if (!database) database = new Promise((resolve, reject) => {
    const request = indexedDB.open('molt-world-v1', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('chunks', {keyPath: 'key'});
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return database;
}
export async function loadChunks(json) {
  const db = await openDatabase();
  const keys = JSON.parse(json);
  return new Promise((resolve, reject) => {
    const tx = db.transaction('chunks', 'readonly');
    const result = [];
    for (const key of keys) {
      const req = tx.objectStore('chunks').get(key);
      req.onsuccess = () => { if (req.result) result.push(req.result); };
    }
    tx.oncomplete = () => resolve(JSON.stringify(result));
    tx.onerror = tx.onabort = () => reject(tx.error || new Error('World load interrupted'));
  });
}
export async function saveChunks(json) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('chunks', 'readwrite');
    for (const chunk of JSON.parse(json)) tx.objectStore('chunks').put(chunk);
    tx.oncomplete = () => resolve();
    tx.onerror = tx.onabort = () => reject(tx.error || new Error('World save interrupted'));
  });
}
