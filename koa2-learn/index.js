const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  const { url, method } = ctx;
  if (url==='/' && method==='GET') {
    let html=`
        <h1>JSPang Koa2 request POST</h1>
        <form method="POST" action="/">
            <p>userName</p>
            <input name="userName" /><br/>
            <p>age</p>
            <input name="age" /><br/>
            <p>website</p>
            <input name="webSite" /><br/>
            <button type="submit">submit</button>
        </form>
    `;
    ctx.body=html;
  } else if (ctx.url==='/' && ctx.method==='POST') {
    let pastData=await parsePostData(ctx);
    ctx.body=pastData;
  } else {
    ctx.body='<h1>404!</h1>';
  }
})

function parsePostData(ctx) {
  console.log('ctx: ', ctx);
  return new Promise((resolve, reject) => {
    try {
      let postData = '';
      ctx.req.on('data', data => {
        console.log(' data: ', data);
        postData += data
      })
      ctx.req.addListener('end', () => {
        console.log('postData: ', postData);
        let parseData = parseQueryStr( postData )
        resolve(parseData); 
      })
    } catch(error) {
      reject(error)
    }
  })
}

function parseQueryStr(queryStr) {
  let queryData = {};
  let queryStrList = queryStr.split('&');
  console.log('queryStrList', queryStrList);
  for( let [index,queryStr] of queryStrList.entries() ){
    let itemList = queryStr.split('=');
    console.log(itemList);
    queryData[itemList[0]] = decodeURIComponent(itemList[1]);
  } 
  return queryData
}

app.listen(3000);
console.log('[demo] start-quick is starting at port 3000');
