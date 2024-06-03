const connection = require('./DB_connect') //importing the database
//creating a table using nodejs
const createUser = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `; 

  console.log(typeof(createUser));

  //connection query to check if a query is running smoothly
  connection.query(createUser, (err, results, fields) => {
    if (err) {  //if there is an error then error message specified is generated
      console.error('Error creating table:', err.stack);
      return;
    }
    //if no error then this block gets executed
    console.log('Table "users" created successfully');
    connection.end();
  });
