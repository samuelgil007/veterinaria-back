//

module.exports = {
    PORT: process.env.PORT || 3000,
    DB: process.env.MONGODB_URI ,
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'estaeslallave'
}
