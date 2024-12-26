const Rastreamento = artifacts.require("RastreamentoFarmaceutico");

module.exports = function (deployer) {
  deployer.deploy(Rastreamento);
};
