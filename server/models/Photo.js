module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING
  });

  return Photo;
};
