const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const mongoUrl = `mongodb://127.0.0.1:27017/vueblog`
const validation = require('./common/validation')
const Schema = mongoose.Schema


const UserSchema = new Schema({
  name: {
    type: String 
  }
})
mongoose.model('users', UserSchema)

const ArticleSchema = new Schema({
  title: {
    type: String
  },
  by: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})
mongoose.model('articles', ArticleSchema)

mongoose.Promise = global.Promise
mongoose.connection
  .openUri(mongoUrl)
  .once('open', async () => {
    console.log('database connect successed')
  })
  .on('error', (error) => {
    console.wran('database connect fail', error)
  })

const main = async (ctx) => {
  const ArticlesModel = mongoose.model('articles')
  ArticlesModel.findById('5aa89767ceafa83cdffbdfc0')   
    .populate('by')   
    .exec(function (err, story) {   
      if (err) {   

        ctx.body = '失败'
      } else { 
        ctx.body = story
      } 

  });  
}

app.use(main)
app.listen(3000)
