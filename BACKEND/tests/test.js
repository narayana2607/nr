const db = require('../app/config/db'); // Correct relative path

// Test a simple query
db.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) throw err;
  console.log('The solution is: ', results[0].solution);
});
