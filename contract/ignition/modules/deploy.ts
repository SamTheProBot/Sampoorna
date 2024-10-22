import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("manager", (m) => {
  const contract = m.contract("Manager", []);
  const ethAmount = BigInt(1e20);

  m.call(contract, "AddValidAccount", ['0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'], {id:'ValidAccount1'});
  m.call(contract, "AddValidAccount", ['0xdD2FD4581271e230360230F9337D5c0430Bf44C0'], {id:'ValidAccount2'});
  m.call(contract, "AddValidAccount", ['0xbDA5747bFD65F08deb54cb465eB87D40e51B197E'], {id:'ValidAccount3'});

  m.call(contract, "AddBalance", [], { value: ethAmount});

  return { contract };
});
