//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MyContract {

    string message = "Hello World";

    event MessageUpdate(string oldMessage, string newMessage);

    constructor() {
        message = "Hello World !";
    }

    function getMessage() public view returns(string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public {
        string memory oldMessage = message;
        message = newMessage;

        emit MessageUpdate(oldMessage, newMessage);
    } 
}