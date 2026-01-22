<?php

namespace App\Enums;

enum UserRole: int
{
    case ADMIN = 1;
    case MODERATOR = 2;
    case READER = 3;

    public function label(): string
    {
        return match ($this) {
            self::ADMIN => 'Administrador',
            self::MODERATOR => 'Moderador',
            self::READER => 'Leitor',
        };
    }

    public function canEdit(): bool
    {
        return in_array($this, [self::ADMIN, self::MODERATOR]);
    }

    public function canDelete(): bool
    {
        return $this === self::ADMIN;
    }
}
