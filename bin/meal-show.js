import { client, whenQueryDone } from "../index.js";

let sqlQuery = "SELECT * FROM meals;";

client.query(sqlQuery, whenQueryDone);
