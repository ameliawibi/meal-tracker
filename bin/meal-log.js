import { program } from "commander";
import { Log } from "../commands/log.js";

const log = new Log();

program.command("add").description("Meal to be added").action(log.addMeal);

program
  .command("remove")
  .description("Meal to be removed")
  .action(log.removeMeal);

program.command("edit").description("Meal to be updated").action(log.editMeal);

program.parse(process.argv);
