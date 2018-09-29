
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
    height: '100%',
    float: 'left'
}

var body = document.getElementsByTagName('body')[0]

body.className = 'swiper-container swiper-no-swiping'

body.ondragstart = function(){
    return false
}

var content = document.createElement('div')

content.className = 'swiper-wrapper'

body.appendChild(content)

initStyle(body,bodyStyle)

function initStyle(ele, style){
    for(var attr in style){
        ele.style[attr] = style[attr]
    }
}

function init(imageArr){
    var length = imageArr.length
    for(var i=0; i<length; i++ ){
            var imageDOM = document.createElement('img')
            imageDOM.className = 'swiper-slide'
            initStyle(imageDOM,imageStyle)
            imageDOM.src = imageArr[i]
            content.appendChild(imageDOM)
    }
}

function carousel(){
    new Swiper('.swiper-container',{
        autoplay:{
            delay:2000
        },
        loop:true,
        speed:1000
    })
}

init(imageurls)

carousel()
