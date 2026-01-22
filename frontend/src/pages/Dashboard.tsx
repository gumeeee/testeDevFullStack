import { Button, Card } from "../components/ui";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Bem-vindo(a), {user?.name}!</p>
            </div>
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600"
            >
              Sair
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-gray-700 mb-2">
              Informações do Usuário
            </h2>
            <p className="text-gray-600">
              <strong>E-mail:</strong> {user?.email}
            </p>
            <p className="text-gray-600">
              <strong>Nível:</strong> {user?.role?.name || "Não definido"}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
