const RastreamentoMedicamentos = artifacts.require("RastreamentoMedicamentos");

module.exports = function (deployer) {
  deployer.deploy(RastreamentoMedicamentos);
};
