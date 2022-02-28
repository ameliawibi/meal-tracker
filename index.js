import pg from "pg";
const { Client } = pg;

export const client = new Client({
  user: "ameliawibi",
  host: "localhost",
  database: "template1",
  port: 5432,
});

client.connect();
console.log("successfully connected");

export const whenQueryDone = (err, result) => {
  if (err) {
    console.log("error", err);
  } else {
    //console.log(result.rows);
    // here we are customising the report output format
    let hungerState;
    if (result.rows) {
      result.rows.forEach((report) => {
        if (report.was_hungry_before_eating === true) {
          hungerState = "feeling hungry";
        } else {
          hungerState = "not hungry";
        }
      });

      // this is the output
      console.table(result.rows);
    }
  }
  client.end();
};
