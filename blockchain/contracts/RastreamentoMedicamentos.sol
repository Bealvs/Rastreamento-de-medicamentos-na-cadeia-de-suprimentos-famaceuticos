// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract RastreamentoMedicamentos {
    struct Administrador {
        string nomeCompleto;
        string cpf;
        string cnpj;
        string email;
        string senhaHash;
        bool ativo;
    }

    struct Medicamento {
        string nomeComercial;
        string nomeGenerico;
        string caracteristicas;
        string codigoProduto;
        string lote;
        uint dataFabricacao;
        uint dataValidade;
        Fabricante fabricante;
    }

    struct Fabricante {
        string nomeFabricante;
        string nomeComercial;
        string cnpj;
    }

    struct Rastreamento {
        string codigoRastreamento;
        string localizacaoAtual;
        uint dataCriacao;
        string pontoDestino;
        string status; // "Postado", "Em trânsito", "Entregue"
    }

    mapping(address => Administrador) public administradores;
    mapping(string => Medicamento) public medicamentos;
    mapping(string => Rastreamento) public rastreamentos;

    address public owner;

    event AdministradorCadastrado(address indexed adminAddress, string nomeCompleto);
    event MedicamentoCadastrado(string codigoProduto, string nomeComercial);
    event RastreamentoAtualizado(string codigoRastreamento, string status, string localizacao, uint timestamp);

    modifier somenteProprietario() {
        require(msg.sender == owner, "Apenas o proprietario pode executar esta acao");
        _;
    }

    modifier somenteAdministrador() {
        require(administradores[msg.sender].ativo, "Apenas administradores podem executar esta acao");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Função para cadastrar administradores
    function cadastrarAdministrador(
        address _adminAddress,
        string memory _nomeCompleto,
        string memory _cpf,
        string memory _cnpj,
        string memory _email,
        string memory _senhaHash
    ) public somenteProprietario {
        require(!administradores[_adminAddress].ativo, "Administrador ja cadastrado");

        administradores[_adminAddress] = Administrador({
            nomeCompleto: _nomeCompleto,
            cpf: _cpf,
            cnpj: _cnpj,
            email: _email,
            senhaHash: _senhaHash,
            ativo: true
        });

        emit AdministradorCadastrado(_adminAddress, _nomeCompleto);
    }

    // Função para login do administrador
    function loginAdministrador(string memory _cpf, string memory _cnpj, string memory _senhaHash)
        public
        view
        returns (bool)
    {
        require(administradores[msg.sender].ativo, "Administrador nao encontrado");
        Administrador memory admin = administradores[msg.sender];
        return (
            keccak256(bytes(admin.cpf)) == keccak256(bytes(_cpf)) &&
            keccak256(bytes(admin.cnpj)) == keccak256(bytes(_cnpj)) &&
            keccak256(bytes(admin.senhaHash)) == keccak256(bytes(_senhaHash))
        );
    }

    // Função para cadastrar medicamentos
    function cadastrarMedicamento(
        string memory _nomeComercial,
        string memory _nomeGenerico,
        string memory _caracteristicas,
        string memory _codigoProduto,
        string memory _lote,
        uint _dataFabricacao,
        uint _dataValidade,
        string memory _nomeFabricante,
        string memory _nomeComercialFabricante,
        string memory _cnpjFabricante
    ) public somenteAdministrador {
        require(bytes(_codigoProduto).length > 0, "Codigo do produto invalido");
        require(bytes(medicamentos[_codigoProduto].codigoProduto).length == 0, "Medicamento ja cadastrado");

        Fabricante memory fabricante = Fabricante({
            nomeFabricante: _nomeFabricante,
            nomeComercial: _nomeComercialFabricante,
            cnpj: _cnpjFabricante
        });

        medicamentos[_codigoProduto] = Medicamento({
            nomeComercial: _nomeComercial,
            nomeGenerico: _nomeGenerico,
            caracteristicas: _caracteristicas,
            codigoProduto: _codigoProduto,
            lote: _lote,
            dataFabricacao: _dataFabricacao,
            dataValidade: _dataValidade,
            fabricante: fabricante
        });

        emit MedicamentoCadastrado(_codigoProduto, _nomeComercial);
    }

    // Função para atualizar rastreamento
    function atualizarRastreamento(
        string memory _codigoRastreamento,
        string memory _localizacaoAtual,
        string memory _pontoDestino,
        string memory _status
    ) public somenteAdministrador {
        require(bytes(_codigoRastreamento).length > 0, "Codigo de rastreamento invalido");

        Rastreamento storage rastreamento = rastreamentos[_codigoRastreamento];

        rastreamento.codigoRastreamento = _codigoRastreamento;
        rastreamento.localizacaoAtual = _localizacaoAtual;
        rastreamento.pontoDestino = _pontoDestino;
        rastreamento.status = _status;
        rastreamento.dataCriacao = block.timestamp;

        emit RastreamentoAtualizado(_codigoRastreamento, _status, _localizacaoAtual, block.timestamp);
    }

    // Função para consultar rastreamento
    function consultarRastreamento(string memory _codigoRastreamento)
        public
        view
        returns (
            string memory localizacaoAtual,
            uint dataCriacao,
            string memory pontoDestino,
            string memory status
        )
    {
        require(bytes(_codigoRastreamento).length > 0, "Codigo de rastreamento invalido");

        Rastreamento memory rastreamento = rastreamentos[_codigoRastreamento];
        return (rastreamento.localizacaoAtual, rastreamento.dataCriacao, rastreamento.pontoDestino, rastreamento.status);
    }
}
