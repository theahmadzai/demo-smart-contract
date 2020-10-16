App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert('Please connect to Metamask.')
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({
          /* ... */
        })
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({
        /* ... */
      })
    }
    // Non-dapp browsers...
    else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      )
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const todoList = {
      contractName: 'TodoList',
      abi: [
        {
          inputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          constant: true,
          inputs: [],
          name: 'taskCount',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'tasks',
          outputs: [
            {
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              internalType: 'string',
              name: 'content',
              type: 'string',
            },
            {
              internalType: 'bool',
              name: 'completed',
              type: 'bool',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              internalType: 'string',
              name: '_content',
              type: 'string',
            },
          ],
          name: 'createTask',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      metadata:
        '{"compiler":{"version":"0.5.16+commit.9c3226ce"},"language":"Solidity","output":{"abi":[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"internalType":"string","name":"_content","type":"string"}],"name":"createTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"taskCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tasks","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"content","type":"string"},{"internalType":"bool","name":"completed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}],"devdoc":{"methods":{}},"userdoc":{"methods":{}}},"settings":{"compilationTarget":{"/E/github/smartcontract/contracts/TodoList.sol":"TodoList"},"evmVersion":"istanbul","libraries":{},"optimizer":{"enabled":true,"runs":200},"remappings":[]},"sources":{"/E/github/smartcontract/contracts/TodoList.sol":{"keccak256":"0x51f56c78d7cba4d6e70cb16398798d3d9a2c55629e753433b30c4c2fcfb0e508","urls":["bzz-raw://c4432ce308a68d93876401d1d4613e6aec3b29f5e56e5a6e214be137b51c9f84","dweb:/ipfs/QmeTxoF1eEHrsqsPvcx7dyTmZZzcg2WLEQUFdy2x4Kxbgn"]}},"version":1}',
      bytecode:
        '0x60806040526000805534801561001457600080fd5b5060408051808201909152600b81526a12195b1b1bc815dbdc9b1960aa1b6020820152610049906001600160e01b0361004e16565b610155565b600080546001908101808355604080516060810182528281526020808201878152828401879052938652848152919094208451815591518051929361009b939085019291909101906100ba565b50604091909101516002909101805460ff191691151591909117905550565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100fb57805160ff1916838001178555610128565b82800160010185558215610128579182015b8281111561012857825182559160200191906001019061010d565b50610134929150610138565b5090565b61015291905b80821115610134576000815560010161013e565b90565b6103a0806101646000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063111002aa146100465780638d977672146100ee578063b6cb58a514610195575b600080fd5b6100ec6004803603602081101561005c57600080fd5b81019060208101813564010000000081111561007757600080fd5b82018360208201111561008957600080fd5b803590602001918460018302840111640100000000831117156100ab57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506101af945050505050565b005b61010b6004803603602081101561010457600080fd5b503561021b565b604051808481526020018060200183151515158152602001828103825284818151815260200191508051906020019080838360005b83811015610158578181015183820152602001610140565b50505050905090810190601f1680156101855780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b61019d6102ca565b60408051918252519081900360200190f35b60008054600190810180835560408051606081018252828152602080820187815282840187905293865284815291909420845181559151805192936101fc939085019291909101906102d0565b50604091909101516002909101805460ff191691151591909117905550565b600160208181526000928352604092839020805481840180548651600296821615610100026000190190911695909504601f810185900485028601850190965285855290949193929091908301828280156102b75780601f1061028c576101008083540402835291602001916102b7565b820191906000526020600020905b81548152906001019060200180831161029a57829003601f168201915b5050506002909301549192505060ff1683565b60005481565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061031157805160ff191683800117855561033e565b8280016001018555821561033e579182015b8281111561033e578251825591602001919060010190610323565b5061034a92915061034e565b5090565b61036891905b8082111561034a5760008155600101610354565b9056fea265627a7a72315820b1b6a42ee50f9a903ad662b890ce506f569dbf6596f6cec006685085a6ac33ba64736f6c63430005100032',
      deployedBytecode:
        '0x608060405234801561001057600080fd5b50600436106100415760003560e01c8063111002aa146100465780638d977672146100ee578063b6cb58a514610195575b600080fd5b6100ec6004803603602081101561005c57600080fd5b81019060208101813564010000000081111561007757600080fd5b82018360208201111561008957600080fd5b803590602001918460018302840111640100000000831117156100ab57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506101af945050505050565b005b61010b6004803603602081101561010457600080fd5b503561021b565b604051808481526020018060200183151515158152602001828103825284818151815260200191508051906020019080838360005b83811015610158578181015183820152602001610140565b50505050905090810190601f1680156101855780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b61019d6102ca565b60408051918252519081900360200190f35b60008054600190810180835560408051606081018252828152602080820187815282840187905293865284815291909420845181559151805192936101fc939085019291909101906102d0565b50604091909101516002909101805460ff191691151591909117905550565b600160208181526000928352604092839020805481840180548651600296821615610100026000190190911695909504601f810185900485028601850190965285855290949193929091908301828280156102b75780601f1061028c576101008083540402835291602001916102b7565b820191906000526020600020905b81548152906001019060200180831161029a57829003601f168201915b5050506002909301549192505060ff1683565b60005481565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061031157805160ff191683800117855561033e565b8280016001018555821561033e579182015b8281111561033e578251825591602001919060010190610323565b5061034a92915061034e565b5090565b61036891905b8082111561034a5760008155600101610354565b9056fea265627a7a72315820b1b6a42ee50f9a903ad662b890ce506f569dbf6596f6cec006685085a6ac33ba64736f6c63430005100032',
      sourceMap:
        '69:429:1:-;;;220:1;193:28;;276:65;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;308:25:1;;;;;;;;;;;;-1:-1:-1;;;308:25:1;;;;;;-1:-1:-1;;;;;308:10:1;:25;:::i;:::-;69:429;;349:146;411:9;:14;;424:1;411:14;;;;;;455:32;;;;;;;;;;;;;;;;;;;;;;;;436:16;;;;;;;;;;:51;;;;;;;;:16;;:51;;;;;;;;;;;;:::i;:::-;-1:-1:-1;436:51:1;;;;;;;;;;;;-1:-1:-1;;436:51:1;;;;;;;;;;-1:-1:-1;349:146:1:o;69:429::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;69:429:1;;;-1:-1:-1;69:429:1;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;',
      deployedSourceMap:
        '69:429:1:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;69:429:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;349:146;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;349:146:1;;;;;;;;21:11:-1;5:28;;2:2;;;46:1;43;36:12;2:2;349:146:1;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;349:146:1;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;349:146:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;81:16;;74:27;;;;-1:-1;349:146:1;;-1:-1:-1;349:146:1;;-1:-1:-1;;;;;349:146:1:i;:::-;;230:37;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;230:37:1;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;230:37:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;193:28;;;:::i;:::-;;;;;;;;;;;;;;;;349:146;411:9;:14;;424:1;411:14;;;;;;455:32;;;;;;;;;;;;;;;;;;;;;;;;436:16;;;;;;;;;;:51;;;;;;;;:16;;:51;;;;;;;;;;;;:::i;:::-;-1:-1:-1;436:51:1;;;;;;;;;;;;-1:-1:-1;;436:51:1;;;;;;;;;;-1:-1:-1;349:146:1:o;230:37::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;230:37:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;230:37:1;;;;;;;-1:-1:-1;;230:37:1;;;:::o;193:28::-;;;;:::o;69:429::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;69:429:1;;;-1:-1:-1;69:429:1;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;:::o',
      source:
        '// SPDX-License-Identifier: MIT\r\npragma solidity >=0.4.22 <0.8.0;\r\n\r\ncontract TodoList {\r\n    struct Task {\r\n        uint256 id;\r\n        string content;\r\n        bool completed;\r\n    }\r\n\r\n    uint256 public taskCount = 0;\r\n\r\n    mapping(uint256 => Task) public tasks;\r\n\r\n    constructor() public {\r\n        createTask("Hello World");\r\n    }\r\n\r\n    function createTask(string memory _content) public {\r\n        taskCount += 1;\r\n        tasks[taskCount] = Task(taskCount, _content, false);\r\n    }\r\n}\r\n',
      sourcePath: 'E:/github/smartcontract/contracts/TodoList.sol',
      ast: {
        absolutePath: '/E/github/smartcontract/contracts/TodoList.sol',
        exportedSymbols: {
          TodoList: [77],
        },
        id: 78,
        nodeType: 'SourceUnit',
        nodes: [
          {
            id: 34,
            literals: ['solidity', '>=', '0.4', '.22', '<', '0.8', '.0'],
            nodeType: 'PragmaDirective',
            src: '33:32:1',
          },
          {
            baseContracts: [],
            contractDependencies: [],
            contractKind: 'contract',
            documentation: null,
            fullyImplemented: true,
            id: 77,
            linearizedBaseContracts: [77],
            name: 'TodoList',
            nodeType: 'ContractDefinition',
            nodes: [
              {
                canonicalName: 'TodoList.Task',
                id: 41,
                members: [
                  {
                    constant: false,
                    id: 36,
                    name: 'id',
                    nodeType: 'VariableDeclaration',
                    scope: 41,
                    src: '117:10:1',
                    stateVariable: false,
                    storageLocation: 'default',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                    typeName: {
                      id: 35,
                      name: 'uint256',
                      nodeType: 'ElementaryTypeName',
                      src: '117:7:1',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    value: null,
                    visibility: 'internal',
                  },
                  {
                    constant: false,
                    id: 38,
                    name: 'content',
                    nodeType: 'VariableDeclaration',
                    scope: 41,
                    src: '138:14:1',
                    stateVariable: false,
                    storageLocation: 'default',
                    typeDescriptions: {
                      typeIdentifier: 't_string_storage_ptr',
                      typeString: 'string',
                    },
                    typeName: {
                      id: 37,
                      name: 'string',
                      nodeType: 'ElementaryTypeName',
                      src: '138:6:1',
                      typeDescriptions: {
                        typeIdentifier: 't_string_storage_ptr',
                        typeString: 'string',
                      },
                    },
                    value: null,
                    visibility: 'internal',
                  },
                  {
                    constant: false,
                    id: 40,
                    name: 'completed',
                    nodeType: 'VariableDeclaration',
                    scope: 41,
                    src: '163:14:1',
                    stateVariable: false,
                    storageLocation: 'default',
                    typeDescriptions: {
                      typeIdentifier: 't_bool',
                      typeString: 'bool',
                    },
                    typeName: {
                      id: 39,
                      name: 'bool',
                      nodeType: 'ElementaryTypeName',
                      src: '163:4:1',
                      typeDescriptions: {
                        typeIdentifier: 't_bool',
                        typeString: 'bool',
                      },
                    },
                    value: null,
                    visibility: 'internal',
                  },
                ],
                name: 'Task',
                nodeType: 'StructDefinition',
                scope: 77,
                src: '94:91:1',
                visibility: 'public',
              },
              {
                constant: false,
                id: 44,
                name: 'taskCount',
                nodeType: 'VariableDeclaration',
                scope: 77,
                src: '193:28:1',
                stateVariable: true,
                storageLocation: 'default',
                typeDescriptions: {
                  typeIdentifier: 't_uint256',
                  typeString: 'uint256',
                },
                typeName: {
                  id: 42,
                  name: 'uint256',
                  nodeType: 'ElementaryTypeName',
                  src: '193:7:1',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                },
                value: {
                  argumentTypes: null,
                  hexValue: '30',
                  id: 43,
                  isConstant: false,
                  isLValue: false,
                  isPure: true,
                  kind: 'number',
                  lValueRequested: false,
                  nodeType: 'Literal',
                  src: '220:1:1',
                  subdenomination: null,
                  typeDescriptions: {
                    typeIdentifier: 't_rational_0_by_1',
                    typeString: 'int_const 0',
                  },
                  value: '0',
                },
                visibility: 'public',
              },
              {
                constant: false,
                id: 48,
                name: 'tasks',
                nodeType: 'VariableDeclaration',
                scope: 77,
                src: '230:37:1',
                stateVariable: true,
                storageLocation: 'default',
                typeDescriptions: {
                  typeIdentifier:
                    't_mapping$_t_uint256_$_t_struct$_Task_$41_storage_$',
                  typeString: 'mapping(uint256 => struct TodoList.Task)',
                },
                typeName: {
                  id: 47,
                  keyType: {
                    id: 45,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '238:7:1',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  nodeType: 'Mapping',
                  src: '230:24:1',
                  typeDescriptions: {
                    typeIdentifier:
                      't_mapping$_t_uint256_$_t_struct$_Task_$41_storage_$',
                    typeString: 'mapping(uint256 => struct TodoList.Task)',
                  },
                  valueType: {
                    contractScope: null,
                    id: 46,
                    name: 'Task',
                    nodeType: 'UserDefinedTypeName',
                    referencedDeclaration: 41,
                    src: '249:4:1',
                    typeDescriptions: {
                      typeIdentifier: 't_struct$_Task_$41_storage_ptr',
                      typeString: 'struct TodoList.Task',
                    },
                  },
                },
                value: null,
                visibility: 'public',
              },
              {
                body: {
                  id: 55,
                  nodeType: 'Block',
                  src: '297:44:1',
                  statements: [
                    {
                      expression: {
                        argumentTypes: null,
                        arguments: [
                          {
                            argumentTypes: null,
                            hexValue: '48656c6c6f20576f726c64',
                            id: 52,
                            isConstant: false,
                            isLValue: false,
                            isPure: true,
                            kind: 'string',
                            lValueRequested: false,
                            nodeType: 'Literal',
                            src: '319:13:1',
                            subdenomination: null,
                            typeDescriptions: {
                              typeIdentifier:
                                't_stringliteral_592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba',
                              typeString: 'literal_string "Hello World"',
                            },
                            value: 'Hello World',
                          },
                        ],
                        expression: {
                          argumentTypes: [
                            {
                              typeIdentifier:
                                't_stringliteral_592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba',
                              typeString: 'literal_string "Hello World"',
                            },
                          ],
                          id: 51,
                          name: 'createTask',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 76,
                          src: '308:10:1',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_internal_nonpayable$_t_string_memory_ptr_$returns$__$',
                            typeString: 'function (string memory)',
                          },
                        },
                        id: 53,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '308:25:1',
                        typeDescriptions: {
                          typeIdentifier: 't_tuple$__$',
                          typeString: 'tuple()',
                        },
                      },
                      id: 54,
                      nodeType: 'ExpressionStatement',
                      src: '308:25:1',
                    },
                  ],
                },
                documentation: null,
                id: 56,
                implemented: true,
                kind: 'constructor',
                modifiers: [],
                name: '',
                nodeType: 'FunctionDefinition',
                parameters: {
                  id: 49,
                  nodeType: 'ParameterList',
                  parameters: [],
                  src: '287:2:1',
                },
                returnParameters: {
                  id: 50,
                  nodeType: 'ParameterList',
                  parameters: [],
                  src: '297:0:1',
                },
                scope: 77,
                src: '276:65:1',
                stateMutability: 'nonpayable',
                superFunction: null,
                visibility: 'public',
              },
              {
                body: {
                  id: 75,
                  nodeType: 'Block',
                  src: '400:95:1',
                  statements: [
                    {
                      expression: {
                        argumentTypes: null,
                        id: 63,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        leftHandSide: {
                          argumentTypes: null,
                          id: 61,
                          name: 'taskCount',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 44,
                          src: '411:9:1',
                          typeDescriptions: {
                            typeIdentifier: 't_uint256',
                            typeString: 'uint256',
                          },
                        },
                        nodeType: 'Assignment',
                        operator: '+=',
                        rightHandSide: {
                          argumentTypes: null,
                          hexValue: '31',
                          id: 62,
                          isConstant: false,
                          isLValue: false,
                          isPure: true,
                          kind: 'number',
                          lValueRequested: false,
                          nodeType: 'Literal',
                          src: '424:1:1',
                          subdenomination: null,
                          typeDescriptions: {
                            typeIdentifier: 't_rational_1_by_1',
                            typeString: 'int_const 1',
                          },
                          value: '1',
                        },
                        src: '411:14:1',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                      id: 64,
                      nodeType: 'ExpressionStatement',
                      src: '411:14:1',
                    },
                    {
                      expression: {
                        argumentTypes: null,
                        id: 73,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        leftHandSide: {
                          argumentTypes: null,
                          baseExpression: {
                            argumentTypes: null,
                            id: 65,
                            name: 'tasks',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 48,
                            src: '436:5:1',
                            typeDescriptions: {
                              typeIdentifier:
                                't_mapping$_t_uint256_$_t_struct$_Task_$41_storage_$',
                              typeString:
                                'mapping(uint256 => struct TodoList.Task storage ref)',
                            },
                          },
                          id: 67,
                          indexExpression: {
                            argumentTypes: null,
                            id: 66,
                            name: 'taskCount',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 44,
                            src: '442:9:1',
                            typeDescriptions: {
                              typeIdentifier: 't_uint256',
                              typeString: 'uint256',
                            },
                          },
                          isConstant: false,
                          isLValue: true,
                          isPure: false,
                          lValueRequested: true,
                          nodeType: 'IndexAccess',
                          src: '436:16:1',
                          typeDescriptions: {
                            typeIdentifier: 't_struct$_Task_$41_storage',
                            typeString: 'struct TodoList.Task storage ref',
                          },
                        },
                        nodeType: 'Assignment',
                        operator: '=',
                        rightHandSide: {
                          argumentTypes: null,
                          arguments: [
                            {
                              argumentTypes: null,
                              id: 69,
                              name: 'taskCount',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 44,
                              src: '460:9:1',
                              typeDescriptions: {
                                typeIdentifier: 't_uint256',
                                typeString: 'uint256',
                              },
                            },
                            {
                              argumentTypes: null,
                              id: 70,
                              name: '_content',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 58,
                              src: '471:8:1',
                              typeDescriptions: {
                                typeIdentifier: 't_string_memory_ptr',
                                typeString: 'string memory',
                              },
                            },
                            {
                              argumentTypes: null,
                              hexValue: '66616c7365',
                              id: 71,
                              isConstant: false,
                              isLValue: false,
                              isPure: true,
                              kind: 'bool',
                              lValueRequested: false,
                              nodeType: 'Literal',
                              src: '481:5:1',
                              subdenomination: null,
                              typeDescriptions: {
                                typeIdentifier: 't_bool',
                                typeString: 'bool',
                              },
                              value: 'false',
                            },
                          ],
                          expression: {
                            argumentTypes: [
                              {
                                typeIdentifier: 't_uint256',
                                typeString: 'uint256',
                              },
                              {
                                typeIdentifier: 't_string_memory_ptr',
                                typeString: 'string memory',
                              },
                              {
                                typeIdentifier: 't_bool',
                                typeString: 'bool',
                              },
                            ],
                            id: 68,
                            name: 'Task',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 41,
                            src: '455:4:1',
                            typeDescriptions: {
                              typeIdentifier:
                                't_type$_t_struct$_Task_$41_storage_ptr_$',
                              typeString:
                                'type(struct TodoList.Task storage pointer)',
                            },
                          },
                          id: 72,
                          isConstant: false,
                          isLValue: false,
                          isPure: false,
                          kind: 'structConstructorCall',
                          lValueRequested: false,
                          names: [],
                          nodeType: 'FunctionCall',
                          src: '455:32:1',
                          typeDescriptions: {
                            typeIdentifier: 't_struct$_Task_$41_memory',
                            typeString: 'struct TodoList.Task memory',
                          },
                        },
                        src: '436:51:1',
                        typeDescriptions: {
                          typeIdentifier: 't_struct$_Task_$41_storage',
                          typeString: 'struct TodoList.Task storage ref',
                        },
                      },
                      id: 74,
                      nodeType: 'ExpressionStatement',
                      src: '436:51:1',
                    },
                  ],
                },
                documentation: null,
                id: 76,
                implemented: true,
                kind: 'function',
                modifiers: [],
                name: 'createTask',
                nodeType: 'FunctionDefinition',
                parameters: {
                  id: 59,
                  nodeType: 'ParameterList',
                  parameters: [
                    {
                      constant: false,
                      id: 58,
                      name: '_content',
                      nodeType: 'VariableDeclaration',
                      scope: 76,
                      src: '369:22:1',
                      stateVariable: false,
                      storageLocation: 'memory',
                      typeDescriptions: {
                        typeIdentifier: 't_string_memory_ptr',
                        typeString: 'string',
                      },
                      typeName: {
                        id: 57,
                        name: 'string',
                        nodeType: 'ElementaryTypeName',
                        src: '369:6:1',
                        typeDescriptions: {
                          typeIdentifier: 't_string_storage_ptr',
                          typeString: 'string',
                        },
                      },
                      value: null,
                      visibility: 'internal',
                    },
                  ],
                  src: '368:24:1',
                },
                returnParameters: {
                  id: 60,
                  nodeType: 'ParameterList',
                  parameters: [],
                  src: '400:0:1',
                },
                scope: 77,
                src: '349:146:1',
                stateMutability: 'nonpayable',
                superFunction: null,
                visibility: 'public',
              },
            ],
            scope: 78,
            src: '69:429:1',
          },
        ],
        src: '33:467:1',
      },
      legacyAST: {
        absolutePath: '/E/github/smartcontract/contracts/TodoList.sol',
        exportedSymbols: {
          TodoList: [77],
        },
        id: 78,
        nodeType: 'SourceUnit',
        nodes: [
          {
            id: 34,
            literals: ['solidity', '>=', '0.4', '.22', '<', '0.8', '.0'],
            nodeType: 'PragmaDirective',
            src: '33:32:1',
          },
          {
            baseContracts: [],
            contractDependencies: [],
            contractKind: 'contract',
            documentation: null,
            fullyImplemented: true,
            id: 77,
            linearizedBaseContracts: [77],
            name: 'TodoList',
            nodeType: 'ContractDefinition',
            nodes: [
              {
                canonicalName: 'TodoList.Task',
                id: 41,
                members: [
                  {
                    constant: false,
                    id: 36,
                    name: 'id',
                    nodeType: 'VariableDeclaration',
                    scope: 41,
                    src: '117:10:1',
                    stateVariable: false,
                    storageLocation: 'default',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                    typeName: {
                      id: 35,
                      name: 'uint256',
                      nodeType: 'ElementaryTypeName',
                      src: '117:7:1',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    value: null,
                    visibility: 'internal',
                  },
                  {
                    constant: false,
                    id: 38,
                    name: 'content',
                    nodeType: 'VariableDeclaration',
                    scope: 41,
                    src: '138:14:1',
                    stateVariable: false,
                    storageLocation: 'default',
                    typeDescriptions: {
                      typeIdentifier: 't_string_storage_ptr',
                      typeString: 'string',
                    },
                    typeName: {
                      id: 37,
                      name: 'string',
                      nodeType: 'ElementaryTypeName',
                      src: '138:6:1',
                      typeDescriptions: {
                        typeIdentifier: 't_string_storage_ptr',
                        typeString: 'string',
                      },
                    },
                    value: null,
                    visibility: 'internal',
                  },
                  {
                    constant: false,
                    id: 40,
                    name: 'completed',
                    nodeType: 'VariableDeclaration',
                    scope: 41,
                    src: '163:14:1',
                    stateVariable: false,
                    storageLocation: 'default',
                    typeDescriptions: {
                      typeIdentifier: 't_bool',
                      typeString: 'bool',
                    },
                    typeName: {
                      id: 39,
                      name: 'bool',
                      nodeType: 'ElementaryTypeName',
                      src: '163:4:1',
                      typeDescriptions: {
                        typeIdentifier: 't_bool',
                        typeString: 'bool',
                      },
                    },
                    value: null,
                    visibility: 'internal',
                  },
                ],
                name: 'Task',
                nodeType: 'StructDefinition',
                scope: 77,
                src: '94:91:1',
                visibility: 'public',
              },
              {
                constant: false,
                id: 44,
                name: 'taskCount',
                nodeType: 'VariableDeclaration',
                scope: 77,
                src: '193:28:1',
                stateVariable: true,
                storageLocation: 'default',
                typeDescriptions: {
                  typeIdentifier: 't_uint256',
                  typeString: 'uint256',
                },
                typeName: {
                  id: 42,
                  name: 'uint256',
                  nodeType: 'ElementaryTypeName',
                  src: '193:7:1',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                },
                value: {
                  argumentTypes: null,
                  hexValue: '30',
                  id: 43,
                  isConstant: false,
                  isLValue: false,
                  isPure: true,
                  kind: 'number',
                  lValueRequested: false,
                  nodeType: 'Literal',
                  src: '220:1:1',
                  subdenomination: null,
                  typeDescriptions: {
                    typeIdentifier: 't_rational_0_by_1',
                    typeString: 'int_const 0',
                  },
                  value: '0',
                },
                visibility: 'public',
              },
              {
                constant: false,
                id: 48,
                name: 'tasks',
                nodeType: 'VariableDeclaration',
                scope: 77,
                src: '230:37:1',
                stateVariable: true,
                storageLocation: 'default',
                typeDescriptions: {
                  typeIdentifier:
                    't_mapping$_t_uint256_$_t_struct$_Task_$41_storage_$',
                  typeString: 'mapping(uint256 => struct TodoList.Task)',
                },
                typeName: {
                  id: 47,
                  keyType: {
                    id: 45,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '238:7:1',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  nodeType: 'Mapping',
                  src: '230:24:1',
                  typeDescriptions: {
                    typeIdentifier:
                      't_mapping$_t_uint256_$_t_struct$_Task_$41_storage_$',
                    typeString: 'mapping(uint256 => struct TodoList.Task)',
                  },
                  valueType: {
                    contractScope: null,
                    id: 46,
                    name: 'Task',
                    nodeType: 'UserDefinedTypeName',
                    referencedDeclaration: 41,
                    src: '249:4:1',
                    typeDescriptions: {
                      typeIdentifier: 't_struct$_Task_$41_storage_ptr',
                      typeString: 'struct TodoList.Task',
                    },
                  },
                },
                value: null,
                visibility: 'public',
              },
              {
                body: {
                  id: 55,
                  nodeType: 'Block',
                  src: '297:44:1',
                  statements: [
                    {
                      expression: {
                        argumentTypes: null,
                        arguments: [
                          {
                            argumentTypes: null,
                            hexValue: '48656c6c6f20576f726c64',
                            id: 52,
                            isConstant: false,
                            isLValue: false,
                            isPure: true,
                            kind: 'string',
                            lValueRequested: false,
                            nodeType: 'Literal',
                            src: '319:13:1',
                            subdenomination: null,
                            typeDescriptions: {
                              typeIdentifier:
                                't_stringliteral_592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba',
                              typeString: 'literal_string "Hello World"',
                            },
                            value: 'Hello World',
                          },
                        ],
                        expression: {
                          argumentTypes: [
                            {
                              typeIdentifier:
                                't_stringliteral_592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba',
                              typeString: 'literal_string "Hello World"',
                            },
                          ],
                          id: 51,
                          name: 'createTask',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 76,
                          src: '308:10:1',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_internal_nonpayable$_t_string_memory_ptr_$returns$__$',
                            typeString: 'function (string memory)',
                          },
                        },
                        id: 53,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '308:25:1',
                        typeDescriptions: {
                          typeIdentifier: 't_tuple$__$',
                          typeString: 'tuple()',
                        },
                      },
                      id: 54,
                      nodeType: 'ExpressionStatement',
                      src: '308:25:1',
                    },
                  ],
                },
                documentation: null,
                id: 56,
                implemented: true,
                kind: 'constructor',
                modifiers: [],
                name: '',
                nodeType: 'FunctionDefinition',
                parameters: {
                  id: 49,
                  nodeType: 'ParameterList',
                  parameters: [],
                  src: '287:2:1',
                },
                returnParameters: {
                  id: 50,
                  nodeType: 'ParameterList',
                  parameters: [],
                  src: '297:0:1',
                },
                scope: 77,
                src: '276:65:1',
                stateMutability: 'nonpayable',
                superFunction: null,
                visibility: 'public',
              },
              {
                body: {
                  id: 75,
                  nodeType: 'Block',
                  src: '400:95:1',
                  statements: [
                    {
                      expression: {
                        argumentTypes: null,
                        id: 63,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        leftHandSide: {
                          argumentTypes: null,
                          id: 61,
                          name: 'taskCount',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 44,
                          src: '411:9:1',
                          typeDescriptions: {
                            typeIdentifier: 't_uint256',
                            typeString: 'uint256',
                          },
                        },
                        nodeType: 'Assignment',
                        operator: '+=',
                        rightHandSide: {
                          argumentTypes: null,
                          hexValue: '31',
                          id: 62,
                          isConstant: false,
                          isLValue: false,
                          isPure: true,
                          kind: 'number',
                          lValueRequested: false,
                          nodeType: 'Literal',
                          src: '424:1:1',
                          subdenomination: null,
                          typeDescriptions: {
                            typeIdentifier: 't_rational_1_by_1',
                            typeString: 'int_const 1',
                          },
                          value: '1',
                        },
                        src: '411:14:1',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                      id: 64,
                      nodeType: 'ExpressionStatement',
                      src: '411:14:1',
                    },
                    {
                      expression: {
                        argumentTypes: null,
                        id: 73,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        leftHandSide: {
                          argumentTypes: null,
                          baseExpression: {
                            argumentTypes: null,
                            id: 65,
                            name: 'tasks',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 48,
                            src: '436:5:1',
                            typeDescriptions: {
                              typeIdentifier:
                                't_mapping$_t_uint256_$_t_struct$_Task_$41_storage_$',
                              typeString:
                                'mapping(uint256 => struct TodoList.Task storage ref)',
                            },
                          },
                          id: 67,
                          indexExpression: {
                            argumentTypes: null,
                            id: 66,
                            name: 'taskCount',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 44,
                            src: '442:9:1',
                            typeDescriptions: {
                              typeIdentifier: 't_uint256',
                              typeString: 'uint256',
                            },
                          },
                          isConstant: false,
                          isLValue: true,
                          isPure: false,
                          lValueRequested: true,
                          nodeType: 'IndexAccess',
                          src: '436:16:1',
                          typeDescriptions: {
                            typeIdentifier: 't_struct$_Task_$41_storage',
                            typeString: 'struct TodoList.Task storage ref',
                          },
                        },
                        nodeType: 'Assignment',
                        operator: '=',
                        rightHandSide: {
                          argumentTypes: null,
                          arguments: [
                            {
                              argumentTypes: null,
                              id: 69,
                              name: 'taskCount',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 44,
                              src: '460:9:1',
                              typeDescriptions: {
                                typeIdentifier: 't_uint256',
                                typeString: 'uint256',
                              },
                            },
                            {
                              argumentTypes: null,
                              id: 70,
                              name: '_content',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 58,
                              src: '471:8:1',
                              typeDescriptions: {
                                typeIdentifier: 't_string_memory_ptr',
                                typeString: 'string memory',
                              },
                            },
                            {
                              argumentTypes: null,
                              hexValue: '66616c7365',
                              id: 71,
                              isConstant: false,
                              isLValue: false,
                              isPure: true,
                              kind: 'bool',
                              lValueRequested: false,
                              nodeType: 'Literal',
                              src: '481:5:1',
                              subdenomination: null,
                              typeDescriptions: {
                                typeIdentifier: 't_bool',
                                typeString: 'bool',
                              },
                              value: 'false',
                            },
                          ],
                          expression: {
                            argumentTypes: [
                              {
                                typeIdentifier: 't_uint256',
                                typeString: 'uint256',
                              },
                              {
                                typeIdentifier: 't_string_memory_ptr',
                                typeString: 'string memory',
                              },
                              {
                                typeIdentifier: 't_bool',
                                typeString: 'bool',
                              },
                            ],
                            id: 68,
                            name: 'Task',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 41,
                            src: '455:4:1',
                            typeDescriptions: {
                              typeIdentifier:
                                't_type$_t_struct$_Task_$41_storage_ptr_$',
                              typeString:
                                'type(struct TodoList.Task storage pointer)',
                            },
                          },
                          id: 72,
                          isConstant: false,
                          isLValue: false,
                          isPure: false,
                          kind: 'structConstructorCall',
                          lValueRequested: false,
                          names: [],
                          nodeType: 'FunctionCall',
                          src: '455:32:1',
                          typeDescriptions: {
                            typeIdentifier: 't_struct$_Task_$41_memory',
                            typeString: 'struct TodoList.Task memory',
                          },
                        },
                        src: '436:51:1',
                        typeDescriptions: {
                          typeIdentifier: 't_struct$_Task_$41_storage',
                          typeString: 'struct TodoList.Task storage ref',
                        },
                      },
                      id: 74,
                      nodeType: 'ExpressionStatement',
                      src: '436:51:1',
                    },
                  ],
                },
                documentation: null,
                id: 76,
                implemented: true,
                kind: 'function',
                modifiers: [],
                name: 'createTask',
                nodeType: 'FunctionDefinition',
                parameters: {
                  id: 59,
                  nodeType: 'ParameterList',
                  parameters: [
                    {
                      constant: false,
                      id: 58,
                      name: '_content',
                      nodeType: 'VariableDeclaration',
                      scope: 76,
                      src: '369:22:1',
                      stateVariable: false,
                      storageLocation: 'memory',
                      typeDescriptions: {
                        typeIdentifier: 't_string_memory_ptr',
                        typeString: 'string',
                      },
                      typeName: {
                        id: 57,
                        name: 'string',
                        nodeType: 'ElementaryTypeName',
                        src: '369:6:1',
                        typeDescriptions: {
                          typeIdentifier: 't_string_storage_ptr',
                          typeString: 'string',
                        },
                      },
                      value: null,
                      visibility: 'internal',
                    },
                  ],
                  src: '368:24:1',
                },
                returnParameters: {
                  id: 60,
                  nodeType: 'ParameterList',
                  parameters: [],
                  src: '400:0:1',
                },
                scope: 77,
                src: '349:146:1',
                stateMutability: 'nonpayable',
                superFunction: null,
                visibility: 'public',
              },
            ],
            scope: 78,
            src: '69:429:1',
          },
        ],
        src: '33:467:1',
      },
      compiler: {
        name: 'solc',
        version: '0.5.16+commit.9c3226ce.Emscripten.clang',
      },
      networks: {
        5777: {
          events: {},
          links: {},
          address: '0x21120C15364237aaAF6f1c88858889E6991DbC89',
          transactionHash:
            '0x9df21801beb7408a9c5ba2b26dfc01b7cf6e336a046aa3db6e2ef05088ebd55e',
        },
      },
      schemaVersion: '3.3.0',
      updatedAt: '2020-10-16T09:07:52.318Z',
      networkType: 'ethereum',
      devdoc: {
        methods: {},
      },
      userdoc: {
        methods: {},
      },
    }
    App.contracts.TodoList = TruffleContract(todoList)
    App.contracts.TodoList.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.todoList = await App.contracts.TodoList.deployed()
  },

  toggleCompleted: async (e) => {
    App.setLoading(true)
    const taskId = e.target.name
    await App.todoList.toggleCompleted(taskId)
    window.location.reload()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Tasks
    await App.renderTasks()

    // Update loading state
    App.setLoading(false)
  },

  renderTasks: async () => {
    // Load the total task count from the blockchain
    const taskCount = await App.todoList.taskCount()
    const $taskTemplate = $('.taskTemplate')

    // Render out each task with a new task template
    for (var i = 1; i <= taskCount; i++) {
      // Fetch the task data from the blockchain
      const task = await App.todoList.tasks(i)
      const taskId = task[0].toNumber()
      const taskContent = task[1]
      const taskCompleted = task[2]

      // Create the html for the task
      const $newTaskTemplate = $taskTemplate.clone()
      $newTaskTemplate.find('.content').html(taskContent)
      $newTaskTemplate
        .find('input')
        .prop('name', taskId)
        .prop('checked', taskCompleted)
      // .on('click', App.toggleCompleted)
      $newTaskTemplate
        .find('input')
        .prop('name', taskId)
        .prop('checked', taskCompleted)
        .on('click', App.toggleCompleted)
      // Put the task in the correct list
      if (taskCompleted) {
        $('#completedTaskList').append($newTaskTemplate)
      } else {
        $('#taskList').append($newTaskTemplate)
      }

      // Show the task
      $newTaskTemplate.show()
    }
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  },

  createTask: async () => {
    App.setLoading(true)
    const content = $('#newTask').val()
    await App.todoList.createTask(content)
    window.location.reload()
  },
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
