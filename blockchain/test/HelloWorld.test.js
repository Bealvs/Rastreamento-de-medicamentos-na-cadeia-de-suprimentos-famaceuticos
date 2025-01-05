const HelloWorld = artifacts.require("HelloWorld");

contract("HelloWorld", (accounts) => {
  let helloWorld;

  // Executa antes de cada teste
  beforeEach(async () => {
    helloWorld = await HelloWorld.new();
  });

  // Teste para verificar o valor inicial da mensagem
  it("should return the initial message", async () => {
    const message = await helloWorld.getMessage();
    assert.equal(
      message,
      "Hello World !",
      "The initial message is not correct"
    );
  });

  // Teste para verificar a atualização da mensagem
  it("should update the message", async () => {
    const newMessage = "New Hello World!";

    // Listen for the event
    const result = await helloWorld.setMessage(newMessage);

    // Verifica se a mensagem foi atualizada
    const updatedMessage = await helloWorld.getMessage();
    assert.equal(
      updatedMessage,
      newMessage,
      "The message was not updated correctly"
    );

    // Verifica se o evento foi emitido
    const event = result.logs[0];
    assert.equal(event.event, "MessageUpdate", "The event was not emitted");
    assert.equal(
      event.args.oldMessage,
      "Hello World !",
      "The old message in the event is incorrect"
    );
    assert.equal(
      event.args.newMessage,
      newMessage,
      "The new message in the event is incorrect"
    );
  });
});
