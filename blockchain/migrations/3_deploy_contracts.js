const MedicationTracking = artifacts.require("MedicationTracking");

module.exports = function (deployer) {
  deployer.deploy(MedicationTracking);
};
