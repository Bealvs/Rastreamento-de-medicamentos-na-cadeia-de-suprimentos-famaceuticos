const Rastreamento = artifacts.require("Rastreamento");

contract("RastreamentoFarmaceutico", (accounts) => {
  let contrato;

  before(async () => {
    contrato = await Rastreamento.deployed();
  });

  it("deve criar um suprimento", async () => {
    await contrato.criarSuprimento("Medicamento X", "Farmacêutica ABC");
    const suprimento = await contrato.obterSuprimento(1);
    assert.equal(suprimento.nome, "Medicamento X");
    assert.equal(suprimento.fabricante, "Farmacêutica ABC");
  });

  it("deve atualizar o status do suprimento", async () => {
    await contrato.atualizarStatus(1, "Entregue");
    const suprimento = await contrato.obterSuprimento(1);
    assert.equal(suprimento.status, "Entregue");
  });
});
