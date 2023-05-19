const { Client } = require("pg");

function getUsers(callback) {
  const connectionString = process.env.DATABASE_URL;
  const client = new Client({ connectionString });

  client.connect((connectError) => {
    if (connectError) {
      console.error("Error connecting to database:", connectError);
      callback(connectError, null);
      client.end();
      return;
    }

    const query = "SELECT * FROM users";
    client.query(query, (queryError, result) => {
      if (queryError) {
        console.error("Error running query:", queryError);
        callback(queryError, null);
      } else {
        callback(null, result.rows);
      }
      
      client.end();
    });
  });
}

getUsers((error, users) => {
  if (error) {
    console.error("Error retrieving users:", error);
  } else {
    console.log("Users:", users);
  }
});
