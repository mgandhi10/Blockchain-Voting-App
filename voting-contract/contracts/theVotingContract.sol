// SPDX-License-Identifier: UNLICENSED
pragma experimental ABIEncoderV2;
pragma solidity >=0.8.0 <0.9.0;

contract theVotingContract {
    
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Poll {
        string id;
        string description;
        mapping(uint => Candidate) candidates;
        uint candidatesCount;
        mapping(address => bool) hasVoted; // Track if a voter has voted
        mapping(address => bool) admins;
        address creator;
    }

    mapping(string => Poll) public polls;
    uint256 private nonce = 0; // Counter to ensure different values

    event PollCreated(string pollId);
    event CandidateAdded(string indexed pollId, uint indexed candidateId);
    event Voted(string indexed pollId, uint indexed candidateId);

    function createPoll(string memory _description) public returns (string memory) {
        bytes32 randomHash = keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce));
        nonce++;
        string memory randomId = toHexString(randomHash);

        // Ensure unique ID
        while(bytes(polls[randomId].description).length != 0) {
            randomHash = keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce));
            nonce++;
            randomId = toHexString(randomHash);
        }

        Poll storage newPoll = polls[randomId];
        newPoll.id = randomId;
        newPoll.description = _description;
        newPoll.creator = msg.sender;
        newPoll.admins[msg.sender] = true;
        emit PollCreated(randomId);

        return randomId;
    }

    function addCandidate(string memory _pollId, string memory _name) public {
        require(polls[_pollId].admins[msg.sender], "Only admins can add candidates");
        Poll storage poll = polls[_pollId];
        poll.candidatesCount++;
        poll.candidates[poll.candidatesCount] = Candidate(poll.candidatesCount, _name, 0);
        emit CandidateAdded(_pollId, poll.candidatesCount);
    }

    function assignAdmin(string memory _pollId, address _admin) public {
        require(polls[_pollId].creator == msg.sender, "Only the poll creator can assign admins");
        polls[_pollId].admins[_admin] = true;
    }

    function vote(string memory _pollId, uint _candidateId) public {
        require(bytes(polls[_pollId].description).length != 0, "Invalid poll ID");
        require(_candidateId > 0 && _candidateId <= polls[_pollId].candidatesCount, "Invalid candidate ID");
        require(!polls[_pollId].hasVoted[msg.sender], "Voter has already voted in this poll");
        
        Poll storage poll = polls[_pollId];
        poll.candidates[_candidateId].voteCount++;
        poll.hasVoted[msg.sender] = true;
        emit Voted(_pollId, _candidateId);
    }

    function getPollCandidates(string memory _pollId) public view returns (Candidate[] memory) {
        Candidate[] memory candidatesArray = new Candidate[](polls[_pollId].candidatesCount);
        for (uint i = 1; i <= polls[_pollId].candidatesCount; i++) {
            candidatesArray[i - 1] = polls[_pollId].candidates[i];
        }
        return candidatesArray;
    }

    function toHexString(bytes32 data) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(64);

        for (uint256 i = 0; i < 32; i++) {
            str[i*2] = alphabet[uint8(data[i] >> 4)];
            str[1+i*2] = alphabet[uint8(data[i] & 0x0f)];
        }

        return string(str);
    }
}
