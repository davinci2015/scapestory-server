const PLANTS_TABLE = 'Plants'

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(t =>
            Promise.all([
                queryInterface.addColumn(PLANTS_TABLE, 'infoFulfilled', {
                    type: Sequelize.DataTypes.BOOLEAN,
                    defaultValue: false,
                }),
            ])
        )
    },
    down(queryInterface) {
        return queryInterface.sequelize.transaction(t =>
            Promise.all([
                queryInterface.removeColumn(PLANTS_TABLE, 'infoFulfilled', {transaction: t}),
            ])
        )
    },
}
