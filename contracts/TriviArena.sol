// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TriviArena
 * @dev Skill-based quiz battle platform with escrow system
 * @author TriviArena Team
 */
contract TriviArena {
    
    // ============ STATE VARIABLES ============
    
    /// @notice Platform fee percentage (5%)
    uint256 public constant PLATFORM_FEE_PERCENT = 5;
    
    /// @notice Challenge expiry time (24 hours)
    uint256 public constant CHALLENGE_EXPIRY = 24 hours;
    
    /// @notice Minimum stake amount (0.001 ETH)
    uint256 public constant MIN_STAKE = 0.001 ether;
    
    /// @notice Maximum stake amount (10 ETH)
    uint256 public constant MAX_STAKE = 10 ether;
    
    /// @notice Contract owner
    address public owner;
    
    /// @notice Challenge counter
    uint256 public challengeCounter;
    
    /// @notice Total platform fees collected
    uint256 public totalFeesCollected;
    
    // ============ STRUCTS ============
    
    struct Challenge {
        address challenger;
        address opponent;
        uint256 stake;
        string category;
        uint256 createdAt;
        uint256 expiresAt;
        bool accepted;
        bool completed;
        address winner;
        bool refunded;
    }
    
    // ============ MAPPINGS ============
    
    mapping(uint256 => Challenge) public challenges;
    mapping(address => uint256[]) public userChallenges;
    mapping(address => UserStats) public userStats;
    
    struct UserStats {
        uint256 gamesPlayed;
        uint256 gamesWon;
        uint256 totalEarned;
        uint256 totalStaked;
    }
    
    // ============ EVENTS ============
    
    event ChallengeCreated(
        uint256 indexed challengeId,
        address indexed challenger,
        address indexed opponent,
        uint256 stake,
        string category
    );
    
    event ChallengeAccepted(
        uint256 indexed challengeId,
        address indexed opponent
    );
    
    event ChallengeCompleted(
        uint256 indexed challengeId,
        address indexed winner,
        uint256 prize,
        uint256 platformFee
    );
    
    event ChallengeExpired(
        uint256 indexed challengeId,
        address indexed challenger,
        uint256 refundAmount
    );
    
    event FeesWithdrawn(
        address indexed owner,
        uint256 amount
    );
    
    // ============ ERRORS ============
    
    error InvalidStakeAmount();
    error ChallengeExpired();
    error ChallengeNotAccepted();
    error ChallengeAlreadyCompleted();
    error NotOpponent();
    error NotChallenger();
    error IncorrectStakeAmount();
    error ChallengeNotExpired();
    error AlreadyRefunded();
    error NoFeesToWithdraw();
    error OnlyOwner();
    error TransferFailed();
    
    // ============ MODIFIERS ============
    
    modifier onlyOwner() {
        if (msg.sender != owner) revert OnlyOwner();
        _;
    }
    
    modifier validStake() {
        if (msg.value < MIN_STAKE || msg.value > MAX_STAKE) {
            revert InvalidStakeAmount();
        }
        _;
    }
    
    // ============ CONSTRUCTOR ============
    
    constructor() {
        owner = msg.sender;
    }
    
    // ============ EXTERNAL FUNCTIONS ============
    
    function createChallenge(
        address _opponent,
        string memory _category
    ) external payable validStake returns (uint256) {
        require(_opponent != address(0), "Invalid opponent");
        require(_opponent != msg.sender, "Cannot challenge yourself");
        
        challengeCounter++;
        uint256 challengeId = challengeCounter;
        
        challenges[challengeId] = Challenge({
            challenger: msg.sender,
            opponent: _opponent,
            stake: msg.value,
            category: _category,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + CHALLENGE_EXPIRY,
            accepted: false,
            completed: false,
            winner: address(0),
            refunded: false
        });
        
        userChallenges[msg.sender].push(challengeId);
        userChallenges[_opponent].push(challengeId);
        
        emit ChallengeCreated(
            challengeId,
            msg.sender,
            _opponent,
            msg.value,
            _category
        );
        
        return challengeId;
    }
    
    function acceptChallenge(uint256 _challengeId) external payable {
        Challenge storage challenge = challenges[_challengeId];
        
        if (msg.sender != challenge.opponent) revert NotOpponent();
        if (block.timestamp >= challenge.expiresAt) revert ChallengeExpired();
        if (msg.value != challenge.stake) revert IncorrectStakeAmount();
        if (challenge.accepted) revert ChallengeAlreadyCompleted();
        
        challenge.accepted = true;
        
        userStats[msg.sender].totalStaked += msg.value;
        userStats[challenge.challenger].totalStaked += challenge.stake;
        
        emit ChallengeAccepted(_challengeId, msg.sender);
    }
    
    function submitResult(
        uint256 _challengeId,
        address _winner
    ) external onlyOwner {
        Challenge storage challenge = challenges[_challengeId];
        
        if (!challenge.accepted) revert ChallengeNotAccepted();
        if (challenge.completed) revert ChallengeAlreadyCompleted();
        require(
            _winner == challenge.challenger || _winner == challenge.opponent,
            "Invalid winner"
        );
        
        challenge.winner = _winner;
        challenge.completed = true;
        
        uint256 totalPrize = challenge.stake * 2;
        uint256 platformFee = (totalPrize * PLATFORM_FEE_PERCENT) / 100;
        uint256 winnerPrize = totalPrize - platformFee;
        
        totalFeesCollected += platformFee;
        
        userStats[_winner].gamesWon++;
        userStats[_winner].totalEarned += winnerPrize;
        userStats[challenge.challenger].gamesPlayed++;
        userStats[challenge.opponent].gamesPlayed++;
        
        (bool success, ) = payable(_winner).call{value: winnerPrize}("");
        if (!success) revert TransferFailed();
        
        emit ChallengeCompleted(
            _challengeId,
            _winner,
            winnerPrize,
            platformFee
        );
    }
    
    function refundExpiredChallenge(uint256 _challengeId) external {
        Challenge storage challenge = challenges[_challengeId];
        
        if (msg.sender != challenge.challenger) revert NotChallenger();
        if (block.timestamp < challenge.expiresAt) revert ChallengeNotExpired();
        if (challenge.accepted) revert ChallengeAlreadyCompleted();
        if (challenge.refunded) revert AlreadyRefunded();
        
        challenge.refunded = true;
        
        (bool success, ) = payable(challenge.challenger).call{
            value: challenge.stake
        }("");
        if (!success) revert TransferFailed();
        
        emit ChallengeExpired(
            _challengeId,
            challenge.challenger,
            challenge.stake
        );
    }
    
    function withdrawFees() external onlyOwner {
        uint256 amount = totalFeesCollected;
        if (amount == 0) revert NoFeesToWithdraw();
        
        totalFeesCollected = 0;
        
        (bool success, ) = payable(owner).call{value: amount}("");
        if (!success) revert TransferFailed();
        
        emit FeesWithdrawn(owner, amount);
    }
    
    // ============ VIEW FUNCTIONS ============
    
    function getChallenge(uint256 _challengeId)
        external
        view
        returns (Challenge memory)
    {
        return challenges[_challengeId];
    }
    
    function getUserChallenges(address _user)
        external
        view
        returns (uint256[] memory)
    {
        return userChallenges[_user];
    }
    
    function getUserStats(address _user)
        external
        view
        returns (UserStats memory)
    {
        return userStats[_user];
    }
    
    function isChallengeActive(uint256 _challengeId)
        external
        view
        returns (bool)
    {
        Challenge memory challenge = challenges[_challengeId];
        return (
            !challenge.completed &&
            !challenge.refunded &&
            block.timestamp < challenge.expiresAt
        );
    }
    
    function calculateWinnerPrize(uint256 _stake)
        external
        pure
        returns (uint256)
    {
        uint256 totalPrize = _stake * 2;
        uint256 platformFee = (totalPrize * PLATFORM_FEE_PERCENT) / 100;
        return totalPrize - platformFee;
    }
}
