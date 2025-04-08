const express = require('express');
const multer = require('multer');
const mysql2 = require('mysql2');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const stripe = require('stripe')('your-secret-key'); // Replace with your Stripe Secret Key
const app = express();


app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'));

//const saltRounds = 10;
//const XLSX = require('xlsx');

app.use(express.json());
const port = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// MySQL connection
const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'nnrpvtltd',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  } else {
    console.log('Connected to MySQL');
  }
});

// Ensure 'uploads' directory exists
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'));
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Define storage using multer.diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save in 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Name file with timestamp
  },
});

// Multer upload setup with file filter
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|mp4|mov|mkv|avi/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Only images and videos are allowed!'));
    }
  },
});

















// Stripe Payment Endpoint
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).send({ error: 'No items provided for checkout.' });
    }

    // Map items to Stripe line items
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Convert price to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ error: 'Failed to create checkout session' });
  }
});

// Endpoint for uploading files
app.post('/upload', upload.array('media', 500), (req, res) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  const sql = 'INSERT INTO images (path, original_name, uploadDate) VALUES ?';
  const values = files.map((file) => [`uploads/${file.filename}`, file.originalname, new Date()]);

  connection.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error saving files to database:', err);
      return res.status(500).send('Server error');
    }
    res.send({ message: 'Files uploaded successfully', mediaIds: result.insertId });
  });
});

// Endpoint to retrieve media information from the database with URLs
app.get('/media', (req, res) => {
  const sql = 'SELECT id, path, original_name, uploadDate FROM images';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching media from database:', err);
      return res.status(500).send('Server error');
    }

    // Format URLs correctly for the front-end
    const media = results.map((item) => ({
      ...item,
      url: `http://localhost:${port}/${item.path}`,
    }));
    res.send(media);
  });
});

// DELETE route to handle file deletion
app.delete('/media/:id', (req, res) => {
  const { id } = req.params;

  const sqlSelect = 'SELECT path FROM images WHERE id = ?';
  connection.query(sqlSelect, [id], (err, results) => {
    if (err) {
      console.error('Error fetching media from database:', err);
      return res.status(500).send('Server error');
    }

    if (results.length === 0) {
      return res.status(404).send('Media not found');
    }

    const filePath = path.join(__dirname, results[0].path);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).send('Error deleting file');
      }

      const sqlDelete = 'DELETE FROM images WHERE id = ?';
      connection.query(sqlDelete, [id], (err) => {
        if (err) {
          console.error('Error deleting media from database:', err);
          return res.status(500).send('Server error');
        }
        res.send({ message: 'Media deleted successfully' });
      });
    });
  });
});




// Get all employees
app.get('/employees', (req, res) => {
  connection.query('SELECT * FROM employees', (err, result) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).json({ error: 'Server error', details: err.message });
    }
    res.status(200).json(result);
  });
});







// Add a new employee
app.post('/employees', upload.single('profile_pic'), (req, res) => {
  const { first_name, last_name, email, phone_number, hire_date, job_title, department } = req.body;
  const profile_pic = req.file ? `/uploads/${req.file.filename}` : null;

  // Validation for required fields
  if (!first_name || !last_name || !email || !hire_date || !job_title || !department) {
    return res.status(400).json({ error: 'All fields except profile_pic are required' });
  }

  const query =
    'INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, job_title, department, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(
    query,
    [first_name, last_name, email, phone_number, hire_date, job_title, department, profile_pic],
    (err, result) => {
      if (err) {
        console.error('Error adding employee:', err);
        return res.status(500).json({ error: 'Failed to add employee', details: err.message });
      }
      res.status(201).json({ message: 'Employee added successfully' });
    }
  );
});

// Edit an employee
app.put('/employees/:id', upload.single('profile_pic'), (req, res) => {
  const { first_name, last_name, email, phone_number, hire_date, job_title, department } = req.body;

  // Format `hire_date` to match MySQL `DATE` format (YYYY-MM-DD)
  const formattedHireDate = hire_date ? hire_date.split("T")[0] : null;

  // If a new profile picture is uploaded, use it; otherwise, keep the old one
  const profile_pic = req.file ? `/uploads/${req.file.filename}` : null;

  const fetchExistingProfilePic = new Promise((resolve, reject) => {
    if (profile_pic) {
      resolve(profile_pic); // New profile_pic provided
    } else {
      // Fetch the existing profile_pic from the database
      connection.query(
        'SELECT profile_pic FROM employees WHERE id = ?',
        [req.params.id],
        (err, results) => {
          if (err) {
            console.error('Error fetching profile_pic:', err);
            return reject(err);
          }
          resolve(results[0]?.profile_pic || null); // Use existing profile_pic or null
        }
      );
    }
  });

  fetchExistingProfilePic
    .then((finalProfilePic) => {
      const query =
        'UPDATE employees SET first_name = ?, last_name = ?, email = ?, phone_number = ?, hire_date = ?, job_title = ?, department = ?, profile_pic = ? WHERE id = ?';
      connection.query(
        query,
        [
          first_name,
          last_name,
          email,
          phone_number,
          formattedHireDate,
          job_title,
          department,
          finalProfilePic,
          req.params.id,
        ],
        (err, result) => {
          if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).json({ error: 'Failed to update employee', details: err.message });
          }
          res.status(200).json({ message: 'Employee updated successfully.' });
        }
      );
    })
    .catch((err) => {
      console.error('Error during employee update:', err);
      res.status(500).json({ error: 'Server error during update.', details: err.message });
    });
});


