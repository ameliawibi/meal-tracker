import { program } from "commander";
import { Show } from "../commands/show.js";

const show = new Show();

program.command("all").description("Show all").action(show.showAll);

program.command("filter").description("Show filtered").action(show.showFilter);

program.command("drink").description("Drink stats").action(show.showDrink);

program
  .command("week-so-far")
  .description("Get a list of all meals since the week began")
  .action(show.showWeekSoFar);

program
  .command("past-week")
  .description(
    "Get a list of the meals in the past seven days not including today"
  )
  .action(show.showPastWeek);

program.parse(process.argv);
