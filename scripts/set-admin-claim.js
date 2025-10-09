
const admin = require('firebase-admin');
// IMPORTANT: Download your service account key from the Firebase Console
// and place it in the 'scripts' folder.
// Project Settings > Service accounts > Generate new private key
const serviceAccount = require('./service-account.json');

// --- CONFIGURATION ---
// !! REPLACE THIS with the email of the user you want to make an admin. !!
const adminEmail = 'admin-user-email@example.com';
// -------------------

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function setAdminClaim() {
  if (adminEmail === 'admin-user-email@example.com') {
    console.error('\x1b[31m%s\x1b[0m', 'Error: Please edit this script (scripts/set-admin-claim.js) and replace the placeholder email address with your admin user\'s email.');
    process.exit(1);
  }

  try {
    const user = await admin.auth().getUserByEmail(adminEmail);
    
    // Check if the user already has the admin claim
    if (user.customClaims && user.customClaims.admin === true) {
      console.log(`\x1b[33m%s\x1b[0m`, `User ${adminEmail} already has the admin role.`);
      return;
    }

    // Set the custom claim 'admin' to true
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    
    console.log(`\x1b[32m%s\x1b[0m`, `Success! Custom admin claim set for user: ${adminEmail}`);
    console.log('This user now has admin privileges. It may take a few minutes for the token to refresh.');

  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.error(`\x1b[31m%s\x1b[0m`, `Error: User with email "${adminEmail}" not found in Firebase Authentication.`);
      console.error('Please make sure the user has been created in the Firebase Console.');
    } else {
      console.error('Error setting custom claim:', error);
    }
    process.exit(1);
  }
}

setAdminClaim();
