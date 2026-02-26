import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Informe seu nome completo"),

  email: z.string().email("Email inválido"),

  phone: z
    .string()
    .min(10, "Informe o celular com DDD")
    .refine((value) => {
      const numbers = value.replace(/\D/g, "");

      // +55DD9XXXXXXXX → 13 ou 14 chars com símbolo
      // DD9XXXXXXXX → 11 números
      return numbers.length >= 11;
    }, "Informe o celular com DDD (ex: 21 9xxxx-xxxx)"),

  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    // .regex(/[A-Za-z]/, "A senha deve conter letras")
    // .regex(/\d/, "A senha deve conter números")
    // .regex(/[^A-Za-z0-9]/, "A senha deve conter caractere especial"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
