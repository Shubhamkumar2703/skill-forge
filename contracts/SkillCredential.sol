// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title SkillCredential
 * @dev A decentralized skill verification and credentialing platform
 * Issues on-chain credentials backed by GitHub proof and IPFS storage
 */

contract SkillCredential {
    // ============ Events ============
    event CredentialIssued(
        uint256 indexed credentialId,
        address indexed issuer,
        address indexed holder,
        string title,
        uint256 timestamp
    );

    event CredentialRevoked(uint256 indexed credentialId, uint256 timestamp);

    event ProofLinked(
        uint256 indexed credentialId,
        string proofType,
        string ipfsHash,
        uint256 timestamp
    );

    event VerificationRequested(
        uint256 indexed credentialId,
        address indexed verifier,
        uint256 timestamp
    );

    // ============ Structs ============
    struct Credential {
        uint256 id;
        address issuer;
        address holder;
        string title;
        string description;
        string[] skills;
        uint256 issuedDate;
        uint256 expiryDate;
        bool isRevoked;
        string proofIPFSHash; // Points to GitHub data and metadata on IPFS
        uint256 verificationCount;
    }

    struct GitHubProof {
        string username;
        uint256 totalCommits;
        uint256 publicRepos;
        string profileIPFSHash; // GitHub activity snapshot stored on IPFS
        uint256 lastVerifiedAt;
    }

    struct Verification {
        uint256 credentialId;
        address verifier;
        bool isValid;
        string proofStatus;
        uint256 verifiedAt;
    }

    // ============ State Variables ============
    address public owner;
    uint256 public credentialCounter;
    uint256 public verificationCounter;

    mapping(uint256 => Credential) public credentials;
    mapping(address => uint256[]) public holderCredentials;
    mapping(address => GitHubProof) public githubProofs;
    mapping(uint256 => Verification[]) public credentialVerifications;
    mapping(address => bool) public authorizedIssuers;

    // ============ Modifiers ============
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyAuthorizedIssuer() {
        require(
            authorizedIssuers[msg.sender] || msg.sender == owner,
            "Not authorized to issue credentials"
        );
        _;
    }

    modifier credentialExists(uint256 _credentialId) {
        require(_credentialId < credentialCounter, "Credential does not exist");
        _;
    }

    // ============ Constructor ============
    constructor() {
        owner = msg.sender;
        authorizedIssuers[msg.sender] = true;
        credentialCounter = 0;
        verificationCounter = 0;
    }

    // ============ Issuer Management ============
    /**
     * @dev Add a new authorized issuer (only owner)
     */
    function addAuthorizedIssuer(address _issuer) external onlyOwner {
        require(_issuer != address(0), "Invalid issuer address");
        authorizedIssuers[_issuer] = true;
    }

    /**
     * @dev Remove an authorized issuer (only owner)
     */
    function removeAuthorizedIssuer(address _issuer) external onlyOwner {
        authorizedIssuers[_issuer] = false;
    }

    // ============ Credential Management ============
    /**
     * @dev Issue a new credential
     */
    function issueCredential(
        address _holder,
        string memory _title,
        string memory _description,
        string[] memory _skills,
        uint256 _expiryDate,
        string memory _proofIPFSHash
    ) external onlyAuthorizedIssuer returns (uint256) {
        require(_holder != address(0), "Invalid holder address");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_proofIPFSHash).length > 0, "IPFS hash required");
        require(_expiryDate > block.timestamp, "Expiry date must be in future");

        uint256 credentialId = credentialCounter++;

        Credential storage credential = credentials[credentialId];
        credential.id = credentialId;
        credential.issuer = msg.sender;
        credential.holder = _holder;
        credential.title = _title;
        credential.description = _description;
        credential.skills = _skills;
        credential.issuedDate = block.timestamp;
        credential.expiryDate = _expiryDate;
        credential.isRevoked = false;
        credential.proofIPFSHash = _proofIPFSHash;
        credential.verificationCount = 0;

        holderCredentials[_holder].push(credentialId);

        emit CredentialIssued(
            credentialId,
            msg.sender,
            _holder,
            _title,
            block.timestamp
        );

        return credentialId;
    }

    /**
     * @dev Revoke a credential
     */
    function revokeCredential(uint256 _credentialId)
        external
        credentialExists(_credentialId)
    {
        Credential storage credential = credentials[_credentialId];
        require(
            msg.sender == credential.issuer || msg.sender == owner,
            "Only issuer or owner can revoke"
        );
        require(!credential.isRevoked, "Credential already revoked");

        credential.isRevoked = true;
        emit CredentialRevoked(_credentialId, block.timestamp);
    }

    /**
     * @dev Link additional proof to a credential
     */
    function linkProof(
        uint256 _credentialId,
        string memory _proofType,
        string memory _ipfsHash
    ) external credentialExists(_credentialId) {
        Credential storage credential = credentials[_credentialId];
        require(
            msg.sender == credential.holder || msg.sender == credential.issuer,
            "Only holder or issuer can link proof"
        );
        require(bytes(_ipfsHash).length > 0, "Invalid IPFS hash");

        credential.proofIPFSHash = _ipfsHash;
        emit ProofLinked(_credentialId, _proofType, _ipfsHash, block.timestamp);
    }

    // ============ GitHub Integration ============
    /**
     * @dev Store GitHub proof for a user
     */
    function setGitHubProof(
        string memory _username,
        uint256 _totalCommits,
        uint256 _publicRepos,
        string memory _profileIPFSHash
    ) external {
        require(bytes(_username).length > 0, "Username required");
        require(bytes(_profileIPFSHash).length > 0, "IPFS hash required");

        GitHubProof storage proof = githubProofs[msg.sender];
        proof.username = _username;
        proof.totalCommits = _totalCommits;
        proof.publicRepos = _publicRepos;
        proof.profileIPFSHash = _profileIPFSHash;
        proof.lastVerifiedAt = block.timestamp;
    }

    /**
     * @dev Get GitHub proof for a user
     */
    function getGitHubProof(address _user)
        external
        view
        returns (GitHubProof memory)
    {
        return githubProofs[_user];
    }

    // ============ Verification ============
    /**
     * @dev Verify a credential's authenticity
     */
    function verifyCredential(uint256 _credentialId)
        external
        credentialExists(_credentialId)
    {
        Credential storage credential = credentials[_credentialId];

        require(!credential.isRevoked, "Credential is revoked");
        require(credential.expiryDate > block.timestamp, "Credential expired");
        require(
            bytes(credential.proofIPFSHash).length > 0,
            "No proof linked"
        );

        Verification memory verification;
        verification.credentialId = _credentialId;
        verification.verifier = msg.sender;
        verification.isValid = true;
        verification.proofStatus = "VERIFIED";
        verification.verifiedAt = block.timestamp;

        credentialVerifications[_credentialId].push(verification);
        credential.verificationCount++;

        emit VerificationRequested(_credentialId, msg.sender, block.timestamp);
    }

    /**
     * @dev Get all verifications for a credential
     */
    function getCredentialVerifications(uint256 _credentialId)
        external
        view
        credentialExists(_credentialId)
        returns (Verification[] memory)
    {
        return credentialVerifications[_credentialId];
    }

    // ============ Query Functions ============
    /**
     * @dev Get credential details
     */
    function getCredential(uint256 _credentialId)
        external
        view
        credentialExists(_credentialId)
        returns (Credential memory)
    {
        return credentials[_credentialId];
    }

    /**
     * @dev Get all credentials for a holder
     */
    function getHolderCredentials(address _holder)
        external
        view
        returns (uint256[] memory)
    {
        return holderCredentials[_holder];
    }

    /**
     * @dev Check if credential is valid (not revoked and not expired)
     */
    function isCredentialValid(uint256 _credentialId)
        external
        view
        credentialExists(_credentialId)
        returns (bool)
    {
        Credential memory credential = credentials[_credentialId];
        return !credential.isRevoked && credential.expiryDate > block.timestamp;
    }

    /**
     * @dev Get credential count
     */
    function getCredentialCount() external view returns (uint256) {
        return credentialCounter;
    }

    /**
     * @dev Get skills for a credential
     */
    function getCredentialSkills(uint256 _credentialId)
        external
        view
        credentialExists(_credentialId)
        returns (string[] memory)
    {
        return credentials[_credentialId].skills;
    }
}
