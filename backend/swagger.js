const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './auth/authRoutes.js', 
    './event/eventRoutes.js', 
    './favoritelist/favoritelistRoutes.js', 
    './group/groupRoutes.js', 
    './movie/movieRoutes.js', 
    './profile/profileRoutes.js', 
    './review/reviewRoutes.js'
];



swaggerAutogen(outputFile, endpointsFiles)