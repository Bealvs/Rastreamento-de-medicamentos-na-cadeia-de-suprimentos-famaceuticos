// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MedicationTracking {
    // Variável para armazenar o dono do contrato
    address public owner;

    // Construtor para definir o dono do contrato
    constructor() {
        owner = msg.sender;
        authorizedUsers[owner] = true;
    }

    // Estrutura do Fabricante
    struct Manufacturer {
        string manufacturerName;
        string tradeName;
        string cnpj;
    }

    // Estrutura do Produto
    struct Product {
        string id;
        string productCode;
        string commercialName;
        string genericName;
        string characteristics;
        string batch;
        uint256 manufacturingDate;
        uint256 expirationDate;
        string trackingCode;
        Manufacturer manufacturer;
    }

    // Estrutura de Rastreamento
    struct Tracking {
        string id;
        string location;
        string status;
        uint256 timestamp;
        string trackingCode;
        string destinationPoint;
    }

    // Mapeamento do ID do Produto para Produto
    mapping(string => Product) public productsById;

    // Mapeamento do ID do Tracking para Tracking
    mapping(string => Tracking) public trackingById;

    // Mapeamento do CNPJ do Fabricante para Fabricante
    mapping(string => Manufacturer) public manufacturerById;

    // Mapeamento do Código de Rastreamento para Rastreamentos
    mapping(string => Tracking[]) trackingsByCode;

    // Mapeamento do CNPJ para os IDs dos Produtos
    mapping(string => string[]) productsByCnpj;

    // Mapeamento para armazenar os endereços dos usuários autorizados
    mapping(address => bool) public authorizedUsers;

    // Array para armazenar todos os IDs de produtos
    string[] productIds;

    // Evento para Produto Criado
    event ProductCreated(string id, string trackingCode);

    // Evento para Rastreamento Adicionado
    event TrackingAdded(string trackingId, string trackingCode, string location, string status);

    // Modificador para verificar se o chamador é autorizado
    modifier onlyAuthorized() {
        require(authorizedUsers[msg.sender], "Voce nao tem permissao para executar esta funcao.");
        _;
    }

    // Função para adicionar um usuário autorizado
    function authorizeUser(address user) public {
        // Somente o contrato pode adicionar usuários autorizados (ou um admin)
        require(msg.sender == owner, "Apenas o dono do contrato pode autorizar novos usuarios.");
        authorizedUsers[user] = true;
    }

    // Função para Criar um Fabricante
    function createManufacturer(
        string memory manufacturerName,
        string memory tradeName,
        string memory cnpj
    ) public onlyAuthorized{
        require(bytes(manufacturerById[cnpj].cnpj).length == 0, "Fabricante com este CNPJ ja existe.");
        
        manufacturerById[cnpj] = Manufacturer(manufacturerName, tradeName, cnpj);
    }

    // Função para Criar um Produto
    function createProduct(
        string memory id,
        string memory productCode,
        string memory commercialName,
        string memory genericName,
        string memory characteristics,
        string memory batch,
        uint256 manufacturingDate,
        uint256 expirationDate,
        string memory trackingCode,
        string memory cnpj
    ) public onlyAuthorized{
        require(bytes(productsById[id].id).length == 0, "Produto com este ID ja existe.");

        // Verificando se o fabricante existe
        Manufacturer storage manufacturer = manufacturerById[cnpj];
        require(bytes(manufacturer.cnpj).length > 0, "Fabricante com este CNPJ nao existe.");

        productsById[id] = Product(
            id,
            productCode,
            commercialName,
            genericName,
            characteristics,
            batch,
            manufacturingDate,
            expirationDate,
            trackingCode,
            manufacturer
        );

        // Adiciona o ID do produto ao array de IDs de produtos
        productIds.push(id);

        // Associando o produto ao CNPJ
        productsByCnpj[cnpj].push(id);

        emit ProductCreated(id, trackingCode);
    }

    // Função para Adicionar Rastreamento
    function addTracking(
        string memory id,
        string memory location,
        string memory status,
        uint256 timestamp,
        string memory trackingCode,
        string memory destinationPoint
    ) public onlyAuthorized{
        require(bytes(trackingById[id].id).length == 0, "Tracking com este ID ja existe.");

        // Criando o objeto de rastreamento
        trackingById[id] = Tracking(
            id,
            location,
            status,
            timestamp,
            trackingCode,
            destinationPoint
        );

        // Adicionando o rastreamento à lista de rastreamentos do código
        trackingsByCode[trackingCode].push(trackingById[id]);

        emit TrackingAdded(id, trackingCode, location, status);
    }

    // Função para Obter Rastreamentos por Código
    function getTrackingsByCode(string memory trackingCode) public view returns (Tracking[] memory) {
        return trackingsByCode[trackingCode];
    }

    // Função para retornar todos os produtos
    function getAllProducts() public view returns (Product[] memory) {
        uint256 productCount = productIds.length;
        Product[] memory allProducts = new Product[](productCount);

        for (uint256 i = 0; i < productCount; i++) {
            allProducts[i] = productsById[productIds[i]];
        }

        return allProducts;
    }

    function getProductsByCnpj(string memory cnpj) public view returns (Product[] memory) {
        // Obter os IDs dos produtos associados ao CNPJ
        string[] memory productIdsByCnpj = productsByCnpj[cnpj];

        // Criar um array de produtos para retornar
        Product[] memory products = new Product[](productIdsByCnpj.length);

        // Preencher o array de produtos
        for (uint256 i = 0; i < productIdsByCnpj.length; i++) {
            products[i] = productsById[productIdsByCnpj[i]];
        }

        return products;
    }

    // Função para retornar o destinationPoint de um rastreamento a partir do trackingCode
    function getDestinationPointByTrackingCode(string memory trackingCode) public view returns (string memory) {
        // Verifica se existe algum rastreamento com o trackingCode fornecido
        Tracking[] memory trackings = trackingsByCode[trackingCode];

        // Se não houver rastreamentos para o código fornecido
        require(trackings.length > 0, "Nenhum rastreamento encontrado para este codigo.");

        // Retorna o destinationPoint do primeiro rastreamento encontrado (ou outro critério desejado)
        return trackings[0].destinationPoint;
    }
}