// Delete an employee
app.delete('/employees/:id', (req, res) => {
  const query = 'DELETE FROM employees WHERE id = ?';
  connection.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error deleting employee:', err);
      return res.status(500).json({ error: 'Failed to delete employee', details: err.message });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  });
});








//student...................





// Get all students
app.get('/studentinfo', (req, res) => {
  const sql = 'SELECT * FROM studentinfo';
  connection.query(sql, (err, results) => { // Use 'connection' here
      if (err) {
          console.error('Error fetching students:', err);
          res.status(500).send('Error fetching students.');
      } else {
          res.json(results);
      }
  });
});

// Add a new student
app.post('/studentinfo', upload.fields([{ name: 'profilePic' }, { name: 'supportingDocs' }]), (req, res) => {
  
  const {
      name,
      sevisId,
      dob,
      phoneNumber,
      email,
      address,
      country,
      visaType,
      visaStatus,
      universityName,
      universityAddress,
      job,
      experience,
      companyName,
  } = req.body;

  const profilePic = req.files?.profilePic ? req.files.profilePic[0].path : null;
  const supportingDocs = req.files?.supportingDocs
      ? JSON.stringify(req.files.supportingDocs.map((file) => file.path))
      : null;

  const sql = `
      INSERT INTO studentinfo (
          name, sevisId, dob, profilePic, phoneNumber, email, address,
          country, visaType, visaStatus, universityName, universityAddress, job, experience, companyName, supportingDocs
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
      name,
      sevisId,
      dob,
      profilePic,
      phoneNumber,
      email,
      address,
      country,
      visaType,
      visaStatus,
      universityName,
      universityAddress,
      job,
      experience,
      companyName,
      supportingDocs,
  ];

  connection.query(sql, values, (err, result) => { // Use 'connection' here
      if (err) {
          console.error('Error saving student:', err);
          res.status(500).send('Error saving student.');
      } else {
          res.status(200).send('Student added successfully.');
      }
  });
});

// Delete a student by ID
app.delete('/studentinfo/:id', (req, res) => {
  const { id } = req.params;

  // Get the student's files to delete
  const getFilesSql = 'SELECT profilePic, supportingDocs FROM studentinfo WHERE id = ?';
  connection.query(getFilesSql, [id], (err, results) => { // Use 'connection' here
      if (err) {
          console.error('Error fetching student files:', err);
          res.status(500).send('Error deleting student.');
      } else {
          const { profilePic, supportingDocs } = results[0] || {};

          // Delete files from the filesystem
          if (profilePic) fs.unlinkSync(profilePic);
          if (supportingDocs) {
              JSON.parse(supportingDocs).forEach((doc) => {
                  if (fs.existsSync(doc)) fs.unlinkSync(doc);
              });
          }

          // Delete student record from database
          const deleteSql = 'DELETE FROM studentinfo WHERE id = ?';
          connection.query(deleteSql, [id], (err) => { // Use 'connection' here
              if (err) {
                  console.error('Error deleting student:', err);
                  res.status(500).send('Error deleting student.');
              } else {
                  res.status(200).send('Student deleted successfully.');
              }
          });
      }
  });
});


//update
app.put('/studentinfo/:id', upload.fields([{ name: 'profilePic' }, { name: 'supportingDocs' }]), (req, res) => {
  const { id } = req.params;
  
  const {
      name,
      sevisId,
      dob,
      phoneNumber,
      email,
      address,
      country,
      visaType,
      visaStatus,
      universityName,
      universityAddress,
      job,
      experience,
      companyName,
  } = req.body;

  console.log('Original DOB:', dob); // Debug the original date
  const formattedDob = dob ? new Date(dob).toISOString().split('T')[0] : null; // Convert to YYYY-MM-DD
  console.log('Formatted DOB:', formattedDob); // Debug the formatted date

  const profilePic = req.files?.profilePic ? req.files.profilePic[0].path : null;
  const supportingDocs = req.files?.supportingDocs
      ? JSON.stringify(req.files.supportingDocs.map((file) => file.path))
      : null;

  const getStudentSql = 'SELECT profilePic, supportingDocs FROM studentinfo WHERE id = ?';
  connection.query(getStudentSql, [id], (err, results) => {
      if (err) {
          console.error('Error fetching student for update:', err);
          return res.status(500).send('Error fetching student for update.');
      }

      const existingStudent = results[0];
      if (!existingStudent) {
          console.error('Student not found with ID:', id);
          return res.status(404).send('Student not found.');
      }

      if (profilePic && existingStudent.profilePic && fs.existsSync(existingStudent.profilePic)) {
          fs.unlinkSync(existingStudent.profilePic);
      }
      if (supportingDocs && existingStudent.supportingDocs) {
          JSON.parse(existingStudent.supportingDocs).forEach((doc) => {
              if (fs.existsSync(doc)) fs.unlinkSync(doc);
          });
      }

      const updateSql = `
          UPDATE studentinfo SET
          name = ?, sevisId = ?, dob = ?, profilePic = ?, phoneNumber = ?, email = ?, address = ?,
          country = ?, visaType = ?, visaStatus = ?, universityName = ?, universityAddress = ?, job = ?,
          experience = ?, companyName = ?, supportingDocs = ?
          WHERE id = ?
      `;

      const values = [
          name,
          sevisId,
          formattedDob,
          profilePic || existingStudent.profilePic,
          phoneNumber,
          email,
          address,
          country,
          visaType,
          visaStatus,
          universityName,
          universityAddress,
          job,
          experience,
          companyName,
          supportingDocs || existingStudent.supportingDocs,
          id,
      ];

      console.log('SQL Query:', updateSql); // Debug the SQL query
      console.log('Values:', values); // Debug the values

      connection.query(updateSql, values, (err, result) => {
          if (err) {
              console.error('Error updating student:', err);
              return res.status(500).send('Error updating student.');
          }
          console.log('Student updated successfully:', result);
          res.status(200).send('Student updated successfully.');
      });
  });
});








// Search endpoint 
app.get('/search', async (req, res) => {
  const searchTerm = req.query.query;
  if (!searchTerm) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const [tables] = await connection.promise().query(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'nnrpvtltd'`
    );

    let results = [];

    for (const table of tables) {
      const tableName = table.TABLE_NAME;

      const [columns] = await connection
        .promise()
        .query(
          `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? AND TABLE_SCHEMA = 'nnrpvtltd'`,
          [tableName]
        );

      if (columns.length === 0) continue;

      const columnNames = columns.map((col) => `\`${col.COLUMN_NAME}\``).join(', ');
      const searchConditions = columns
        .map((col) => `IFNULL(CONVERT(\`${col.COLUMN_NAME}\`, CHAR), '') LIKE ?`)
        .join(' OR ');
      const values = columns.map(() => `%${searchTerm}%`);

      try {
        const searchQuery = `
          SELECT 'nnrpvtltd.${tableName}' AS source_table, ${columnNames}
          FROM \`${tableName}\`
          WHERE ${searchConditions}
        `;

        const [tableResults] = await connection.promise().query(searchQuery, values);
        results = results.concat(tableResults);
      } catch (queryError) {
        console.error(`Error querying table ${tableName}:`, queryError.sqlMessage || queryError.message);
      }
    }

    res.json(results);
  } catch (error) {
    console.error('Error searching across schema:', error.sqlMessage || error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});











