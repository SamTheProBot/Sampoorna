// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

error NotEnoughFunds(); 

contract Manager {
    struct User {
        address Addr;
        bool Provident_Fund;
        bool Fixed_Deposit;
        bool Health_Insurance;
    }

    uint256 public constant QUOTA_AMOUNT = 1 * 1e16;
    uint256 private constant INITIAL_AMOUNT = 1 * 1e15;
    uint256 private constant MIN_DONATION_VAL = 1 * 1e16; 

    address private immutable i_owner;
    address[] public UserArray;
    address[] public Funders;

    mapping(address => User) private UserMapping;    
    mapping(address => uint256) public Funders_Contribution;

    event e_Reciver(address indexed user);
    event e_FunderLog(address indexed funder, uint256 amount);

    constructor(){
        i_owner = msg.sender;
    }
    
    function AddUser() external initialFund {
       // add user
        UserMapping[msg.sender] = User({
            Addr: msg.sender,
            Provident_Fund: false,
            Fixed_Deposit: false,
            Health_Insurance: false
        });
        UserArray.push(msg.sender);
    }

    function Apply_Provident_Fund() public{
        require(UserMapping[msg.sender].Provident_Fund == false, "provident fund already approved");
        UserMapping[msg.sender].Provident_Fund = true;
    }
    
    function Apply_Fixed_Deposit() public{
        require(UserMapping[msg.sender].Fixed_Deposit == false, "fixed fund already approved");
        UserMapping[msg.sender].Fixed_Deposit = true;
    }
    
    function Apply_Health_Insurance() public{
        require(UserMapping[msg.sender].Health_Insurance == false, "insurence already approved");
        UserMapping[msg.sender].Health_Insurance = true;
    }

    function Check_Provident_Fund() public view returns(bool){
        return UserMapping[msg.sender].Provident_Fund;
    }
    
    function Check_Fixed_Deposit() public view returns(bool){
        return UserMapping[msg.sender].Fixed_Deposit;
    }
    
    function Check_Health_Insurance() public view returns(bool){
       return UserMapping[msg.sender].Health_Insurance;
    }
    
    function Cancel_Provident_Fund() public{
        require(UserMapping[msg.sender].Provident_Fund == true, "approve first to cancel");
        UserMapping[msg.sender].Provident_Fund = false;
    }
    
    function Cancel_Fixed_Deposit() public{
        require(UserMapping[msg.sender].Fixed_Deposit == true, "approve first to cancel");
        UserMapping[msg.sender].Fixed_Deposit = false;
    }
    
    function Cancel_Health_Insurance() public{
        require(UserMapping[msg.sender].Health_Insurance == true, "approve first to cancel");
        UserMapping[msg.sender].Health_Insurance = false;
    }

    
    function AddBalance() external payable onlyOwner {
        // add balance to contract as Goverment
        require(msg.value > 0,"add more than 0 sir");
    }

    function FundRaise() external payable {
        // to recive the donations from the doner
        require(msg.value > MIN_DONATION_VAL, "donation under funded");
        Funders_Contribution[msg.sender] += msg.value;
        Funders.push(msg.sender);
        emit e_FunderLog(msg.sender, msg.value);
    }

    function Distribute() external payable {
        // distribute funds among public
        // can be automated using chainlink
        require(address(this).balance >= UserArray.length * QUOTA_AMOUNT, "not enought fund to distribute le popat");

        for (uint i = 0; i < UserArray.length; i++) {
            address userAdd = UserArray[i];
            payable(userAdd).transfer(QUOTA_AMOUNT);
            emit e_Reciver(userAdd);
        }
    }
   
    function WithDrawl() external payable onlyOwner{
        // to withdrawl all the ETH in the end of hackthon
        payable(msg.sender).transfer(address(this).balance);
    }

    modifier initialFund(){
        // provide initail funds to user
        require(UserMapping[msg.sender].Provident_Fund == false &&
                UserMapping[msg.sender].Fixed_Deposit == false &&
                UserMapping[msg.sender].Health_Insurance == false, "user already exist");
        require(address(this).balance >= INITIAL_AMOUNT, "not enought funds");
        payable(msg.sender).transfer(INITIAL_AMOUNT);
    _;
    }

    modifier onlyOwner(){
    require(msg.sender == i_owner, "you are Not the owner sir!");        
    _;       
    }
}
