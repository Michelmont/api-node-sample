module.exports = function(sequelize, Sequelize) {

    var Users = sequelize.define('users', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        user_login: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        user_pass: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        user_nicename: {
            type: Sequelize.TEXT
        },

        user_first_name: {
            type: Sequelize.TEXT
        },

        user_last_name: {
            type: Sequelize.TEXT
        },

        user_status: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },

        user_phone: {
            type: Sequelize.STRING,
            defaultValue: 0
        },

        user_email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        display_name: {
            type: Sequelize.STRING,
        },

        // 1 para help, 2 para BMG, 3 para os dois e 4 para admin
        access_level: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        company_id: {
            type: Sequelize.INTEGER
        },

        is_company_admin: {
            type: Sequelize.BOOLEAN
        },

    }, {

    timestamps: true
});

    return Users;

}
