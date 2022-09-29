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
       queryInterface.addColumn("products", "prixlitre", Sequelize.FLOAT)
     
      /*  queryInterface.removeColumn(
        'Users',
        'email',
         Sequelize.STRING
          )*/
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
