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
        uint id;
        string description;
        mapping(uint => Candidate) candidates;
        uint candidatesCount;
        mapping(address => bool) hasVoted; // Track if a voter has voted
        mapping(address => bool) admins;
        address creator;
    }

    mapping(uint => Poll) public polls;
    uint public pollsCount;

    event PollCreated(uint indexed pollId);
    event CandidateAdded(uint indexed pollId, uint indexed candidateId);
    event Voted(uint indexed pollId, uint indexed candidateId);

    function createPoll(string memory _description) public returns (uint) {
        pollsCount++;
        Poll storage newPoll = polls[pollsCount];
        newPoll.id = pollsCount;
        newPoll.description = _description;
        newPoll.creator = msg.sender;
        newPoll.admins[msg.sender] = true; // Creator is an admin of the poll
        emit PollCreated(pollsCount);
        return pollsCount;
    }

    function addCandidate(uint _pollId, string memory _name) public {
        require(polls[_pollId].admins[msg.sender], "Only admins can add candidates");
        Poll storage poll = polls[_pollId];
        poll.candidatesCount++;
        poll.candidates[poll.candidatesCount] = Candidate(poll.candidatesCount, _name, 0);
        emit CandidateAdded(_pollId, poll.candidatesCount);
    }

    function assignAdmin(uint _pollId, address _admin) public {
        require(polls[_pollId].creator == msg.sender, "Only the poll creator can assign admins");
        polls[_pollId].admins[_admin] = true;
    }

    function vote(uint _pollId, uint _candidateId) public {
        require(_pollId > 0 && _pollId <= pollsCount, "Invalid poll ID");
        require(_candidateId > 0 && _candidateId <= polls[_pollId].candidatesCount, "Invalid candidate ID");
        require(!polls[_pollId].hasVoted[msg.sender], "Voter has already voted in this poll");
        
        Poll storage poll = polls[_pollId];
        poll.candidates[_candidateId].voteCount++;
        poll.hasVoted[msg.sender] = true; // Record that this voter has voted

        emit Voted(_pollId, _candidateId);
    }

    function getPollCandidates(uint _pollId) public view returns (Candidate[] memory) {
        Candidate[] memory candidatesArray = new Candidate[](polls[_pollId].candidatesCount);
        for (uint i = 1; i <= polls[_pollId].candidatesCount; i++) {
            candidatesArray[i - 1] = polls[_pollId].candidates[i];
        }
        return candidatesArray;
    }
}
