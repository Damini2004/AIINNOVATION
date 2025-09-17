
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json'); // Download from Firebase Console
const eventsData = require('../src/lib/events-data.json');

// Check if the app is already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
const eventsCollection = db.collection('events');

async function seedEvents() {
  console.log('Seeding events data...');
  
  // Basic check to prevent re-seeding if data exists.
  // For a real-world scenario, you might want a more robust migration system.
  const snapshot = await eventsCollection.limit(1).get();
  if (!snapshot.empty) {
    console.log('Events collection already contains data. Skipping seed.');
    return;
  }

  const batch = db.batch();

  eventsData.forEach(event => {
    const docRef = eventsCollection.doc(); // Auto-generate ID
    batch.set(docRef, event);
  });

  await batch.commit();
  console.log(`Successfully seeded ${eventsData.length} events!`);
}

seedEvents().catch(error => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
