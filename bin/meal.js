#!/usr/bin/env node
import { program } from "commander";

program
  .version("1.1.1")
  .command("create", "description: create meals table")
  .command("show", "description: show meals information")
  .command("log", "description: add or remove meals")
  .parse(process.argv);

//console.log("meal.js is successfully executed");
