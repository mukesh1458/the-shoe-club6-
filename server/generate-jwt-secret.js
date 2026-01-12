// Quick utility script to generate a secure JWT secret
// Run: node generate-jwt-secret.js

const crypto = require('crypto');

console.log('\n🔐 Generating secure JWT_SECRET...\n');

const secret = crypto.randomBytes(64).toString('hex');

console.log('✅ Your JWT_SECRET (copy this):');
console.log('─'.repeat(130));
console.log(secret);
console.log('─'.repeat(130));

console.log('\n📋 Add this to your Render environment variables:');
console.log('   Key: JWT_SECRET');
console.log('   Value:', secret);

console.log('\n⚠️  IMPORTANT: Keep this secret secure!');
console.log('   - Never commit it to Git');
console.log('   - Never share it publicly');
console.log('   - Use different secrets for development and production\n');
