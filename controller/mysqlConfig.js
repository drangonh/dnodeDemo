const mysql = require('mysql');
const config = require('./defaultConfig');

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let allServices = {
    query: function (sql, values) {

        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
                        console.log("输出",rows,err);
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    },
    findUserData: function (name) {
        let _sql = `select * from user where author="${name}";`
        console.log(_sql);
        return allServices.query(_sql)
    },
    addUserData: (obj) => {
        let _sql = "insert into user set author=?,title=?,subDate=?;"
        return allServices.query(_sql, obj)
    },
}

module.exports = allServices;


