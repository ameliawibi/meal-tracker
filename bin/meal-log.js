import { program } from "commander";
import { Log } from "../commands/log.js";

const log = new Log();

program
  .command("add")
  .description("List of values to be added")
  .action(log.addMeal);

program
  .command("remove")
  .description("List of values to be removed")
  .action(log.removeMeal);

program.parse(process.argv);
