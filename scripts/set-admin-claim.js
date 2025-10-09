
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json'); // Download from Firebase Console

// !!! IMPORTANT !!!
// Replace this with the email of the user you want to make an admin.
const adminEmail = 'admin-user-email@example.com';

// Check if the app is already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function setAdminClaim() {
  try {
    const user = await admin.auth().getUserByEmail(adminEmail);
    if (user.customClaims && user.customClaims.admin === true) {
      console.log(`User ${adminEmail} is already an admin.`);
      return;
    }

    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Successfully set custom claim 'admin: true' for user: ${adminEmail}`);

  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.error(`Error: User with email "${adminEmail}" not found.`);
      console.error('Please create this user in the Firebase Authentication console first.');
    } else {
      console.error('Error setting custom claim:', error);
    }
    process.exit(1);
  }
}

setAdminClaim();
