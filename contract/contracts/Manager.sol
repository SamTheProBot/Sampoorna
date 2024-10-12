// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

error NotEnoughFunds();

contract Manager {
    enum Fixed_Deposit_Term {
        LONG,
        MID,
        SHORT,
        NONE
    }
    enum Health_Insurance_Term {
        ACTIVE,
        DEDUCED,
        NONE
    }

    struct User {
        address Addr;
        bool Provident_Fund;
        Fixed_Deposit_Term Fixed_Deposit;
        Health_Insurance_Term Health_Insurance;
    }

    uint256 public QUOTA_AMOUNT = 1 * 1e16;
    uint256 private constant INITIAL_AMOUNT = 1 * 1e15;
    uint256 private constant MIN_DONATION_VAL = 1 * 1e16;

    uint256 private constant PROVIDENT_FUND_DEDUCTION = 2.5 * 1e15;
    uint256 private constant FIXED_DEPOSIT_DEDUCTION = 2.5 * 1e15;
    uint256 private constant HEALTH_INSURANCE_DEDUCTION = 4 * 1e15;

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

    function AddUser() external initialFund {
        UserMapping[msg.sender] = User({
            Addr: msg.sender,
            Provident_Fund: false,
            Fixed_Deposit: Fixed_Deposit_Term.NONE,
            Health_Insurance: Health_Insurance_Term.NONE
        });
        UserArray.push(msg.sender);
    }

    function Apply_Provident_Fund() public {
        require(
            UserMapping[msg.sender].Provident_Fund == false,
            "provident fund already approved"
        );
        UserMapping[msg.sender].Provident_Fund = true;
        emit e_Service(msg.sender, "provident_fund", PROVIDENT_FUND_DEDUCTION);
    }

    function Apply_Fixed_Deposit(uint256 term) public {
        require(
            UserMapping[msg.sender].Fixed_Deposit == Fixed_Deposit_Term.NONE &&
                term == 1 &&
                term == 2 &&
                term == 3,
            "fixed fund already approved or wrong term choose"
        );
        if (term == 1) {
            UserMapping[msg.sender].Fixed_Deposit = Fixed_Deposit_Term.SHORT;
        } else if (term == 2) {
            UserMapping[msg.sender].Fixed_Deposit = Fixed_Deposit_Term.MID;
        } else if (term == 3) {
            UserMapping[msg.sender].Fixed_Deposit = Fixed_Deposit_Term.LONG;
        }
        emit e_Service(msg.sender, "fixed_deposit", FIXED_DEPOSIT_DEDUCTION);
    }

    function Apply_Health_Insurance() public {
        require(
            UserMapping[msg.sender].Health_Insurance ==
                Health_Insurance_Term.NONE,
            "insurence already approved"
        );
        UserMapping[msg.sender].Health_Insurance = Health_Insurance_Term.ACTIVE;
        emit e_Service(
            msg.sender,
            "health_insurence",
            HEALTH_INSURANCE_DEDUCTION
        );
    }

    function Clame_Health_Insurance() public {
        require(
            UserMapping[msg.sender].Health_Insurance ==
                Health_Insurance_Term.ACTIVE
        );
        UserMapping[msg.sender].Health_Insurance = Health_Insurance_Term
            .DEDUCED;
    }

    function Check_Provident_Fund() public view returns (bool) {
        return UserMapping[msg.sender].Provident_Fund;
    }

    function Check_Fixed_Deposit() public view returns (Fixed_Deposit_Term) {
        return UserMapping[msg.sender].Fixed_Deposit;
    }

    function Check_Health_Insurance()
        public
        view
        returns (Health_Insurance_Term)
    {
        return UserMapping[msg.sender].Health_Insurance;
    }

    function Cancel_Provident_Fund() public {
        require(
            UserMapping[msg.sender].Provident_Fund == true,
            "approve first to cancel"
        );
        UserMapping[msg.sender].Provident_Fund = false;
        emit e_Service(msg.sender, "cancel_provident_fund", 0);
    }

    function Cancel_Fixed_Deposit() public {
        require(
            UserMapping[msg.sender].Fixed_Deposit == Fixed_Deposit_Term.LONG ||
                UserMapping[msg.sender].Fixed_Deposit ==
                Fixed_Deposit_Term.MID ||
                UserMapping[msg.sender].Fixed_Deposit ==
                Fixed_Deposit_Term.SHORT,
            "approve first to cancel"
        );
        UserMapping[msg.sender].Fixed_Deposit = Fixed_Deposit_Term.NONE;
        emit e_Service(msg.sender, "cancel_fixed_deposit", 0);
    }

    function AddBalance() external payable onlyOwner {
        require(msg.value > 0, "add more than 0 sir");
    }

    function ChangeQuota(uint256 NEW_QUOTA_FRACTION) private onlyOwner {
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
    ) public view returns (uint256) {
        uint256 amount = 0;
        if (UserMapping[user].Provident_Fund) {
            amount += PROVIDENT_FUND_DEDUCTION;
        }
        if (UserMapping[user].Fixed_Deposit != Fixed_Deposit_Term.NONE) {
            amount += FIXED_DEPOSIT_DEDUCTION;
        }
        if (UserMapping[user].Health_Insurance != Health_Insurance_Term.NONE) {
            amount += HEALTH_INSURANCE_DEDUCTION;
        }

        return amount;
    }

    function GetRemainingQuota(address user) public view returns (uint256) {
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

    modifier initialFund() {
        require(
            UserMapping[msg.sender].Addr != msg.sender,
            "user already exist"
        );
        require(address(this).balance >= INITIAL_AMOUNT, "not enought funds");
        (bool success, ) = payable(msg.sender).call{value: INITIAL_AMOUNT}("");
        require(success, "Initial fund transfer failed");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == i_owner, "you are Not the owner sir!");
        _;
    }
}
