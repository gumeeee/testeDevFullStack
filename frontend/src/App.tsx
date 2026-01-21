import { Button, Input, Card } from "./components/ui";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="max-w-md w-full mx-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          testeDevFullStack
        </h1>
        <p className="text-gray-600 text-center mb-6">
          React + Laravel + SQLite
        </p>
        <div className="space-y-3">
          <Input label="Email" type="email" placeholder="Digite seu email" />
          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            error="Exemplo de erro"
          />
          <Button variant="primary" className="w-full">
            Botão Primário
          </Button>
          <Button variant="secondary" className="w-full">
            Botão Secundário
          </Button>
          <Button variant="primary" className="w-full" isLoading>
            Carregando
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default App;
