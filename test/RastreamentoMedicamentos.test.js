const RastreamentoMedicamentos = artifacts.require("RastreamentoMedicamentos");

contract("RastreamentoMedicamentos", accounts => {
  let rastreamentoInstance;
  const owner = accounts[0];
  const admin = accounts[1];
  const adminData = {
    nomeCompleto: "Administrador Teste",
    cpf: "12345678901",
    cnpj: "12345678000195",
    email: "admin@test.com",
    senhaHash: "senha123"
  };

  beforeEach(async () => {
    rastreamentoInstance = await RastreamentoMedicamentos.new({ from: owner });
  });

  it("Deve permitir o cadastro de administradores pelo proprietário", async () => {
    await rastreamentoInstance.cadastrarAdministrador(admin, adminData.nomeCompleto, adminData.cpf, adminData.cnpj, adminData.email, adminData.senhaHash, { from: owner });
    const adminCadastrado = await rastreamentoInstance.administradores(admin);
    assert.equal(adminCadastrado.nomeCompleto, adminData.nomeCompleto, "Administrador não foi cadastrado corretamente");
  });

  it("Deve impedir o cadastro de administrador por não proprietário", async () => {
    try {
      await rastreamentoInstance.cadastrarAdministrador(admin, adminData.nomeCompleto, adminData.cpf, adminData.cnpj, adminData.email, adminData.senhaHash, { from: accounts[2] });
      assert.fail("Esperava-se que a ação falhasse");
    } catch (error) {
      assert.include(error.message, "Apenas o proprietario pode executar esta acao", "Erro esperado não foi lançado");
    }
  });

  it("Deve permitir o cadastro de medicamento por administrador", async () => {
    // Cadastra e ativa o administrador
    await rastreamentoInstance.cadastrarAdministrador(admin, adminData.nomeCompleto, adminData.cpf, adminData.cnpj, adminData.email, adminData.senhaHash, { from: owner });
    await rastreamentoInstance.ativarAdministrador(admin, { from: owner });

    const medicamentoData = {
      nomeComercial: "Medicamento Teste",
      nomeGenerico: "Genérico Teste",
      caracteristicas: "Características do medicamento",
      codigoProduto: "ABC123",
      lote: "Lote123",
      dataFabricacao: 1622556400, // Exemplo de timestamp
      dataValidade: 1704051200,   // Exemplo de timestamp
      nomeFabricante: "Fabricante Teste",
      nomeComercialFabricante: "Fabricante Comercial Teste",
      cnpjFabricante: "12345678000195"
    };
    
    // Cadastro do medicamento com o administrador ativo
    await rastreamentoInstance.cadastrarMedicamento(
      medicamentoData.nomeComercial,
      medicamentoData.nomeGenerico,
      medicamentoData.caracteristicas,
      medicamentoData.codigoProduto,
      medicamentoData.lote,
      medicamentoData.dataFabricacao,
      medicamentoData.dataValidade,
      medicamentoData.nomeFabricante,
      medicamentoData.nomeComercialFabricante,
      medicamentoData.cnpjFabricante,
      { from: admin }
    );

    // Verificando se o medicamento foi corretamente cadastrado
    const medicamento = await rastreamentoInstance.medicamentos(medicamentoData.codigoProduto);
    assert.equal(medicamento.nomeComercial, medicamentoData.nomeComercial, "Medicamento não foi cadastrado corretamente");
  });

  it("Deve permitir a atualização do rastreamento", async () => {
    // Cadastra e ativa o administrador
    await rastreamentoInstance.cadastrarAdministrador(admin, adminData.nomeCompleto, adminData.cpf, adminData.cnpj, adminData.email, adminData.senhaHash, { from: owner });
    await rastreamentoInstance.ativarAdministrador(admin, { from: owner });

    const rastreamentoData = {
      codigoRastreamento: "R123456",
      localizacaoAtual: "Localização inicial",
      pontoDestino: "Destino final",
      status: "Postado"
    };
    
    // Atualiza o rastreamento com o administrador ativo
    await rastreamentoInstance.atualizarRastreamento(
      rastreamentoData.codigoRastreamento,
      rastreamentoData.localizacaoAtual,
      rastreamentoData.pontoDestino,
      rastreamentoData.status,
      { from: admin }
    );

    const rastreamento = await rastreamentoInstance.rastreamentos(rastreamentoData.codigoRastreamento);
    assert.equal(rastreamento.localizacaoAtual, rastreamentoData.localizacaoAtual, "Localização não foi atualizada corretamente");
    assert.equal(rastreamento.status, rastreamentoData.status, "Status não foi atualizado corretamente");
  });

  it("Deve permitir consultar o rastreamento", async () => {
    // Cadastra e ativa o administrador
    await rastreamentoInstance.cadastrarAdministrador(admin, adminData.nomeCompleto, adminData.cpf, adminData.cnpj, adminData.email, adminData.senhaHash, { from: owner });
    await rastreamentoInstance.ativarAdministrador(admin, { from: owner });

    const rastreamentoData = {
      codigoRastreamento: "R123456",
      localizacaoAtual: "Localização inicial",
      pontoDestino: "Destino final",
      status: "Postado"
    };

    // Atualiza o rastreamento com o administrador ativo
    await rastreamentoInstance.atualizarRastreamento(
      rastreamentoData.codigoRastreamento,
      rastreamentoData.localizacaoAtual,
      rastreamentoData.pontoDestino,
      rastreamentoData.status,
      { from: admin }
    );

    // Consultando o rastreamento
    const rastreamento = await rastreamentoInstance.consultarRastreamento(rastreamentoData.codigoRastreamento);
    assert.equal(rastreamento.localizacaoAtual, rastreamentoData.localizacaoAtual, "Localização do rastreamento não corresponde");
    assert.equal(rastreamento.status, rastreamentoData.status, "Status do rastreamento não corresponde");
  });
});
