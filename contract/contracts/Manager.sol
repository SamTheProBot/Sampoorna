// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

error NotEnoughFunds();

contract Manager {

    enum STATUS {
        ACTIVE,
        CLAMED,
        NONE
    }

    struct User {
        address Addr;
        STATUS Provident_Fund;
        STATUS Fixed_Deposit;
        STATUS Health_Insurance;
        uint256 Fixed_Deposit_Timestamp;
        uint256 Provident_Fund_Timestamp;
    }

    uint256 public QUOTA_AMOUNT = 1 * 1e16;
    uint256 private constant INITIAL_AMOUNT = 1 * 1e15;
    uint256 private constant MIN_DONATION_VAL = 1 * 1e16;
    uint256 private constant PROVIDENT_FUND_REEDEAM_AGE = 60;

    uint256 private constant PROVIDENT_FUND_DEDUCTION = 2.5 * 1e15;
    uint256 private constant FIXED_DEPOSIT_DEDUCTION = 2.5 * 1e15;
    uint256 private constant HEALTH_INSURANCE_DEDUCTION = 4 * 1e15;

    uint256 private constant ONE_YEAR = 60*60*24*365;
    uint256 private constant FIVE_YEAR = ONE_YEAR * 5;

    address private immutable i_owner;
    address[] public UserArray;
    address[] public Funders;

    mapping(address => User) private UserMapping;
    mapping(address => uint256) public Funders_Contribution;

    event e_Reciver(address indexed user, uint256 amount);
    event e_Service(address indexed user, string service, uint256 amount);
    event e_FunderLog(address indexed funder, uint256 amount);

    constructor() {
        i_owner = msg.sender;
    }

      function AddUser(address user) external onlyOwner initialFund(user) {
        UserMapping[user] = User({
            Addr: user,
            Provident_Fund: STATUS.NONE,
            Fixed_Deposit: STATUS.NONE,
            Health_Insurance: STATUS.NONE,
            Fixed_Deposit_Timestamp: 0,
            Provident_Fund_Timestamp: 0
        });
        UserArray.push(user);
    }

    function Apply_Provident_Fund() public {
        User storage UserInfo = UserMapping[msg.sender];
        if(UserInfo.Provident_Fund == STATUS.ACTIVE){
            revert("provident fund already approved");
            }
        else if(UserInfo.Provident_Fund == STATUS.CLAMED){
            revert("funds had been clamed already");
        }
        
        UserInfo.Provident_Fund = STATUS.ACTIVE;
        UserInfo.Provident_Fund_Timestamp = block.timestamp;
        emit e_Service(msg.sender, "provident_fund", PROVIDENT_FUND_DEDUCTION);
    }

    function Apply_Fixed_Deposit() public {
        User storage UserInfo  = UserMapping[msg.sender];
        if(UserInfo.Fixed_Deposit == STATUS.ACTIVE){
            revert("fixed deposit fund already approved");
            }
        else if(UserInfo.Fixed_Deposit == STATUS.CLAMED){
            revert("funds had been clamed already");
        }
        UserInfo.Fixed_Deposit = STATUS.ACTIVE;
        UserInfo.Fixed_Deposit_Timestamp = block.timestamp;
        emit e_Service(msg.sender, "fixed_deposit", FIXED_DEPOSIT_DEDUCTION);
    }

    function Apply_Health_Insurance() public {
        User storage UserInfo  = UserMapping[msg.sender];
        if(UserInfo.Health_Insurance == STATUS.ACTIVE){
            revert("insurance already approved");
            }
        else if(UserInfo.Health_Insurance == STATUS.CLAMED){
            revert("insurance had been clamed already");
        }
        UserInfo.Health_Insurance = STATUS.ACTIVE;
        emit e_Service(
            msg.sender,
            "health_insurence",
            HEALTH_INSURANCE_DEDUCTION
        );
    }

    // clame functions
    function Clame_Health_Insurance() external{
        require(
            UserMapping[msg.sender].Health_Insurance == STATUS.ACTIVE,
            "already been clamed or have't applide yet"
        );
        UserMapping[msg.sender].Health_Insurance = STATUS.CLAMED;
    }

    function Clame_Fixed_Deposit() external {
        User storage UserInfo = UserMapping[msg.sender];
        if(UserInfo.Fixed_Deposit == STATUS.NONE){
            revert("approve first to clame");
            }
        else if(UserInfo.Fixed_Deposit == STATUS.CLAMED){
            revert("fixed fund had been clamed already");
        }
        require(block.timestamp >= UserInfo.Fixed_Deposit_Timestamp + FIVE_YEAR, "Fixed deposit hasn't matured yet");
        UserInfo.Fixed_Deposit = STATUS.CLAMED;
    }

    function Clame_Provident_Fund() external {
        User storage UserInfo = UserMapping[msg.sender];
        if(UserInfo.Provident_Fund == STATUS.NONE){
            revert("approve first to clame");
            }
        else if(UserInfo.Provident_Fund == STATUS.CLAMED){
            revert("funds had been clamed already");
        }
        require(block.timestamp >= UserInfo.Provident_Fund_Timestamp + ONE_YEAR, "Provident fund hasn't matured yet");
        UserInfo.Provident_Fund = STATUS.CLAMED;
    }


    // cancel function
    function Cancel_Provident_Fund() external {
        require(
            UserMapping[msg.sender].Provident_Fund == STATUS.ACTIVE,
            "approve first to cancel"
        );
        User storage UserInfo  = UserMapping[msg.sender];
        UserInfo.Provident_Fund = STATUS.NONE;
        UserInfo.Provident_Fund_Timestamp = 0;
        emit e_Service(msg.sender, "cancel_provident_fund", 0);
    }

    function Cancel_Fixed_Deposit() external {
        require(
            UserMapping[msg.sender].Fixed_Deposit ==  STATUS.ACTIVE,
            "approve first to cancel"
        );
        User storage UserInfo  = UserMapping[msg.sender];
        UserInfo.Fixed_Deposit = STATUS.NONE;
        UserInfo.Fixed_Deposit_Timestamp = 0;
        emit e_Service(msg.sender, "cancel_fixed_deposit", 0);
    }

    // fund realated functions
    function AddBalance() external payable onlyOwner {
        require(msg.value > 0, "add more than 0 sir");
    }

    function ChangeQuota(uint256 NEW_QUOTA_FRACTION) public onlyOwner {
        uint256 NEW_QUOTA = NEW_QUOTA_FRACTION * 1e15;
        require(NEW_QUOTA > 0, "it must be grater than 0");
        QUOTA_AMOUNT = NEW_QUOTA;
    }

    function FundRaise() external payable {
        require(msg.value > MIN_DONATION_VAL, "donation under funded");
        Funders_Contribution[msg.sender] += msg.value;
        if (Funders_Contribution[msg.sender] == msg.value) {
            Funders.push(msg.sender);
        }
        emit e_FunderLog(msg.sender, msg.value);
    }

    function CalculateQuotaDeduction(
        address user
    ) private view returns (uint256) {
        uint256 amount = 0;
        if (UserMapping[user].Provident_Fund == STATUS.ACTIVE) {
            amount += PROVIDENT_FUND_DEDUCTION;
        }
        if (UserMapping[user].Fixed_Deposit == STATUS.ACTIVE) {
            amount += FIXED_DEPOSIT_DEDUCTION;
        }
        if (UserMapping[user].Health_Insurance == STATUS.ACTIVE) {
            amount += HEALTH_INSURANCE_DEDUCTION;
        }

        return amount;
    }

    function GetRemainingQuota(address user) private view returns (uint256) {
        uint256 totalAmount = CalculateQuotaDeduction(user);
        if (totalAmount >= QUOTA_AMOUNT) {
            return 0;
        }
        return QUOTA_AMOUNT - totalAmount;
    }

    function Distribute() external payable {
        require(
            address(this).balance >= UserArray.length * QUOTA_AMOUNT,
            "not enought fund to distribute le popat"
        );
        for (uint i = 0; i < UserArray.length; i++) {
            address userAdd = UserArray[i];
            uint256 remaingAmount = GetRemainingQuota(userAdd);

            (bool success, ) = payable(userAdd).call{value: remaingAmount}("");
            require(success, "Transfer failed");
            emit e_Reciver(userAdd, QUOTA_AMOUNT);
        }
    }

    function WithDrawl() external payable onlyOwner {
        require(address(this).balance > 0, "nothing to withdraw");
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success, "Withdrawal failed");
    }

    // view functions
    function Check_Status(address user) external view returns (STATUS, STATUS, STATUS) {
        User memory userInfo = UserMapping[user];
        return (userInfo.Provident_Fund, userInfo.Fixed_Deposit, userInfo.Health_Insurance);
    }

    function QUOTA_Status() external view returns(uint256){
        return QUOTA_AMOUNT;
    }


    // modifires
    modifier initialFund(address user) {
        require(
            UserMapping[user].Addr != user,
            "user already exist"
        );
        require(address(this).balance >= INITIAL_AMOUNT, "not enought funds");
        (bool success, ) = payable(user).call{value: INITIAL_AMOUNT}("");
        require(success, "Initial fund transfer failed");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == i_owner, "you are Not the owner sir!");
        _;
    }
}
