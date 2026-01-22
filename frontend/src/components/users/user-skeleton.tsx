import { Skeleton } from "../ui";

export function UserSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />

        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-40" />

          <Skeleton className="h-4 w-56" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />

          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
}

export function UserListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <UserSkeleton key={i} />
      ))}
    </div>
  );
}
