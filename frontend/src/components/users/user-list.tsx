import { UserCard, UserListSkeleton } from ".";
import type { User } from "../../types/user.types";

interface UserListProps {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserList({
  users,
  isLoading,
  onEdit,
  onDelete,
}: UserListProps) {
  if (isLoading) {
    return <UserListSkeleton />;
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Nenhum usuário encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
