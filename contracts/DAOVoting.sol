//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./IERC20.sol";

contract DAOVoting {
    address private owner;
    IERC20 public token;
    uint256 public minimumQuorum;
    uint256 public debatingPeriodDuration;
    mapping(address => bool) public isChairMan;
    mapping(address => bool) public isDAO;

    mapping(address => uint256) private balanceTotal;
    mapping(address => uint256) private lastVoting;

    struct Voting {
        string title;
        string description;

        mapping(address => uint256) participants;
        uint256 totalVotes;
        uint256 positiveVotes;
        uint256 courseVote;

        address recipient;
        string callData;

        uint256 startAt;
        uint256 endAt;
        bool ended;
    }

    mapping(uint256 => Voting) public votings;

    modifier OnlyOwner() {
        require(msg.sender == owner, "not an owner");
        _;
    }

    modifier OnlyChairMan() {
        require(isChairMan[msg.sender], "not a chairman");
        _;
    }

    modifier OnlyDAO() {
        require(isDAO[msg.sender], "not a DAO");
        _;
    }

    constructor(address chairMan, IERC20 _token, uint256 _minimumQuorum, uint256 _debatingPeriodDuration) {
        owner = msg.sender;
        addChairMan(chairMan);
        addChairMan(owner);
        addDAO(address(this));
        token = _token;
        minimumQuorum = _minimumQuorum;
        debatingPeriodDuration = _debatingPeriodDuration;
    }

    function addChairMan(address account) public OnlyOwner() {
        isChairMan[account] = true;
    }

    function addDAO(address account) public OnlyOwner() {
        isDAO[account] = true;
    }
}
