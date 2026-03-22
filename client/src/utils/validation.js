import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
    name: z.string().min(2, 'Name is too short'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['seeker', 'employer']),
});

export const jobSchema = z.object({
    title: z.string().min(5, 'Title must be at { "min": 5 } characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    location: z.string().min(2, 'Location is required'),
});
