//

module.exports = {
    PORT: process.env.PORT || 3000,
    DB: process.env.MONGODB_URI || 'mongodb://analytics:analytics-password@cluster0-shard-00-00.za8im.mongodb.net:27017,cluster0-shard-00-01.za8im.mongodb.net:27017,cluster0-shard-00-02.za8im.mongodb.net:27017/veterinaria?ssl=true&replicaSet=atlas-ur9ln5-shard-0&authSource=admin&retryWrites=true&w=majority',
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'estaeslallave'
}