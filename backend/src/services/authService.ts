import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-pet-key-2026';

export class AuthService {
  async register(username: string, email: string, password: string): Promise<{ token: string; user: Omit<User, 'passwordHash'> }> {
    const existingUser = Array.from(db.users.values()).find(u => u.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user: User = {
      id: `user-${Date.now()}`,
      username,
      email,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    db.users.set(user.id, user);

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    const { passwordHash: _, ...userWithoutPass } = user;

    return { token, user: userWithoutPass };
  }

  async login(email: string, password: string): Promise<{ token: string; user: Omit<User, 'passwordHash'> }> {
    const user = Array.from(db.users.values()).find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    const { passwordHash: _, ...userWithoutPass } = user;

    return { token, user: userWithoutPass };
  }

  async getUserById(userId: string): Promise<Omit<User, 'passwordHash'> | null> {
    const user = db.users.get(userId);
    if (!user) return null;

    const { passwordHash: _, ...userWithoutPass } = user;
    return userWithoutPass;
  }
}

export const authService = new AuthService();
