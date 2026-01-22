import { Activity, ArrowRight, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../components/layout/app-layout";
import { Button, Card } from "../components/ui";
import { useAuthStore } from "../stores/authStore";

export function Dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Gestão de Usuários",
      description:
        "Visualize, crie, edite e gerencie os usuários da plataforma.",
      icon: Users,
      color: "from-orange-400 to-orange-500",
      action: () => navigate("/users"),
    },
  ];

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Olá, {user?.name}!
        </h1>
        <p className="text-gray-600 text-lg">
          Bem-vindo ao painel administrativo. Aqui você pode gerenciar todos os
          aspectos da plataforma.
        </p>
      </div>

      <Card className="p-6 mb-6 bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center 
  shrink-0"
          >
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Suas Informações
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">E-mail</p>
                <p className="font-medium text-gray-800">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nível de Acesso</p>
                <p className="font-medium text-gray-800">{user?.role?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Permissões</p>
                <div className="flex gap-2 mt-1">
                  {user?.permissions?.canEdit && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Editar
                    </span>
                  )}
                  {user?.permissions?.canDelete && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      Excluir
                    </span>
                  )}
                  {!user?.permissions?.canEdit &&
                    !user?.permissions?.canDelete && (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                        Visualizar
                      </span>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Acesso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={action.action}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-full bg-linear-to-br ${action.color} flex items-center justify-center 
  shrink-0`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {action.description}
                    </p>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 text-sm">
                      Acessar
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-6 h-6 text-orange-500" />
          <h2 className="text-xl font-bold text-gray-800">Atividade Recente</h2>
        </div>
        <p className="text-gray-600 text-center py-8">
          Nenhuma atividade recente para exibir. (Apenas para teste)
        </p>
      </Card>
    </AppLayout>
  );
}
