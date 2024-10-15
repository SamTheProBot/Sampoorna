import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("manager", (m) => {
  const contract = m.contract("Manager", []);
  const ethAmount = BigInt(1e19);

  m.call(contract, "AddBalance", [], { value: ethAmount});

  return { contract };
});
