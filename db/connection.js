import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize('MusicDB', 'postgres', 'admin', {
    host: process.env.HOST,
    dialect: 'postgres',
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
})

try {
    await sequelize.authenticate()
    console.log('Соединение с БД было успешно установлено')
} catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e)
}
export const UserInfo = sequelize.define('userinfo', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_name: {
        type: DataTypes.STRING(255)
    },
    user_email: DataTypes.STRING(255),
    user_password: DataTypes.STRING(255),
    user_picture: DataTypes.BLOB,
}, { freezeTableName: true, timestamps: false});
UserInfo.sync({ force: false })

export const FavoriteTracks = sequelize.define('favoritetracks', {
    favoritetracks_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'userinfo',
            key: 'user_id',
        }
    },
    music_id: {
        type: DataTypes.INTEGER
    },
}, { freezeTableName: true, timestamps: false });
FavoriteTracks.sync({ force: false })

export const Music = sequelize.define('music', {
    music_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    music_name: DataTypes.STRING(255),
    music_author: DataTypes.STRING(255),
    music_file: DataTypes.BLOB,
    music_picture: DataTypes.BLOB,
}, { freezeTableName: true, timestamps: false });
Music.sync({ force: false })

