import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("manager", (m) => {
  const apollo = m.contract("Manager", []);

  return { apollo };
});
