<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserPolicyTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Teste de viewAny (todos podem listar)
     */
    public function test_all_users_can_view_any(): void
    {
        $reader = User::factory()->create(['role' => UserRole::READER]);
        $moderator = User::factory()->create(['role' => UserRole::MODERATOR]);
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);

        $this->assertTrue($reader->can('viewAny', User::class));
        $this->assertTrue($moderator->can('viewAny', User::class));
        $this->assertTrue($admin->can('viewAny', User::class));
    }

    /**
     * Teste de view (todos podem visualizar)
     */
    public function test_all_users_can_view(): void
    {
        $reader = User::factory()->create(['role' => UserRole::READER]);
        $moderator = User::factory()->create(['role' => UserRole::MODERATOR]);
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $targetUser = User::factory()->create();

        $this->assertTrue($reader->can('view', $targetUser));
        $this->assertTrue($moderator->can('view', $targetUser));
        $this->assertTrue($admin->can('view', $targetUser));
    }

    /**
     * Teste de create (apenas Admin)
     */
    public function test_only_admin_can_create(): void
    {
        $reader = User::factory()->create(['role' => UserRole::READER]);
        $moderator = User::factory()->create(['role' => UserRole::MODERATOR]);
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);

        $this->assertFalse($reader->can('create', User::class));
        $this->assertFalse($moderator->can('create', User::class));
        $this->assertTrue($admin->can('create', User::class));
    }

    /**
     * Teste de update (Admin e Moderador)
     */
    public function test_admin_and_moderator_can_update(): void
    {
        $reader = User::factory()->create(['role' => UserRole::READER]);
        $moderator = User::factory()->create(['role' => UserRole::MODERATOR]);
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $targetUser = User::factory()->create();

        $this->assertFalse($reader->can('update', $targetUser));
        $this->assertTrue($moderator->can('update', $targetUser));
        $this->assertTrue($admin->can('update', $targetUser));
    }

    /**
     * Teste de delete (apenas Admin)
     */
    public function test_only_admin_can_delete(): void
    {
        $reader = User::factory()->create(['role' => UserRole::READER]);
        $moderator = User::factory()->create(['role' => UserRole::MODERATOR]);
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $targetUser = User::factory()->create();

        $this->assertFalse($reader->can('delete', $targetUser));
        $this->assertFalse($moderator->can('delete', $targetUser));
        $this->assertTrue($admin->can('delete', $targetUser));
    }

    /**
     * Teste de múltiplas autorizações simultâneas
     */
    public function test_admin_has_all_permissions(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $targetUser = User::factory()->create();

        $this->assertTrue($admin->can('viewAny', User::class));
        $this->assertTrue($admin->can('view', $targetUser));
        $this->assertTrue($admin->can('create', User::class));
        $this->assertTrue($admin->can('update', $targetUser));
        $this->assertTrue($admin->can('delete', $targetUser));
    }

    /**
     * Teste de reader com permissões limitadas
     */
    public function test_reader_has_limited_permissions(): void
    {
        $reader = User::factory()->create(['role' => UserRole::READER]);
        $targetUser = User::factory()->create();

        $this->assertTrue($reader->can('viewAny', User::class));
        $this->assertTrue($reader->can('view', $targetUser));
        $this->assertFalse($reader->can('create', User::class));
        $this->assertFalse($reader->can('update', $targetUser));
        $this->assertFalse($reader->can('delete', $targetUser));
    }

    /**
     * Teste de moderador com permissões intermediárias
     */
    public function test_moderator_has_intermediate_permissions(): void
    {
        $moderator = User::factory()->create(['role' => UserRole::MODERATOR]);
        $targetUser = User::factory()->create();

        $this->assertTrue($moderator->can('viewAny', User::class));
        $this->assertTrue($moderator->can('view', $targetUser));
        $this->assertFalse($moderator->can('create', User::class));
        $this->assertTrue($moderator->can('update', $targetUser));
        $this->assertFalse($moderator->can('delete', $targetUser));
    }
}
