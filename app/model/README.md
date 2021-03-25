# 基础类型定义
https://sequelize.org/master/manual/model-basics.html

Default Values
By default, Sequelize assumes that the default value of a column is NULL. This behavior can be changed by passing a specific defaultValue to the column definition:

sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    defaultValue: "John Doe"
  }
});
Some special values, such as Sequelize.NOW, are also accepted:

sequelize.define('Foo', {
  bar: {
    type: DataTypes.DATETIME,
    defaultValue: Sequelize.NOW
    // This way, the current date/time will be used to populate this column (at the moment of insertion)
  }
});
Data Types
Every column you define in your model must have a data type. Sequelize provides a lot of built-in data types. To access a built-in data type, you must import DataTypes:

const { DataTypes } = require("sequelize"); // Import the built-in data types
Strings
DataTypes.STRING             // VARCHAR(255)
DataTypes.STRING(1234)       // VARCHAR(1234)
DataTypes.STRING.BINARY      // VARCHAR BINARY
DataTypes.TEXT               // TEXT
DataTypes.TEXT('tiny')       // TINYTEXT
DataTypes.CITEXT             // CITEXT          PostgreSQL and SQLite only.
Boolean
DataTypes.BOOLEAN            // TINYINT(1)
Numbers
DataTypes.INTEGER            // INTEGER
DataTypes.BIGINT             // BIGINT
DataTypes.BIGINT(11)         // BIGINT(11)

DataTypes.FLOAT              // FLOAT
DataTypes.FLOAT(11)          // FLOAT(11)
DataTypes.FLOAT(11, 10)      // FLOAT(11,10)

DataTypes.REAL               // REAL            PostgreSQL only.
DataTypes.REAL(11)           // REAL(11)        PostgreSQL only.
DataTypes.REAL(11, 12)       // REAL(11,12)     PostgreSQL only.

DataTypes.DOUBLE             // DOUBLE
DataTypes.DOUBLE(11)         // DOUBLE(11)
DataTypes.DOUBLE(11, 10)     // DOUBLE(11,10)

DataTypes.DECIMAL            // DECIMAL
DataTypes.DECIMAL(10, 2)     // DECIMAL(10,2)
Unsigned & Zerofill integers - MySQL/MariaDB only
In MySQL and MariaDB, the data types INTEGER, BIGINT, FLOAT and DOUBLE can be set as unsigned or zerofill (or both), as follows:

DataTypes.INTEGER.UNSIGNED
DataTypes.INTEGER.ZEROFILL
DataTypes.INTEGER.UNSIGNED.ZEROFILL
// You can also specify the size i.e. INTEGER(10) instead of simply INTEGER
// Same for BIGINT, FLOAT and DOUBLE
Dates
DataTypes.DATE       // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
DataTypes.DATE(6)    // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
DataTypes.DATEONLY   // DATE without time
UUIDs
For UUIDs, use DataTypes.UUID. It becomes the UUID data type for PostgreSQL and SQLite, and CHAR(36) for MySQL. Sequelize can generate UUIDs automatically for these fields, simply use Sequelize.UUIDV1 or Sequelize.UUIDV4 as the default value:

{
  type: DataTypes.UUID,
  defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
}