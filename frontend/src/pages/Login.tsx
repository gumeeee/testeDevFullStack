import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { useAuthStore } from "../stores/authStore";
import { Alert, Button, Card, Input } from "../components/ui";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const loginError = useAuthStore((state) => state.loginError);
  const setLoginError = useAuthStore((state) => state.setLoginError);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    shouldFocusError: false,
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      reset();
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Err ja foi setado dentro do Zustand.
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="absolute top-8 right-8 text-white text-sm">
        POLÍTICA DE PRIVACIDADE | TERMOS DE USO
      </div>

      <Card className="w-full max-w-md bg-linear-to-br from-orange-400 to-orange-500 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-block bg-white/20 rounded-full p-3 mb-4">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 
  3.59 8 8-3.59 8-8 8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Senac Learning</h1>
        </div>

        <h2 className="text-white text-center text-lg font-semibold mb-6">
          FAÇA O SEU LOGIN
        </h2>

        {loginError && (
          <div className="mb-4">
            <Alert type="error" onClose={() => setLoginError(null)}>
              {loginError}
            </Alert>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="EMAIL"
              disabled={isSubmitting}
              className="bg-white/90 border-none text-gray-800 placeholder:text-gray-500 disabled:opacity-70"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-white text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="SENHA"
              disabled={isSubmitting}
              className="bg-white/90 border-none text-gray-800 placeholder:text-gray-500 disabled:opacity-70"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="text-white text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-md transition-colors 
  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Entrando..." : "Realizar Login"}
          </Button>
        </form>

        <p className="text-center text-white text-sm mt-4">
          Esqueci minha senha
        </p>
      </Card>

      <div className="absolute bottom-4 text-center text-white/60 text-xs">
        Desenvolvido por Aluno XYZ
      </div>
    </div>
  );
}
