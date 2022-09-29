"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
  Add altering commands here.
 Return a promise to correctly handle asynchronicity.

 Example:
  return queryInterface.createTable('users', { id: 
  Sequelize.INTEGER });
*/
    return Promise.all([
      queryInterface.removeColumn("commandes", "isdeleted", Sequelize.INTEGER)
   //   queryInterface.addColumn("commandes", "isdeleted", Sequelize.BOOLEAN),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
 Add reverting commands here.
  Return a promise to correctly handle asynchronicity.

   Example:
    return queryInterface.dropTable('users');
*/
    return queryInterface.dropTable("products");
  },
};
