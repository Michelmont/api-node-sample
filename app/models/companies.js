module.exports = function(sequelize, Sequelize) {

    var Companies = sequelize.define('companies', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        company_name: {
            type: Sequelize.TEXT,
        },
        company_cnpj: {
            type: Sequelize.TEXT,
        },

        company_economic_group: {
            type: Sequelize.INTEGER
        },
        company_credits: {
            type: Sequelize.DECIMAL
        }
    }, {

    timestamps: true
});

    return Companies;

}
