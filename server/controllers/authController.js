import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { comparePassword } from '../utils/password.js';

const prisma = new PrismaClient();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Verify the user exists
    const user = await prisma.user.findUnique({ 
      where: { email } 
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 2. Verify the password matches the hash
    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Generate the JWT with the Tenant ID (companyId)
    const token = jwt.sign(
      { 
        id: user.id, 
        role: user.role, 
        companyId: user.companyId 
      },
      process.env.JWT_SECRET,
      { expiresIn: '12h' } // Token expires in 12 hours
    );

    // 4. Send the successful response (never send the password back!)
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: user.companyId
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
