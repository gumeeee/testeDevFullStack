<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Teste de listagem de usuários (qualquer nível pode listar)
     */
    public function test_authenticated_user_can_list_users(): void
    {
        $user = User::factory()->create(['role' => UserRole::READER]);
        User::factory()->count(5)->create();

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/v1/users');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'email', 'role', 'permissions'],
                ],
                'meta' => ['current_page', 'last_page', 'per_page', 'total'],
            ]);

        $this->assertCount(6, $response->json('data')); // 5 + 1 (usuário logado)
    }

    /**
     * Teste de visualização de usuário específico
     */
    public function test_authenticated_user_can_view_specific_user(): void
    {
        $user = User::factory()->create(['role' => UserRole::READER]);
        $targetUser = User::factory()->create(['name' => 'Target User']);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson("/api/v1/users/{$targetUser->id}");

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $targetUser->id,
                    'name' => 'Target User',
                ],
            ]);
    }

    /**
     * Teste de criação de usuário (apenas Admin)
     */
    public function test_admin_can_create_user(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);

        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/v1/users', [
                'name' => 'New User',
                'email' => 'newuser@example.com',
                'password' => 'password123',
                'role' => UserRole::READER->value,
            ]);

        $response->assertStatus(201)
            ->assertJson([
                'message' => 'Usuário criado com sucesso.',
                'data' => [
                    'name' => 'New User',
                    'email' => 'newuser@example.com',
                ],
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'newuser@example.com',
        ]);
    }

    /**
     * Teste de criação de usuário (Moderador não pode)
     */
    public function test_moderator_cannot_create_user(): void
    {
        $moderator = User::factory()->create(['role' => UserRole::MODERATOR]);

        $response = $this->actingAs($moderator, 'sanctum')
            ->postJson('/api/v1/users', [
                'name' => 'New User',
                'email' => 'newuser@example.com',
                'password' => 'password123',
                'role' => UserRole::READER->value,
            ]);

        $response->assertStatus(403);
    }

    /**
     * Teste de atualização de usuário (Admin e Moderador podem)
     */
    public function test_moderator_can_update_user(): void
    {
        $moderator = User::factory()->create(['role' => UserRole::MODERATOR]);
        $targetUser = User::factory()->create(['name' => 'Old Name']);

        $response = $this->actingAs($moderator, 'sanctum')
            ->putJson("/api/v1/users/{$targetUser->id}", [
                'name' => 'Updated Name',
                'email' => $targetUser->email,
                'role' => UserRole::READER->value,
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Usuário atualizado com sucesso.',
                'data' => [
                    'name' => 'Updated Name',
                ],
            ]);

        $this->assertDatabaseHas('users', [
            'id' => $targetUser->id,
            'name' => 'Updated Name',
        ]);
    }

    /**
     * Teste de atualização por Leitor (não pode)
     */
    public function test_reader_cannot_update_user(): void
    {
        $reader = User::factory()->create(['role' => UserRole::READER]);
        $targetUser = User::factory()->create();

        $response = $this->actingAs($reader, 'sanctum')
            ->putJson("/api/v1/users/{$targetUser->id}", [
                'name' => 'Updated Name',
                'email' => $targetUser->email,
                'role' => UserRole::READER->value,
            ]);

        $response->assertStatus(403);
    }

    /**
     * Teste de exclusão de usuário (apenas Admin)
     */
    public function test_admin_can_delete_user(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $targetUser = User::factory()->create();

        $response = $this->actingAs($admin, 'sanctum')
            ->deleteJson("/api/v1/users/{$targetUser->id}");

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Usuário excluído com sucesso.',
            ]);

        $this->assertDatabaseMissing('users', [
            'id' => $targetUser->id,
        ]);
    }

    /**
     * Teste de exclusão por Moderador (não pode)
     */
    public function test_moderator_cannot_delete_user(): void
    {
        $moderator = User::factory()->create(['role' => UserRole::MODERATOR]);
        $targetUser = User::factory()->create();

        $response = $this->actingAs($moderator, 'sanctum')
            ->deleteJson("/api/v1/users/{$targetUser->id}");

        $response->assertStatus(403);
    }

    /**
     * Teste de usuário não pode excluir a si mesmo
     */
    public function test_user_cannot_delete_themselves(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);

        $response = $this->actingAs($admin, 'sanctum')
            ->deleteJson("/api/v1/users/{$admin->id}");

        $response->assertStatus(403)
            ->assertJson([
                'message' => 'Você não pode excluir sua própria conta.',
            ]);
    }

    /**
     * Teste de validação ao criar usuário
     */
    public function test_create_user_validates_required_fields(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);

        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/v1/users', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'password', 'role']);
    }

    /**
     * Teste de email único
     */
    public function test_create_user_with_duplicate_email_fails(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $existingUser = User::factory()->create(['email' => 'existing@example.com']);

        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/v1/users', [
                'name' => 'New User',
                'email' => 'existing@example.com',
                'password' => 'password123',
                'role' => UserRole::READER->value,
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }
}
