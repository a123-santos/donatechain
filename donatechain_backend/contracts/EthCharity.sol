// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EthCharity {
    uint private amountEth;
    address private immutable owner;

    enum EventStatus {
        PENDING,
        COMPLETED
    }

    struct Event {
        string eventName;
        uint256 requiredFund;
        address fundRaiserAddress;
        EventStatus status;
        uint256 collectedFund;
        string description;
    }

    struct projectsDonated {
        string eventName;
        uint256 donatedAmount;
    }

    error invalidFund();
    error unAuthorized();
    error transactionUnsuccessful();

    Event[] public events;

    mapping(address => projectsDonated[]) donors;

    constructor() {
        owner = msg.sender;

     /*    events.push(
            Event(
                'Hunger',
                3000000000,
                0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec,
                EventStatus.PENDING,
                0,
                'Apple'
            )
        );
        events.push(
            Event(
                'Tsunami',
                300,
                0x2546BcD3c84621e976D8185a91A922aE77ECEc30,
                EventStatus.PENDING,
                0,
                'Banana'
            )
        );
        events.push(
            Event(
                'Cyclone',
                300,
                0x2546BcD3c84621e976D8185a91A922aE77ECEc30,
                EventStatus.PENDING,
                0,
                'Cherry'
            )
        );
        events.push(
            Event(
                'Reconstruction',
                300,
                0x2546BcD3c84621e976D8185a91A922aE77ECEc30,
                EventStatus.PENDING,
                0,
                'Mango'
            )
        ); */
    }

    modifier conversion() {
        require(msg.value >= 0.002 ether, 'error');
        _;
    }

    modifier ownable() {
        require(msg.sender == owner, 'not the owner');
        _;
    }

    modifier validWithdrawal(uint _amount) {
        require(
            amountEth >= _amount && _amount > 0,
            'Invalid withdrawal amount'
        );
        _;
    }

    modifier validEvent(uint256 _amount) {
        if (_amount >= 100 ether) {
            revert invalidFund();
        }
        _;
    }

    function addFund(string memory _eventName) public payable {
        amountEth += msg.value;

        projectsDonated[] storage temp = donors[msg.sender];
        bool donationUpdated = false;

        for (uint i = 0; i < temp.length; i++) {
            if (
                keccak256(abi.encodePacked(temp[i].eventName)) ==
                keccak256(abi.encodePacked(_eventName))
            ) {
                donors[msg.sender][i].donatedAmount += msg.value;
                donationUpdated = true;
                break;
            }
        }

        if (!donationUpdated) {
            donors[msg.sender].push(projectsDonated(_eventName, msg.value));
        }

        for (uint i = 0; i < events.length; i++) {
            if (
                keccak256(abi.encodePacked(events[i].eventName)) ==
                keccak256(abi.encodePacked(_eventName))
            ) {
                events[i].collectedFund += msg.value;
                if (events[i].collectedFund >= events[i].requiredFund) {
                    events[i].status = EventStatus.COMPLETED;
                    (bool success, ) = (events[i].fundRaiserAddress).call{
                        value: events[i].requiredFund
                    }('');
                    if (!success) {
                        revert transactionUnsuccessful();
                    }
                }
            }
        }
    }

    function leftAmount() public view ownable returns (uint) {
        return amountEth;
    }

    function showDonor(
        address _address
    ) public view returns (projectsDonated[] memory) {
        return donors[_address];
    }

    function withdrawFund() public ownable {
        payable(owner).transfer(address(this).balance);
        amountEth = 0;
    }

    function postEvents(
        string memory eventName,
        uint256 requiredFund,
        string memory description
    ) public validEvent(requiredFund) {
        Event memory newEvent = Event(
            eventName,
            requiredFund,
            msg.sender,
            EventStatus.PENDING,
            0,
            description
        );
        events.push(newEvent);
    }

    function showEvents() public view returns (Event[] memory) {
        return events;
    }

    receive() external payable {}

    fallback() external payable {
        revert unAuthorized();
    }
}
