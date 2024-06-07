const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

async function main() {
  const uri = "mongodb://root:example@localhost:27017"; // Replace with your MongoDB connection string
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('myDb'); // Replace 'yourDatabaseName' with your database name

    // Initialize bulk operation for Users collection
    let bulkU = db.collection('users').initializeUnorderedBulkOp();
    for (let i = 0; i < 100000; i++) {
      bulkU.insert({
        username: `user${i}`,
        email: `user${i}@test.com`,
        password: Math.random().toString(36).slice(-8),
        created_at: new Date()
      });

      // Execute bulk operation in batches of 1000 to avoid memory issues
      if (i % 1000 === 0 && i > 0) {
        await bulkU.execute();
        bulkU = db.collection('users').initializeUnorderedBulkOp();
      }
    }

    // Execute the remaining bulk operations
    if (bulkU.length > 0) {
      await bulkU.execute();
    }

    bulkU = db.collection('posts').initializeUnorderedBulkOp(); 
    for (let i = 0; i < 10000; i++) {
      const user = await db.collection('users').findOne({username: `user${i}`})
      bulkU.insert({
         userId: user._id,
         title: `Post by user ${i}`,
         content: `This si the content of post ${i}`,
         comments: [],
         likes: []
      })

      // Execute bulk operation in batches of 1000 to avoid memory issues
      if (i % 1000 === 0 && i > 0) {
        await bulkU.execute();
        bulkU = db.collection('posts').initializeUnorderedBulkOp();
      }
    }

    // Execute the remaining bulk operations
    if (bulkU.length > 0) {
      await bulkU.execute();
    }
    
    console.log("Bulk insert completed successfully.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    mongoose.connection.close();
  }
}

main().catch(console.error);
