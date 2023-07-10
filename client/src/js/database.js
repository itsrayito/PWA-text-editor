import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// this will add content to the index db
export const putDB = async (content) => {

    console.log('Post to the database');
    const jateDb = await openDB('jate', 1 );
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.add({ value: content });
    const result = await request;
    console.log(' data saved to the database', result);
};

// this will get all the content from the database
export const getDb = async () => {

    console.log('GET all from the database');
    const jateDB = await openDB('jate', 1);
    const tx = jateDB.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
};

initdb();