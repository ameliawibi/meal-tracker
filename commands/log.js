import inquirer from "inquirer";
import colors from "colors";
import { client, whenQueryDone } from "../index.js";

const now = new Date();

export class Log {
  addMeal = async () => {
    const values = await inquirer.prompt([
      {
        type: "list",
        name: "types",
        message: "Choose the meal type ==> ".cyan,
        choices: ["breakfast", "lunch", "dinner"],
      },
      {
        type: "input",
        name: "description",
        message: "Enter the meal name ==> ".cyan,
      },
      {
        type: "number",
        name: "alcohol",
        message: "Enter amount of alcohol ==> ".cyan,
      },
      {
        type: "confirm",
        name: "hungry",
        message: "Were you hungry before eating ==> ".cyan,
      },
    ]);

    let sqlQuery =
      "INSERT INTO meals (type, description, amount_of_alcohol, was_hungry_before_eating, created_at) VALUES ($1, $2, $3, $4, $5)";

    let inputData = [
      values.types,
      values.description,
      Number(values.alcohol),
      values.hungry,
      now,
    ];
    //console.log(inputData);
    //console.log(sqlQuery);

    client.query(sqlQuery, inputData, whenQueryDone);

    console.log("----------------");
    console.log(`New meal is added`);
    console.log("----------------");
  };

  removeMeal = async () => {
    const indexNum = await inquirer.prompt([
      {
        type: "number",
        name: "index",
        message:
          "Enter the id number which you want to remove from meal table ==> "
            .cyan,
      },
    ]);
    //console.log(indexNum);
    let sqlQuery = `DELETE FROM meals WHERE id=${indexNum.index};`;
    //console.log(sqlQuery);
    client.query(sqlQuery, whenQueryDone);

    console.log("----------------");
    console.log(`meal ${Number(indexNum.meal)} is removed`);
    console.log("----------------");
  };

  editMeal = async () => {
    const values = await inquirer.prompt([
      {
        type: "number",
        name: "index",
        message:
          "Enter the id number which you want to edit from meal table ==> "
            .cyan,
      },
      {
        type: "list",
        name: "column_name",
        message: "Choose the column name ==> ".cyan,
        choices: [
          "type",
          "description",
          "amount_of_alcohol",
          "was_hungry_before_eating",
        ],
      },
      {
        type: "input",
        name: "column_value",
        message: "Enter the new value ==> ".cyan,
      },
    ]);

    let sqlQuery = "UPDATE meals SET ($2)=($3),created_at=($4) WHERE id=($1)";

    let inputData = [
      values.index,
      values.column_name,
      values.column_value,
      now,
    ];
    console.log(inputData);
    console.log(sqlQuery);

    client.query(sqlQuery, inputData, whenQueryDone);

    console.log("----------------");
    console.log(`Meal ${values.index} is updated`);
    console.log("----------------");
  };
}
