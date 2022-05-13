var canvas

const PRESET_TEXT_WRAP_LINEHEIGHT = 36

window.onload = ()=>{
    document.getElementById('generate-bt').addEventListener('click',onGenerateClick)
    document.getElementById('reset-bt').addEventListener('click',onResetClick)
    document.getElementById('popup-close-bt').addEventListener('click',onResetClick)
    canvas = document.getElementById('canvas-preview')
    canvas.width = 720
    canvas.height = 813
}

function onGenerateClick(){
    let context = canvas.getContext('2d')
    context.font = '36px "Noto Sans TC"'

    let row1Text = document.getElementById("trashtalk-row1-input").value
    let row2Text = document.getElementById("trashtalk-row2-input").value

    context.clearRect(0,0,canvas.width,canvas.height)

    let bg = new Image()
    bg.src = 'mat.png'
    bg.onload = () =>{
        context.drawImage(bg,0,0,bg.width,bg.height)

        context.save()
        context.fillStyle = '#FFF'
        context.textAlign = 'center'
        context.shadowBlur = 2;
        context.shadowColor = "#000000";
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 2;
        wrapText(context,row1Text, canvas.width/2, 380, canvas.width - 36)
        wrapText(context,row2Text, canvas.width/2, 780, canvas.width - 36)

        context.restore()

        // const dataUrl = canvas.toDataURL("image/png");
        // document.getElementById('preview-img').src = dataUrl
        // document.getElementById('preview-popup').style.visibility = "visible"

        canvas.toBlob((blob)=>{
            saveAs(blob, 'trash-talk.png')
        })
    }
}

function wrapText(context, text, x, y, maxWidth) {
    let arrText = text.split('')
    let line = ''
    for(let n = 0; n < arrText.length; n++){
        var testLine = line + arrText[n];
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = arrText[n];
            y += PRESET_TEXT_WRAP_LINEHEIGHT;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}


function onResetClick(){
    let context = canvas.getContext('2d')
    context.clearRect(0,0,canvas.width,canvas.height)

    document.getElementById("trashtalk-row1-input").value = ""
    document.getElementById("trashtalk-row2-input").value = ""

    //document.getElementById('preview-img').src = ''
    //document.getElementById('preview-popup').style.visibility = "hidden"
}