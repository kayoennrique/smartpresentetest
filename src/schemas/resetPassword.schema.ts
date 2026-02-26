import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'A nova senha deve ter pelo menos 6 caracteres.'),
    confirmPassword: z.string().min(1, 'Confirme sua senha.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem.',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