//excelsheet
// Save Excel Data
// Save Excel Data
app.post('/uploadExcelData', (req, res) => {
  const { fileName, data } = req.body;

  if (!fileName || !data) {
    return res.status(400).json({ error: 'FileName and data are required.' });
  }

  const sql = 'INSERT INTO uploaded_files (file_name, data) VALUES (?, ?)';
  connection.query(sql, [fileName, JSON.stringify(data)], (err, result) => {
    if (err) {
      console.error('Database insert error:', err);
      return res.status(500).json({ error: 'Database error', details: err });
    }
    res.send('Data saved');
  });
});

// Fetch Files List
app.get('/files', (req, res) => {
  const sql = 'SELECT id, file_name FROM uploaded_files';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Database fetch error:', err);
      return res.status(500).json({ error: 'Database error', details: err });
    }
    res.json(result);
  });
});
app.get('/files/:id', (req, res) => {
  const sql = 'SELECT id, file_name, data FROM uploaded_files WHERE id = ?';
  connection.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Database fetch by ID error:', err);
      return res.status(500).json({ error: 'Database error', details: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    const fileData = result[0];
    try {
      // Check if data is a valid JSON string before parsing
      if (typeof fileData.data === 'string') {
        fileData.data = JSON.parse(fileData.data);
      }
    } catch (parseError) {
      console.error('Error parsing JSON from DB:', parseError);
      return res.status(500).json({ error: 'Invalid JSON in database', details: parseError.message });
    }

    res.json(fileData);
  });
});

app.delete('/files/:id', (req, res) => {
  const fileId = req.params.id;

  const sql = 'DELETE FROM uploaded_files WHERE id = ?';
  connection.query(sql, [fileId], (err, result) => {
    if (err) {
      console.error('Database delete error:', err);
      return res.status(500).json({ error: 'Database error', details: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json({ message: 'File deleted successfully' });
  });
});
