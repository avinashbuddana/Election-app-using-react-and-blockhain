pragma solidity >=0.4.22 <0.8.0;

contract Election {
   //model for candidate

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    //store votres address
      mapping(address => bool) public voters;


   // Read/write Candidates
     mapping(uint => Candidate) public candidates;

// Store Candidates Count
    uint public candidatesCount;

// add new candidate
     function addCandidate(string memory _name) public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

//vote list
   function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;
    }



}