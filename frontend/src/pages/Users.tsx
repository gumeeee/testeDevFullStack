import {
  Eye,
  Plus,
  Shield,
  TrendingUp,
  Users as UsersIcon,
} from "lucide-react";
import { useState } from "react";
import { AppLayout } from "../components/layout/app-layout";
import { Button, Card, ConfirmDialog, Modal } from "../components/ui";
import { UserForm, UserList } from "../components/users";
import { useUsers } from "../hooks/useUsers";
import { useAuthStore } from "../stores/authStore";
import type { User } from "../types/user.types";

export function Users() {
  const currentUser = useAuthStore((state) => state.user);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    users,
    isLoading,
    createUser,
    isCreating,
    updateUser,
    isUpdating,
    deleteUser,
    isDeleting,
  } = useUsers();

  const canCreate =
    currentUser?.permissions?.canEdit && currentUser?.role?.id === 1;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = (data: any) => {
    createUser(data, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
      },
    });
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = (data: any) => {
    if (selectedUser) {
      updateUser(
        { id: selectedUser.id, data },
        {
          onSuccess: () => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          },
        },
      );
    }
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setSelectedUser(null);
        },
      });
    }
  };

  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role.id === 1).length,
    moderators: users.filter((u) => u.role.id === 2).length,
    readers: users.filter((u) => u.role.id === 3).length,
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-12 h-12 rounded-full bg-linear-to-br from-orange-400 to-orange-500 flex items-center 
  justify-center"
          >
            <UsersIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Gestão de Usuários
            </h1>
            <p className="text-gray-600">
              Gerencie todos os usuários da plataforma
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total</p>
              <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
            </div>
            <UsersIcon className="w-10 h-10 text-blue-500 opacity-50" />
          </div>
        </Card>

        <Card className="p-4 bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Admins</p>
              <p className="text-3xl font-bold text-purple-900">
                {stats.admins}
              </p>
            </div>
            <Shield className="w-10 h-10 text-purple-500 opacity-50" />
          </div>
        </Card>

        <Card className="p-4 bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Moderadores</p>
              <p className="text-3xl font-bold text-blue-900">
                {stats.moderators}
              </p>
            </div>
            <TrendingUp className="w-10 h-10 text-blue-500 opacity-50" />
          </div>
        </Card>

        <Card className="p-4 bg-linear-to-br from-gray-50 to-gray-100 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Leitores</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.readers}
              </p>
            </div>
            <Eye className="w-10 h-10 text-gray-500 opacity-50" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Lista de Usuários
          </h2>

          {canCreate && (
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Novo Usuário
            </Button>
          )}
        </div>

        <UserList
          users={users}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </Card>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Novo Usuário"
      >
        <UserForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={isCreating}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        title="Editar Usuário"
      >
        <UserForm
          user={selectedUser}
          onSubmit={handleUpdate}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          isLoading={isUpdating}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Excluir Usuário"
        description={`Tem certeza que deseja excluir o usuário "${selectedUser?.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        isLoading={isDeleting}
      />
    </AppLayout>
  );
}
