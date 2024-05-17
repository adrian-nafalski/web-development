const { MongoClient } = require("mongodb");

// Mongoose
const mongoose = require("mongoose");

// Connection URI
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Database Name
const dbName = "galleryDB";

// Collection Name
const collectionName = "users";

client.connect();
console.log("Pomyślne połączenie z serwerem!");

const db = client.db(dbName);

/*
    MONGO DB
*/

// // Create data
// db.collection(collectionName)
//     .insertOne({
//         imie: "Tadeusz",
//         nazwisko: "Kowalski",
//     })
//     .then(
//         () => console.log("Dodano"),
//         (err) => console.log(err.message)
//     )
//     .finally(() => client.close());

// // Read data
// db.collection(collectionName)
//     .find({
//         imie: "Stanisław",
//     })
//     .toArray()
//     .then((result) => console.log("Wynik wyszukiwania: ", result));

// // Read data
// db.collection(collectionName)
//     .find({
//         imie: { $eq: "Stanisław" },
//     })
//     .toArray()
//     .then((result) => console.log("Wynik wyszukiwania: ", result));

// // Update data
// db.collection(collectionName).updateOne(
//     {
//         imie: "Tadeusz",
//     },
//     { $set: { imie: "Tymoteusz" } }
// );

// // Delete data
// db.collection(collectionName).deleteOne(
//     {
//         imie: "Stanisław",
//     },
//     (err, res) => {
//         if (err) console.log("błąd");
//         else console.log(res);
//     }
// );
