function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i<=num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}
function convertToCastString(casts){
  var castsjson =""
  for(var i in casts){
    castsjson = castsjson +casts[i].name+"/"
  }
  return castsjson.substring(0, castsjson.length-1)
}
function convertTocastInfo(casts){
  var castInfo =[]
  for(var i in casts){
    var cast={
      image: casts[i].avatars ? casts[i].avatars.large:"",
      name:casts[i].name
    }
    castInfo.push(cast)

  }
  return castInfo
}
function http (url,callback) {
  wx.request({
    url: url,
    method: 'get',
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      callback(res.data)
    },
    fail: function (error) {
      console.log(error)
    }
  })
  

}
module.exports={
  convertToStarsArray: convertToStarsArray,
  http:http,
  convertToCastString: convertToCastString,
  convertTocastInfo: convertTocastInfo
}