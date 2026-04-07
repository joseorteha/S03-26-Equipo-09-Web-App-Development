import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Alert } from '../../../components/forms/Alert';


// 1. Definimos el esquema de validación con Zod
const loginSchema = z.object({
  email: z.string().email('Ingresa un correo corporativo válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setServerError(null);
    
    // Simulación de llamada a API
    // Aquí es donde capturarías el error 401 del backend
    setTimeout(() => {
      if (data.email !== 'admin@crm.com' || data.password !== '123456') {
        setServerError('El correo o la contraseña son incorrectos. Por favor, verifica tus datos.');
        setIsLoading(false);
      } else {
        console.log('Login exitoso', data);
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-sm">
      {/* Mensaje de Error Global (Server Error) */}
      {serverError && (
        <Alert variant="error" title="Error de Acceso" onClose={() => setServerError(null)}>
          {serverError}
        </Alert>
      )}

      <div className="space-y-4">
        <Input
          label="Correo Corporativo"
          placeholder="usuario@empresa.com"
          icon="mail"
          {...register('email')}
          error={errors.email?.message} // Vinculación del error de validación
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          icon="lock"
          {...register('password')}
          error={errors.password?.message} // Vinculación del error de validación
        />
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        isLoading={isLoading}
        variant="primary"
      >
        Iniciar Sesión
      </Button>
    </form>
  );
};