const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose
  .connect('mongodb://localhost:27017/yelp-camp')
  .then(() => {
    console.log('connection open')
  })
  .catch((err) => {
    console.log('error')
    console.log(err)
  })

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 500; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      author: '619fc5ffd4d7af92f5a675ee',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dl0mfc7f3/image/upload/v1638235428/YelpCamp/hb6yhalfjtwhshvf14sz.gif',
          filename: 'YelpCamp/hb6yhalfjtwhshvf14sz',
        },
        {
          url: 'https://res.cloudinary.com/dl0mfc7f3/image/upload/v1638235429/YelpCamp/df1nzlop0dnitogegrja.jpg',
          filename: 'YelpCamp/df1nzlop0dnitogegrja',
        },
        {
          url: 'https://res.cloudinary.com/dl0mfc7f3/image/upload/v1638235429/YelpCamp/pxg9jkbxxdlenqqt9zts.jpg',
          filename: 'YelpCamp/pxg9jkbxxdlenqqt9zts',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ullam nulla corporis laudantium ipsam expedita veritatis non delectus, esse dolorem aspernatur quasi quos, debitis aut. Quasi hic quae inventore expedita.',
      price,
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})
