import {sequelize} from "schemas";

export = async function () {
    sequelize.sync({force: true}).then(rs => {
        rs.queryInterface.bulkInsert("Users", [{
            id: 1,
            fullname: 'Admin',
            username: "admin",
            password: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
            email: 'admin',
            role: 'admin',
            gender: 1,
            created_at: new Date(),
            updated_at: new Date()
        }]);

        rs.queryInterface.bulkInsert("Information", [{
            name: "Weight",
            user_id: 1,
            value: 70,
            created_at: new Date(),
            updated_at: new Date()
        },{
            name: "Height",
            user_id: 1,
            value: 175,
            created_at: new Date(),
            updated_at: new Date()
        },{
            name: "Age",
            user_id: 1,
            value: 25,
            created_at: new Date(),
            updated_at: new Date()
        }]);

        rs.queryInterface.bulkInsert("Targets", [{
            muscle_ids: [1,2],
            user_id:1 ,
            name: "MUSCLE",
            created_at: new Date(),
            updated_at: new Date()
        }]);

    })
}
