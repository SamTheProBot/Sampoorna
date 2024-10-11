export interface FakeLogsProp {
  eventType: string;
  from: string;
  fromName: string,
  transction_hash: string;
  to: string;
  toName: string;
  amount: number;
}

export const FakeLogs = [
  {
    eventType: 'cancel_provident_fund',
    from: '0x8f6A7F9A5A7aC1F5124cBC74723F4D3D4D56FF87',
    fromName: 'Alice Johnson',
    transction_hash: '3f46fbdb5958fc5e277c364eb8229faf',
    to: '0x2Ff5C96a0B9C3E365fD8A91DA8EFdC3729dC474B',
    toName: 'Bob Smith',
    amount: 40.71,
  },
  {
    eventType: 'cancel_health_insurence',
    from: '0x5C688d4C597D3F683D782B9C9AE6A9D5015A99D8',
    fromName: 'Emily Davis',
    transction_hash: '61c74dd8a7d849d55c221ea62ce21ed4',
    to: '0x1A2bE3FddA5a71E68a2AB054E450A8F2dD0C2B58',
    toName: 'Michael Brown',
    amount: 632.7,
  },
  {
    eventType: 'cancel_health_insurence',
    from: '0xA82B3D60E08d1D49c5D8D5fEFB44AEE2a2C24C72',
    fromName: 'Sarah Wilson',
    transction_hash: '26fec9042279300174e544157832451e',
    to: '0x7B6C8D1A14eFE6AFCc7318D0FF5C3E14F23c9079',
    toName: 'David Lee',
    amount: 367.37,
  },
  {
    eventType: 'provident_fund',
    from: '0x0B66B58E878D8A52D827DE257C161dE949CD1D5B',
    fromName: 'Jessica Taylor',
    transction_hash: '691b31fd7876c867224e584574d585ee',
    to: '0x3A2952A4A5aD9F1bD451F7983f36B42A2E4D9A4B',
    toName: 'James White',
    amount: 311.34,
  },
  {
    eventType: 'cancel_provident_fund',
    from: '0xE92C68B4D660FD2A24A8D10F7E5D1B3D5ED9139F',
    fromName: 'Nancy Harris',
    transction_hash: '9658ff2c9b4109c2b2202d347ca2bbf8',
    to: '0xC0B50F07A57D13F8E79D07E1C7C7DAB4A5DA7F67',
    toName: 'Robert Clark',
    amount: 608.15,
  },
  {
    eventType: 'fixed_deposit',
    from: '0xEF38D47C5A53D4CFC2B493DB83B1F8589C3FAE04',
    fromName: 'Laura Lewis',
    transction_hash: 'ebaee5d53b958a117d498445dd537205',
    to: '0x8AEE69D1B4B91E3F17B716EBB084B47D1B8E9D09',
    toName: 'Daniel Walker',
    amount: 253.87,
  },
  {
    eventType: 'fixed_deposit',
    from: '0xB74DA81E2E09B9E1C28D76E5D23B6D3B47F4E264',
    fromName: 'Matthew Hall',
    transction_hash: '9605449a26947e0ba184b1c83d494306',
    to: '0x52C6D1AEF9464A1FBC2339D7D4B0073B0A6F67E5',
    toName: 'Sophia Allen',
    amount: 834.08,
  },
  {
    eventType: 'cancel_fixed_deposit',
    from: '0xBAFDA1E1D005D2E2FA6C7CDAE4F2E44D3D4BEE9C',
    fromName: 'Kevin Young',
    transction_hash: '92fcd9f7ed699374aa97e8c5cb8ae5ca',
    to: '0xD2E9FAE97D0630B8DAEDD8C17E7D1A646E942FF9',
    toName: 'Ella Scott',
    amount: 809.23,
  },
  {
    eventType: 'donation',
    from: '0x4F2546F64C3EFA6B61C03E32B28C79C38880A6AB',
    fromName: 'Thomas Carter',
    transction_hash: '7f70d39dde83548edfb766218d6a78aa',
    to: '0xCD09A9A30DFA02D3824B6EACEDD5CC0D6E62D4D5',
    toName: 'Ava Mitchell',
    amount: 869.26,
  },
  {
    eventType: 'fixed_deposit',
    from: '0xAF29C9AAB6C5E892B484B29F5CC0EFA9651C8E54',
    fromName: 'Mia Perez',
    transction_hash: 'a53a6c345de4b5c18386defd8a2c60d2',
    to: '0x4621D7C1F5E4B1B4897C8D50A0C3E7F2C4F3BBDC',
    toName: 'Zoe Roberts',
    amount: 170.36,
  },
  {
    eventType: 'cancel_health_insurence',
    from: '0xB17F54E4703F9E30D1C77CC9D7D8CC2A3E8DB2A1',
    fromName: 'Liam King',
    transction_hash: '7a47595ee6bfa34f90a2a678b0e1e542',
    to: '0xF69A0BDA634DFA04C6A83168868D5BB8C5737C1A',
    toName: 'Grace Evans',
    amount: 366.86,
  },
  {
    eventType: 'fixed_deposit',
    from: '0xC7A35B2D7C6579E2C4C1BB9E41B6E051AC0E8E66',
    fromName: 'Jackson Carter',
    transction_hash: '9757258d2af4d9bbd324fdd921d01bcf',
    to: '0x34E2B3E0FBE0E5F8C2B5E57C6C4C18F0B74D0B30',
    toName: 'Lily James',
    amount: 352.09,
  }
];
