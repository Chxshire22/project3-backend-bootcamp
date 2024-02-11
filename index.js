const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = 3000;

const app = express();

// IMPORT ROUTER
const UsersRouter = require('./routers/usersRouter')
const CategoriesRouter = require('./routers/categoriesRouter')
const ListingsRouter = require('./routers/listingsRouter')
const ListingImagesRouter = require('./routers/listingImagesRouter')

// IMPORT CONTROLLER
const UsersController = require('./controllers/userController')
const CategoriesController = require('./controllers/categoriesController')
const ListingsController = require('./controllers/listingsController')
const ListingImagesController = require('./controllers/listingImagesController')


// IMPORT DB 
const db = require('./models/index')
const { user, listing, category, chat_image, chatroom_message, chatroom, like, listing_image, order, review } =db

// INIT CONTROLLER 
const usersController = new UsersController(user)
// ,like, listing, chatroom, chatroom_message, order
const categoriesController = new CategoriesController(category)
const listingsController = new ListingsController(listing, category, listing_image, user)
const listingImagesController = new ListingImagesController(listing_image)

// INIT ROUTERS 
const usersRouter = new UsersRouter(usersController).routes()
const categoriesRouter = new CategoriesRouter(categoriesController).routes()
const listingsRouter = new ListingsRouter(listingsController).routes()
const listingImagesRouter = new ListingImagesRouter(listingImagesController).routes()


// Middleware 
app.use(cors());
app.use(express.json())
// Enable and use routers
app.use('/users', usersRouter)
app.use('/categories', categoriesRouter)
app.use('/listings', listingsRouter)
app.use('/listing-images', listingImagesRouter)


// Start the server
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
