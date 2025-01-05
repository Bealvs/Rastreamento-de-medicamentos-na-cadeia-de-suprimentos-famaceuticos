import { helloWorldContractInstance, web3 } from "../config/blockchain.js";

class HelloWorldController {
  async getMessage(req, res) {
    try {
      const message = await helloWorldcontractInstance.methods.getMessage().call();
      res.json({ message });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao obter a mensagem do contrato");
    }
  }

  async setMessage(req, res) {
    const { newMessage } = req.body;

    try {
      const accounts = await web3.eth.getAccounts();
      await helloWorldcontractInstance.methods
        .setMessage(newMessage)
        .send({ from: accounts[0] });
      res.send("Mensagem atualizada com sucesso");
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao atualizar a mensagem no contrato");
    }
  }
}

// Exporta uma única instância da classe
export default new HelloWorldController();
