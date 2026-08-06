import fs from 'node:fs';
import path from 'node:path';

const CREDENTIALS_PATH = path.resolve('tests/utils/testUser.json');

function generateRandomString(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateTestUser() {
  const timestamp = Date.now();
  const randomStr = generateRandomString(6);
  const name = `TestUser_${randomStr}`;
  const email = `testuser_${randomStr}_${timestamp}@gmail.com`;
  const password = 'TestPass123!';
  const confirmPassword = password;

  const user = { name, email, password, confirmPassword };
  fs.writeFileSync(CREDENTIALS_PATH, JSON.stringify(user, null, 2));

  return user;
}

export function getTestUser() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(
      'No test user found. Run the sign-up test first to generate credentials.'
    );
  }
  const raw = fs.readFileSync(CREDENTIALS_PATH, 'utf-8');
  return JSON.parse(raw);
}
