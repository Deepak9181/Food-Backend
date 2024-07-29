const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./index");

// console.log(app.get('env'));

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => {
    fetchFoodItems();
    console.log("DB connection Succesful");
  })
  .catch((err) => console.log(err));

const fetchFoodItems = async () => {
  try {
    //Food Items
    const foodItemsCollection = mongoose.connection.db.collection("Food_items");
    const foodData = await foodItemsCollection.find({}).toArray();
    
    //Food Category
    const foodCatCollection = mongoose.connection.db.collection("Food_Category");
    const CategoryData = await foodCatCollection.find({}).toArray();
    
    global.food_Items = foodData;
    global.food_Category= CategoryData;
    // console.log("Food items:", foodData);
    // console.log("Food Category:", CategoryData);

  } catch (err) {
    console.log("Error fetching food items:", err);
  }
};

const port = process.env.PORT ||5000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
