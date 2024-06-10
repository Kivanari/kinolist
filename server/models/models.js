const sequelize = require('../db')
const {DataTypes} = require('sequelize')


// Модель User
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Первичный ключ, автоинкремент
    username: { type: DataTypes.STRING, unique: true, allowNull: false }, // Уникальное имя пользователя
    email: { type: DataTypes.STRING, unique: true, allowNull: false }, // Уникальный адрес электронной почты
    hashed_password: { type: DataTypes.STRING, allowNull: false }, // Хэшированный пароль
    role: { type: DataTypes.STRING, defaultValue: "USER" } // Роль пользователя, по умолчанию "USER"
});

// Модель Movie
const Movie = sequelize.define('movie', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Первичный ключ, автоинкремент
    title: { type: DataTypes.STRING, allowNull: false }, // Название фильма
    description: { type: DataTypes.TEXT, allowNull: false }, // Описание фильма
    year: { type: DataTypes.INTEGER, allowNull: false }, // Год выпуска фильма
    rating: { type: DataTypes.FLOAT, allowNull: false }, // Рейтинг фильма
    runtime: { type: DataTypes.INTEGER, allowNull: false }, // Хронометраж фильма в минутах
    poster_url: { type: DataTypes.STRING, allowNull: false } // URL-адрес обложки фильма
});

// Модель Review
const Review = sequelize.define('review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Первичный ключ, автоинкремент
    text: { type: DataTypes.TEXT, allowNull: false }, // Текст отзыва
    rating: { type: DataTypes.FLOAT, allowNull: false } // Оценка фильма
});

// Модель UserMovie
const UserMovie = sequelize.define('user_movie', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Первичный ключ, автоинкремент
    status: { type: DataTypes.STRING, allowNull: false } // Статус фильма (например, "watched" или "to_watch")
});

// Модель Genre
const Genre = sequelize.define('genre', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Первичный ключ, автоинкремент
    name: { type: DataTypes.STRING, unique: true, allowNull: false } // Название жанра
});

// Модель MovieGenre
const MovieGenre = sequelize.define('movie_genre', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true } // Первичный ключ, автоинкремент
});

// Определение связей между моделями

// Связи для модели Review
User.hasMany(Review, { foreignKey: 'user_id' }); // Один пользователь может иметь много отзывов
Review.belongsTo(User, { foreignKey: 'user_id' }); // Один отзыв принадлежит одному пользователю

Movie.hasMany(Review, { foreignKey: 'movie_id' }); // Один фильм может иметь много отзывов
Review.belongsTo(Movie, { foreignKey: 'movie_id' }); // Один отзыв принадлежит одному фильму

// Связи для модели UserMovie
User.hasMany(UserMovie, { foreignKey: 'user_id' }); // Один пользователь может иметь много записей в списке фильмов
UserMovie.belongsTo(User, { foreignKey: 'user_id' }); // Одна запись в списке фильмов принадлежит одному пользователю

Movie.hasMany(UserMovie, { foreignKey: 'movie_id' }); // Один фильм может находиться в списке у многих пользователей
UserMovie.belongsTo(Movie, { foreignKey: 'movie_id' }); // Одна запись в списке фильмов принадлежит одному фильму

// Связи для модели MovieGenre
Movie.belongsToMany(Genre, { through: MovieGenre, foreignKey: 'movie_id' }); // Один фильм может иметь много жанров
Genre.belongsToMany(Movie, { through: MovieGenre, foreignKey: 'genre_id' }); // Один жанр может быть у многих фильмов

// Экспорт моделей и соединения
module.exports = {
    sequelize, // Экспорт соединения с базой данных
    User, // Экспорт модели User
    Movie, // Экспорт модели Movie
    Review, // Экспорт модели Review
    UserMovie, // Экспорт модели UserMovi
    Genre, // Экспорт модели Genre
    MovieGenre // Экспорт модели MovieGenre
};

