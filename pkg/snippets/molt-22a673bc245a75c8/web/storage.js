let database;
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
