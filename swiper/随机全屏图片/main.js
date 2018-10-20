
var imageurls = ['./images/1.png','./images/2.png','./images/3.png'];

var bodyStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
}

var imageStyle = {
    width: '100%',
    height: '100%'
}

var body = document.getElementsByTagName('body')[0]


body.ondragstart = function(){
    return false
}

var content = document.createElement('div')

initStyle(content,imageStyle)

body.appendChild(content)

initStyle(body,bodyStyle)

function initStyle(ele, style){
    for(var attr in style){
        ele.style[attr] = style[attr]
    }
}

function init(imageArr){
    var length = imageArr.length

    var imageDOM = document.createElement('img')
    initStyle(imageDOM,imageStyle)
    imageDOM.src = imageArr[ Math.floor(Math.random()*length) ]
    content.appendChild(imageDOM)
    
}

init(imageurls)

carousel()
