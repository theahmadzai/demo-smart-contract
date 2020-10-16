var TodoList = artifacts.require('./TodoList.sol')

module.exports = (deployer) => {
  deployer.deploy(TodoList)
}
