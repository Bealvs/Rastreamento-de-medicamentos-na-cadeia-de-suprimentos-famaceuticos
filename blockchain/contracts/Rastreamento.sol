// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Rastreamento{
    struct Suprimento {
        uint id;
        string nome;
        string fabricante;
        string status; // "Em trânsito", "Entregue", "Confirmado"
        uint dataEntrada;
    }

    mapping(uint => Suprimento) public suprimentos;
    uint public counter;

    event SuprimentoCriado(uint id, string nome, string fabricante);
    event StatusAtualizado(uint id, string novoStatus);

    constructor() {
        counter = 0;
    }

    function criarSuprimento(string memory _nome, string memory _fabricante) public {
        counter++;
        suprimentos[counter] = Suprimento(counter, _nome, _fabricante, "Em trânsito", block.timestamp);
        emit SuprimentoCriado(counter, _nome, _fabricante);
    }

    function atualizarStatus(uint _id, string memory _status) public {
        require(_id <= counter, "Suprimento nao encontrado");
        suprimentos[_id].status = _status;
        emit StatusAtualizado(_id, _status);
    }

    function obterSuprimento(uint _id) public view returns (string memory nome, string memory fabricante, string memory status, uint dataEntrada) {
        require(_id <= counter, "Suprimento nao encontrado");
        Suprimento memory suprimento = suprimentos[_id];
        return (suprimento.nome, suprimento.fabricante, suprimento.status, suprimento.dataEntrada);
    }
}
