const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define(
        "account",
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },            first_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            time_worked: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false,
                defaultValue: 0
            },
            wage: {
                type: DataTypes.DECIMAL(6,2),
                allowNull: false
            },
            total_time: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false,
                defaultValue: 0
            },
            total_earnings: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false,
                defaultValue: 0
            }

        },
        {
            freezeTableName: true
        }
    );

    Account.generateHash = async (password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }
    Account.validPassword = (inputPwd, dbPwd) => {
        return bcrypt.compareSync(inputPwd, dbPwd);
    };


    return Account;
};