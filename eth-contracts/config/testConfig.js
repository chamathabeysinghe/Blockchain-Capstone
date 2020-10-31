var BigNumber = require('../../node_modules/bignumber.js');
var ERC721Mintable = artifacts.require("./ERC721Mintable.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var Verifier = artifacts.require("./Verifier.sol");

var proofJSON = {
  "proof": {
    "a": [
      "0x1ba0df5159c4c75da8a30d34e28b0a2242b9634aed77c9b41b979e6081ed5033",
      "0x04a81e18c8c57362b000213bce6d533055ba4f830dc76abf9c5bf37907ffbdd0"
    ],
    "b": [
      [
        "0x272c1132c59a11b904df2e3921eaf7b40ce948a1a24e9b36dd6e2e04cc3e9560",
        "0x1535e1e6c5cb4d685ef68595487910d68d8813765f422b977b53e32f8c53fc94"
      ],
      [
        "0x26e8a26d9bd754c038c42bb9b5b32b91a0c1463aba53b03eb8e224f1230f853a",
        "0x2c080f65faca972f26229da56b338fc12d62261f8626ec42659bc1090e7a983d"
      ]
    ],
    "c": [
      "0x08c833d09a989255fa84bd16e9b4374fbf2c59f92f8b67298771b72c03e56f7f",
      "0x2f85944aef8c9f217463077e0d8f85fdf5546b3b570820ade0cf9c95a3feb440"
    ]
  },
  "inputs": [
    "0x0000000000000000000000000000000000000000000000000000000000000009",
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  ],
  "raw": "1ba0df5159c4c75da8a30d34e28b0a2242b9634aed77c9b41b979e6081ed5033a72c1132c59a11b904df2e3921eaf7b40ce948a1a24e9b36dd6e2e04cc3e95601535e1e6c5cb4d685ef68595487910d68d8813765f422b977b53e32f8c53fc9488c833d09a989255fa84bd16e9b4374fbf2c59f92f8b67298771b72c03e56f7f"

}


var Config = async function (accounts) {

  const _owner = accounts[0];
  const _account_one = accounts[0];
  const _account_two = accounts[1];

  const proof = proofJSON['proof'];
  const input = proofJSON['inputs'];

  const _symbol = 'REM'
  const _name = 'Real Estate Marketplace'
  const _baseTokenURI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/'
  const _firstTokenId = 1
  const _lastTokenId = 10

  let erc721Mintable = await ERC721Mintable.new(_name, _symbol, _baseTokenURI);
  let verifier = await Verifier.new();
  let solnSquareVerifier = await SolnSquareVerifier.new(verifier.address, _name, _symbol, _baseTokenURI);



  return {
    owner: _owner,
    account_one: _account_one,
    account_two: _account_two,
    firstTokenId: _firstTokenId,
    lastTokenId: _lastTokenId,
    proof: proof,
    input: input,
    name: _name,
    symbol: _symbol,
    baseTokenURI: _baseTokenURI,
    weiMultiple: (new BigNumber(10)).pow(18),
    myToken: erc721Mintable,
    solnSquareVerifier: solnSquareVerifier,
    verifier: verifier
  }
}

module.exports = {
  Config: Config
};
