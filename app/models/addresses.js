module.exports = function(sequelize, Sequelize) {

    var Addresses = sequelize.define('addresses', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        
        address_title: {
            type: Sequelize.TEXT
        },
       
        user_email: {
            type: Sequelize.TEXT,
            notEmpty: true
        },
      company_economic_group: {
            type: Sequelize.INTEGER,
        },

        address_first_name: {
            type: Sequelize.TEXT,
        },

        address_last_name: {
            type: Sequelize.TEXT
        },

        address_empresa:
        {
            type: Sequelize.TEXT
        },

        address_address: {
            type: Sequelize.TEXT
        },
        address_address2: {
            type: Sequelize.TEXT
        },
        address_address3: {
            type: Sequelize.TEXT
        },
        address_address4: {
            type: Sequelize.TEXT
        },
        address_phone: {
            type: Sequelize.TEXT
        },
        address_email: {
            type: Sequelize.TEXT
        },
        address_billing: {
            type: Sequelize.INTEGER
        },
        address_shiping: {
            type: Sequelize.INTEGER
        },
        address_city: {
            type: Sequelize.TEXT,
        },

        address_state: {
            type: Sequelize.TEXT,
        },

        address_postal_code: {
            type: Sequelize.TEXT
        },
//Tipo 1 para entrega e 2 para cobrança
        address_type: {
            type: Sequelize.INTEGER,
        }

    }, {

    timestamps: true
});

    return Addresses;

}
