// const express = require('express');
// const { MongoClient, ObjectId } = require('mongodb');
// const winston = require('winston');

// const app = express();
// app.use(express.json());            // for parsing application/json
// app.use(express.static('public'));  // your existing static files

// // logger setup (unchanged)
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'add-service' },
//   transports: [
//     new winston.transports.File({ filename: 'error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'combined.log' }),
//   ],
// });
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }

// // MongoDB connection
// const uri = process.env.MONGO_URI;
// let db;
// MongoClient.connect(uri)
//   .then(client => {
//     logger.info('Connected to MongoDB');
//     db = client.db();  // default database from URI
//   })
//   .catch(err => {
//     logger.error('Failed to connect to MongoDB', err);
//     process.exit(1);
//   });

// // --- CREATE
// app.post('/items', async (req, res) => {
//   try {
//     const payload = req.body;
//     const result = await db.collection('items').insertOne(payload);
//     res.status(201).json({ insertedId: result.insertedId });
//   } catch (err) {
//     logger.error('Insert error', err);
//     res.status(500).json({ error: err.toString() });
//   }
// });

// // --- READ (all)
// app.get('/items', async (req, res) => {
//   try {
//     const items = await db.collection('items').find().toArray();
//     res.status(200).json(items);
//   } catch (err) {
//     logger.error('Fetch all error', err);
//     res.status(500).json({ error: err.toString() });
//   }
// });

// // --- READ (one by id)
// app.get('/items/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const item = await db.collection('items').findOne({ _id: new ObjectId(id) });
//     if (!item) return res.status(404).json({ error: 'Not found' });
//     res.status(200).json(item);
//   } catch (err) {
//     logger.error('Fetch one error', err);
//     res.status(500).json({ error: err.toString() });
//   }
// });

// // --- UPDATE
// app.put('/items/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const update = { $set: req.body };
//     const result = await db.collection('items')
//                            .updateOne({ _id: new ObjectId(id) }, update);
//     if (result.matchedCount === 0) {
//       return res.status(404).json({ error: 'Not found' });
//     }
//     res.status(200).json({ modifiedCount: result.modifiedCount });
//   } catch (err) {
//     logger.error('Update error', err);
//     res.status(500).json({ error: err.toString() });
//   }
// });

// // --- DELETE
// app.delete('/items/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const result = await db.collection('items')
//                            .deleteOne({ _id: new ObjectId(id) });
//     if (result.deletedCount === 0) {
//       return res.status(404).json({ error: 'Not found' });
//     }
//     res.status(200).json({ deletedCount: result.deletedCount });
//   } catch (err) {
//     logger.error('Delete error', err);
//     res.status(500).json({ error: err.toString() });
//   }
// });

// // root and listen
// app.get('/', (req, res) => {
//   res.send('<h1>Hello, this is my Node.js Express server!</h1>');
// });
// const port = 3040;
// app.listen(port, () => {
//   logger.info(`Server is running at http://localhost:${port}`);
// });


const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const winston = require('winston');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calc-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST || 'mongo-svc';
const port = process.env.MONGO_PORT || '27017';
const uri = `mongodb://${user}:${pass}@${host}:${port}/?authSource=admin`;

let db, calcCol;
MongoClient.connect(uri)
  .then(client => {
    logger.info('Connected to MongoDB');
    db = client.db(); 
    calcCol = db.collection('calculations');
  })
  .catch(err => {
    logger.error('Mongo connection error', err);
    process.exit(1);
  });

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

async function logCalculation(operation, n1, n2, result) {
  try {
    const entry = { operation, operands: [n1,n2], result, timestamp: new Date() };
    const res = await calcCol.insertOne(entry);
    return res.insertedId;
  } catch(err) {
    logger.error('Log insert error', err);
    return null;
  }
}


// ADD
app.get('/add', async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1), n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) throw new Error('Invalid number');
    const result = add(n1,n2);
    const logId = await logCalculation('add', n1, n2, result);
    res.json({ statusCode:200, data: result, logId });
  } catch(err) {
    logger.error(err.toString());
    res.status(400).json({ statusCode:400, msg: err.toString() });
  }
});

// SUBTRACT
app.get('/subtract', async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1), n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) throw new Error('Invalid number');
    const result = subtract(n1,n2);
    const logId = await logCalculation('subtract', n1, n2, result);
    res.json({ statusCode:200, data: result, logId });
  } catch(err) {
    logger.error(err.toString());
    res.status(400).json({ statusCode:400, msg: err.toString() });
  }
});

// MULTIPLY
app.get('/multiply', async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1), n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) throw new Error('Invalid number');
    const result = multiply(n1,n2);
    const logId = await logCalculation('multiply', n1, n2, result);
    res.json({ statusCode:200, data: result, logId });
  } catch(err) {
    logger.error(err.toString());
    res.status(400).json({ statusCode:400, msg: err.toString() });
  }
});

// DIVIDE
app.get('/divide', async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1), n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2) || n2 === 0) throw new Error('Invalid divisor');
    const result = divide(n1,n2);
    const logId = await logCalculation('divide', n1, n2, result);
    res.json({ statusCode:200, data: result, logId });
  } catch(err) {
    logger.error(err.toString());
    res.status(400).json({ statusCode:400, msg: err.toString() });
  }
});



// READ ALL
app.get('/calculations', async (req, res) => {
  try {
    const items = await calcCol.find().toArray();
    res.json(items);
  } catch(err) {
    logger.error('Fetch all error', err);
    res.status(500).json({ error: err.toString() });
  }
});

// READ ONE
app.get('/calculations/:id', async (req, res) => {
  try {
    const item = await calcCol.findOne({ _id: new ObjectId(req.params.id) });
    if (!item) return res.status(404).json({ error:'Not found' });
    res.json(item);
  } catch(err) {
    logger.error('Fetch one error', err);
    res.status(500).json({ error: err.toString() });
  }
});

// UPDATE
app.put('/calculations/:id', async (req, res) => {
  try {
    const update = { $set: req.body };
    const result = await calcCol.updateOne(
      { _id: new ObjectId(req.params.id) },
      update
    );
    if (result.matchedCount === 0) 
      return res.status(404).json({ error:'Not found' });
    res.json({ modifiedCount: result.modifiedCount });
  } catch(err) {
    logger.error('Update error', err);
    res.status(500).json({ error: err.toString() });
  }
});

// DELETE
app.delete('/calculations/:id', async (req, res) => {
  try {
    const result = await calcCol.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) 
      return res.status(404).json({ error:'Not found' });
    res.json({ deletedCount: result.deletedCount });
  } catch(err) {
    logger.error('Delete error', err);
    res.status(500).json({ error: err.toString() });
  }
});

// Root
app.get('/', (req, res) => {
  res.send('<h1>Calculator with MongoDB logging</h1>');
});

// Start server
const app_port = 3040;
app.listen(app_port, () => {
  logger.info(`Server running on http://localhost:${app_port}`);
});
