import inquirer from "inquirer";
import colors from "colors";
import { client, whenQueryDone } from "../index.js";

const now = new Date().toISOString().slice(0, 19).replace("T", " ");
const lastWeek = new Date(new Date() - 1000 * 60 * 60 * 24 * 7)
  .toISOString()
  .slice(0, 19)
  .replace("T", " ");
const yesterday = new Date(new Date() - 1000 * 60 * 60 * 24 * 1)
  .toISOString()
  .slice(0, 19)
  .replace("T", " ");

export class Show {
  showAll = async () => {
    let sqlQuery = "SELECT * FROM meals;";
    client.query(sqlQuery, whenQueryDone);
  };
  showFilter = async () => {
    const values = await inquirer.prompt([
      {
        type: "list",
        name: "column_name",
        message: "Choose the column name that you want to filter ==> ".cyan,
        choices: [
          "id",
          "type",
          "description",
          "amount_of_alcohol",
          "was_hungry_before_eating",
        ],
      },
      {
        type: "input",
        name: "column_value",
        message: "Enter the values to be filtered ==> ".cyan,
      },
    ]);

    let inputData = [values.column_name, values.column_value];

    let sqlQuery = `SELECT * from meals WHERE "${inputData[0]}"='${inputData[1]}';`;

    console.log(inputData);
    console.log(sqlQuery);

    client.query(sqlQuery, whenQueryDone);
  };
  showDrink = async () => {
    let sqlQuery =
      "SELECT type,COUNT(*) AS nbr, (AVG(amount_of_alcohol)) AS avg_alcohol FROM meals GROUP BY type ORDER BY avg_alcohol DESC;";
    client.query(sqlQuery, whenQueryDone);
  };
  showWeekSoFar = async () => {
    let sqlQuery = `SELECT * FROM meals WHERE created_at BETWEEN '${lastWeek}' AND '${now}';`;
    client.query(sqlQuery, whenQueryDone);
  };
  showPastWeek = async () => {
    let sqlQuery = `SELECT * FROM meals WHERE created_at BETWEEN '${lastWeek}' AND '${yesterday}';`;
    client.query(sqlQuery, whenQueryDone);
  };
}
