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
sequelize.sync({ force: false })

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
}, { freezeTableName: true, timestamps: false });
UserInfo.sync({ force: false })

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
}, { freezeTableName: true, timestamps: false, onDelete: 'CASCADE', hook: true });
Music.sync({ force: false })

export const FavoriteTracks = sequelize.define('favoritetracks', {
    favoritetracks_id: {
        onDelete: 'CASCADE',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: {
            model: 'userinfo',
            key: 'user_id',
        }
    },
    music_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
            model: 'music',
            key: 'music_id',
        }
    },
}, { freezeTableName: true, timestamps: false, onDelete: 'CASCADE', hook: true });
FavoriteTracks.sync({ force: false })

export const PlayList = sequelize.define('playlist', {
    playlist_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    playlist_name: {
        type: DataTypes.STRING(255)
    },
    playlist_pic: {
        type: DataTypes.BLOB
    },
}, { freezeTableName: true, timestamps: false, onDelete: 'CASCADE', hook: true });
PlayList.sync({ force: false })

export const PlayListMusic = sequelize.define('playlistmusic', {
    playlist_music_id: {
        onDelete: 'CASCADE',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    playlist_id_mus: {
        onDelete: 'CASCADE',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'playlist',
            key: 'playlist_id',
        }
    },
    music_id: {
        onDelete: 'CASCADE',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'music',
            key: 'music_id',
        }
    }
}, { freezeTableName: true, timestamps: false });
PlayListMusic.sync({ force: false })
