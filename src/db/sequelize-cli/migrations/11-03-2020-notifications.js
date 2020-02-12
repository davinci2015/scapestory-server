const NOTIFICATION_TABLE = 'Notifications'
const NOTIFIERS_TABLE = 'NotificationNotifiers'

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(t => Promise.all([
            queryInterface.createTable(NOTIFICATION_TABLE, {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                likeId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Likes',
                        key: 'id'
                    },
                },
                commentId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Comments',
                        key: 'id'
                    },
                },
                type: {
                    type: Sequelize.INTEGER
                },
                creatorId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Users',
                        key: 'id'
                    },
                    onUpdate: 'cascade',
                    onDelete: 'cascade'
                },
                createdAt: {
                    type: Sequelize.DATE
                },
                updatedAt: {
                    type: Sequelize.DATE
                },
            }, { transaction: t }),

            queryInterface.createTable(NOTIFIERS_TABLE, {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                notifierId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Users',
                        key: 'id'
                    },
                    onUpdate: 'cascade',
                    onDelete: 'cascade'
                },
                status: {
                    type: Sequelize.INTEGER
                },
                notificationId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: NOTIFICATION_TABLE,
                        key: 'id'
                    },
                    onUpdate: 'cascade',
                    onDelete: 'cascade'
                },
                createdAt: {
                    type: Sequelize.DATE
                },
                updatedAt: {
                    type: Sequelize.DATE
                },
            }, { transaction: t })
        ]))
    },
    down(queryInterface) {
        return queryInterface.sequelize.transaction(t => Promise.all([
            queryInterface.dropTable(NOTIFIERS_TABLE, { transaction: t }),
            queryInterface.dropTable(NOTIFICATION_TABLE, { transaction: t }),
        ]))
    }
}