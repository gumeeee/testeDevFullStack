<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin user
        User::updateOrCreate(
            ['email' => 'admin@teste.com'],
            [
                'name' => 'Administrador',
                'password' => Hash::make('password123'),
                'role' => UserRole::ADMIN,
            ]
        );

        User::updateOrCreate(
            ['email' => 'moderador@teste.com'],
            [
                'name' => 'Moderador',
                'password' => Hash::make('password123'),
                'role' => UserRole::MODERATOR,
            ]
        );

        User::updateOrCreate(
            ['email' => 'leitor@teste.com'],
            [
                'name' => 'Leitor',
                'password' => Hash::make('password123'),
                'role' => UserRole::READER,
            ]
        );
    }
}
