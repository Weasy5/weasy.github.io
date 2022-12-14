const express = require('express')
const app = express()
const port = 8999
const fs = require('fs')

app.use(express.static('./view'))
const readFiles = () => {
  let result = {};
  fs.readdirSync('./files').forEach((v)=>{
      let packageObj = JSON.parse(fs.readFileSync(`./files/${v}`).toString())
      result[v] = packageObj
  })
  return result

}
const handleData = (name,data) => {
  let obj = {}
  obj.name = name
  for(let key in data){
    if(key === 'dependencies'){
      obj.dependencies = data[key]
    }
    if(key === 'devDependencies'){
      obj.devDependencies = data[key]
    }
  }
  return obj
}
app.get('/data',  (req, res) =>  {
  let devColumns = []
  let devColumnsObj = {}

  let columns = []
  let columnsObj = {}

  let devData = []
  let data = []
  const souceData =  readFiles()
  for(let key in souceData){
    const value = handleData(key, souceData[key])
    devData.push({name: key, ...value.devDependencies})
    data.push({name: key, ...value.dependencies})
    devColumnsObj = {...devColumnsObj, ...value.devDependencies}
    // devColumns = [...devColumns, ...Object.keys(value.devDependencies) ]
    // columns = [...columns, ...Object.keys(value.dependencies) ]
    columnsObj = {...columnsObj, ...value.dependencies}
  }
  devColumns = [...Object.keys(devColumnsObj)]
  columns = [...Object.keys(columnsObj)]
  res.send({
      data,
    devData,
    columns,
    devColumns,
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})