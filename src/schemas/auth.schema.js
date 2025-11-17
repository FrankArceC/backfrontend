import {z} from 'zod';

export const registerSchema = z.object({
    name: z.string({ required_error: 'El nombre es obligatorio' }),
    email: z.string({ required_error: 'El email es obligatorio' }).email('El email no es válido'),
    password: z.string({ required_error: 'La contraseña es obligatoria' }).min(6, 'La contraseña debe tener al menos 6 caracteres')
});

export const loginSchema = z.object({
    email: z.string({required_error: 'El email es obligatorio'}).email('El email no es válido'),
    password: z.string({ required_error: 'La contraseña es obligatoria' }).min(6, 'La contraseña debe tener al menos 6 caracteres')
});


