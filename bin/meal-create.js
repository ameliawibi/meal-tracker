import { client, whenQueryDone } from "../index.js";

const now = new Date().toISOString().slice(0, 19).replace("T", " ");

let sqlQuery = `DROP TABLE IF EXISTS meals;
CREATE TABLE meals (
    id SERIAL PRIMARY KEY,
    type text,
    description text,
    amount_of_alcohol integer,
    was_hungry_before_eating boolean,
  	created_at varchar
);
INSERT INTO meals (type,description,amount_of_alcohol,was_hungry_before_eating,created_at) VALUES ('dinner','pasta',0,true, '${now}')`;

client.query(sqlQuery, whenQueryDone);

console.log("----------------");
console.log(`Meal table is created`);
console.log("----------------");
