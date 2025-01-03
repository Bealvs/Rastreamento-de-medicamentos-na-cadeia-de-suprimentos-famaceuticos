
# Exemplo de Interação com o Contrato `HelloWorld` no Truffle Console

Este guia mostra como interagir com o contrato `HelloWorld` no Truffle Console após a implantação do contrato.

### Passo 1: Acessar o Truffle Console

Primeiro, abra o terminal e entre no **Truffle Console** com a rede de desenvolvimento:

```bash
truffle console --network development
```

Após isso, você verá a linha de comando do Truffle:

```bash
undefined
truffle(development)>
```

### Passo 2: Obter a instância do contrato implantado

Dentro do Truffle Console, obtenha a instância do contrato `HelloWorld` implantado:

```javascript
const instance = await HelloWorld.deployed();
```

Isso fará com que o Truffle busque a instância do contrato que foi implantado na rede local.

### Passo 3: Obter a mensagem atual

Agora, você pode chamar o método `getMessage` para obter a mensagem armazenada no contrato:

```javascript
const message = await instance.getMessage();
console.log("Mensagem atual:", message);
```

A mensagem inicial será `Hello World !`, conforme o valor definido no contrato.

### Passo 4: Alterar a mensagem

Para atualizar a mensagem, use o método `setMessage`:

```javascript
await instance.setMessage("Nova mensagem");
console.log("Mensagem foi atualizada!");
```

### Passo 5: Obter a nova mensagem

Após a atualização, você pode chamar novamente o método `getMessage` para verificar a mensagem atualizada:

```javascript
const updatedMessage = await instance.getMessage();
console.log("Mensagem atualizada:", updatedMessage);
```

Agora, o Truffle deve mostrar a nova mensagem definida:

```bash
Mensagem atualizada: Nova mensagem
```

### Exemplo Completo

Aqui está o fluxo completo de comandos dentro do Truffle Console:

```bash
PS C:\Users\ferra\Downloads\github\Rastreamento-de-medicamentos-na-cadeia-de-suprimentos-famaceuticos\blockchain> truffle console --network development
undefined
truffle(development)> const instance = await HelloWorld.deployed();
truffle(development)> const message = await instance.getMessage();
truffle(development)> console.log("Mensagem atual:", message);
Mensagem atual: Hello World !
truffle(development)> await instance.setMessage("Nova mensagem");
Mensagem foi atualizada!
truffle(development)> const updatedMessage = await instance.getMessage();
truffle(development)> console.log("Mensagem atualizada:", updatedMessage);
Mensagem atualizada: Nova mensagem
```
