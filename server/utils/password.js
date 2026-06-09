import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Hash a password using bcrypt with 10 salt rounds.
 * @param {string} password - Plaintext password
 * @returns {Promise<string>} Hashed password
 */
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare a plaintext password with a hashed password.
 * @param {string} password - Plaintext password
 * @param {string} hashedPassword - Hashed password from database
 * @returns {Promise<boolean>} True if matches, else false
 */
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
