import inquirer from "inquirer";
import colors from "colors";
import { client, whenQueryDone } from "../index.js";

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
}
