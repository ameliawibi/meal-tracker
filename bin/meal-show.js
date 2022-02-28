import { program } from "commander";
import { Show } from "../commands/show.js";

const show = new Show();

program.command("all").description("Show all").action(show.showAll);

program.command("filter").description("Show filtered").action(show.showFilter);

program.command("drink").description("Drink stats").action(show.showDrink);

program.parse(process.argv);
