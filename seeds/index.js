const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
  await Campground.deleteMany({});
  for(let i = 0; i < 300; i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // YOUR USER ID (currently 'gordon')
      author: '624a2b36537664c52ca7824e',
      location:`${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eligendi maiores repellendus laboriosam aspernatur nostrum temporibus, vero necessitatibus, laudantium esse eaque neque quas porro, distinctio illum? Id aperiam doloribus eaque?',
      price,
      geometry: {
        type :"Point",
        coordinates: [
          cities[random1000].longitude,  
          cities[random1000].latitude , 
        ]  
      },
      images: [
        {
          url: 'https://res.cloudinary.com/gbh-cloud/image/upload/v1648856266/YelpCamp/xpjymyrwph8rviql1xsf.jpg',
          filename: 'YelpCamp/xpjymyrwph8rviql1xsf',
        },
        {
          url: 'https://res.cloudinary.com/gbh-cloud/image/upload/v1648856267/YelpCamp/zbjk9svk2ueoytjoe5bi.jpg',
          filename: 'YelpCamp/zbjk9svk2ueoytjoe5bi',
        },
        {
          url: 'https://res.cloudinary.com/gbh-cloud/image/upload/v1649023339/YelpCamp/cj4yurtx1zyiejbqkcjx.jpg',
          filename: 'YelpCamp/cj4yurtx1zyiejbqkcjx',
        }
      ],
    
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})