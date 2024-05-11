const mongoose = require('mongoose')
const colors = require("colors")

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Mongodb database ${mongoose.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`Mongodb database error ${error}`.bgRed.white)
    }
}


module.exports = connectDB