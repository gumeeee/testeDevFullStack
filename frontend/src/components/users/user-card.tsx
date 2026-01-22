import {
  Mail,
  MoreVertical,
  Pencil,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import type { User } from "../../types/user.types";
import { Badge, Button } from "../ui";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const [showActions, setShowActions] = useState(false);
  const currentUser = useAuthStore((state) => state.user);

  const getRoleBadgeVariant = (roleId: number) => {
    switch (roleId) {
      case 1:
        return "admin";
      case 2:
        return "moderator";
      default:
        return "reader";
    }
  };

  const canEdit = currentUser?.permissions?.canEdit || false;
  const canDelete = currentUser?.permissions?.canDelete || false;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full bg-linear-to-br from-orange-400 to-orange-500 flex items-center 
  justify-center shrink-0"
        >
          <UserIcon className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">{user.name}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Mail className="w-4 h-4" />
            <span className="truncate">{user.email}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={getRoleBadgeVariant(user.role.id)}>
            {user.role.name}
          </Badge>

          {(canEdit || canDelete) && (
            <div className="relative">
              <Button
                onClick={() => setShowActions(!showActions)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Ações"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </Button>

              {showActions && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowActions(false)}
                  />

                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    {canEdit && (
                      <button
                        onClick={() => {
                          onEdit(user);
                          setShowActions(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Pencil className="w-4 h-4" />
                        Editar
                      </button>
                    )}

                    {canDelete && (
                      <button
                        onClick={() => {
                          onDelete(user);
                          setShowActions(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Excluir
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
