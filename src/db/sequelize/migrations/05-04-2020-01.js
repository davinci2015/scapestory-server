const PLANTS_TABLE = 'Plants'

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(t =>
            Promise.all([
                queryInterface.changeColumn(PLANTS_TABLE, 'description', {
                    type: Sequelize.STRING(500),
                }),
            ])
        )
    },
    down(queryInterface) {
        return queryInterface.sequelize.transaction(t =>
            Promise.all([
                queryInterface.changeColumn(PLANTS_TABLE, 'description', {
                    type: Sequelize.STRING(),
                }),
            ])
        )
    },
}
