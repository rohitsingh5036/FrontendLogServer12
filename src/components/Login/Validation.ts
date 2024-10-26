// src/utils/validation.ts
import { z } from 'zod';

export const credentialsSchema = z.object({
  name : z.string() ,
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
