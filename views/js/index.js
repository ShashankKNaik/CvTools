$('#load,#arr,.sub').css('display','none');
$('.body').innerHeight($('body').innerHeight()-$('.head').innerHeight());
$('#choice').innerHeight($('.body').innerHeight());

let ca = document.cookie.split(';');
for(let i = 0; i < ca.length; i++) {
    let v=ca[i].split('=');
    if(v[0].match(/theme/) && v[1] == 'dark')
        theme();
}

$(window).resize(()=>{
    $('.body').innerHeight($(window).innerHeight()-$('.head').innerHeight());
    $('#choice').innerHeight($('.body').innerHeight());
})

$('.menu').click(()=>{
    $('#choice').slideToggle();
})
$('#choice').click(()=>{
    $('#choice').slideUp();
})

function convert(e){
    e.preventDefault();
    $('.corner .div1').html('?');
    $('.corner .div2').html('');
    $('.corner').removeClass('corner-add');
    if(document.getElementById("img").src != '' && c != -1){
        $('#res').css('display','none');
        $('#load,#arr').css('display','block');
            $.post('/image',{ 
                        base64 : document.getElementById("img").src,
                        choice : c,
                        selected:hexToRgb($('#selected').val()),
                        color:hexToRgb($('#color').val()),
                        size:$('#size').val(),
                        dimention:$('#dimention').val()
                    },(data)=>{
                        $('#res,#arr').css('display','block');
                        $('#load').css('display','none');
                        if(data == 'error')
                            alert('error');
                        else{
                            document.getElementById("res").src = data;
                            document.getElementById("download").href = data;
                        }
                        // console.log(data)
        })          
    }
}

function load(){
    sh = document.getElementById('scroller');
    sh.scrollTo(0, sh.scrollHeight);
    html=document.querySelector('html')
    $('html').scrollTop(html.scrollHeight)
}
from = document.getElementById('oriimg');
to = document.getElementById('modimg');

function type(choice,obj){
    c = choice;
    // <li></li>
    $('#menu label').html(obj.innerHTML);
    $('.sub').css('display','block');
    $('#kyc').css('display','none');
    $('#mid').html('>')
    switch(choice){
        case 0:
            from.src='images/onep.png';
            to.src = 'images/dotted.jpg';
            $('#list').html('<li>The modified image will have only black and white dots.</li><li>it appears like a grayscale image, zoom in or open the image in a new tab to view the effect.</li>')
            break;
        case 1:
            from.src='images/goku.jpg';
            to.src = 'images/gray.jpg';
            $('#list').html('<li>This will convert the image to grayscale.</li><li>What is grayscale? 🤔<br>Modified image will have only shades of gray</li>')
            break;
        case 2:
            from.src='images/virat.jpg';
            to.src = 'images/blend.jpg';
            $('#list').html('<li>This will blend the image color with the selected color.</li><li>Choose a color using the above color picker.</li><li>You can use the eyedropper in color picker to select a color.</li><li>In the above image, hair color is blended with red.</li>')  
            $('#fsize,#fdim').css('display','none');
            $('#selected,#color,#ls,#cs').css('display','inline-block');
            break;
        case 3:
            from.src='images/goku.jpg';
            to.src = 'images/color.jpg';
            $('#list').html('<li>This will change the image color with the selected color.</li><li>Choose a color using the above color picker.</li><li>You can use the eyedropper in color picker to select a color.</li>')            
            $('#fsize,#fdim').css('display','none');
            $('#selected,#color,#ls,#cs').css('display','inline-block');
            break;
        case 10:
            from.src='images/naruto.jpg';
            to.src = 'images/sketch.jpg';
            $('#list').html('<li>Convert image like pencil sketch</li>')            
            $('#fsize,#selected,#color,#ls,#cs,#fdim').css('display','none');
            break;
        case 4:
            from.src='';
            to.src = '';
            $('#mid').html('')
            $('#list').html('<li>Do you want to reduce the image size ?</li><li>This will help you to reduce image size approximately equals to the size specified by you.</li><li>1024kb = 1mb</li>') 
            $('#fdim,#selected,#color,#ls,#cs').css('display','none');
            $('#fsize').css('display','inline-block');
            break;
        case 5:
            from.src='';
            to.src = '';
            $('#mid').html('')
            $('#list').html('<li>This will help you to change dimention of the image.</li><li>90% means it will decrease the image dimention by 10%.</li><li>110% means it will increase the image dimention by 10%.</li>') 
            $('#fsize,#selected,#color,#ls,#cs').css('display','none');
            $('#fdim').css('display','inline-block');
            break;
        case 6:
            from.src='images/na.png';
            to.src = 'images/negative.jpg';
            $('#list').html('<li>This will convert your image to negative image.</li>') 
            $('#fsize,#selected,#color,#ls,#cs,#fdim').css('display','none');
            break;
        case 7:
            from.src='images/virat.jpg';
            to.src = 'images/grayinv.jpg';
            $('#list').html('<li>This will convert image to grayscale and then negative image.</li>') 
            $('#fsize,#selected,#color,#ls,#cs,#fdim').css('display','none');
            break;
        case 8:
            from.src='images/virat.jpg';
            to.src = 'images/frosted.jpg';
            $('#list').html('<li>Give your image frosted glass effect.</li>') 
            $('#fsize,#selected,#color,#ls,#cs,#fdim').css('display','none');
            break;
        case 9:
            from.src='images/naruto.jpg';
            to.src = 'images/oil.jpg';
            $('#list').html('<li>Give your image oil paint effect.</li>') 
            $('#fsize,#selected,#color,#ls,#cs,#fdim').css('display','none');
            break;
        case 11:
            from.src='images/virat.jpg';
            to.src = 'images/quantize.jpg';
            $('#list').html('<li>what is quantization? <br>Quantization is the process of converting a continuous range of values into a finite range of discreet values.</li>') 
            $('#fsize,#selected,#color,#ls,#cs,#fdim').css('display','none');
            break;
        default:
            $('#fsize,#selected,#color,#ls,#cs,#fdim').css('display','none');
            break;
    }
}

document.getElementById("inp").addEventListener("change", readFile);

function readFile() {
    var FR= new FileReader();
    if (this.files && this.files[0]) {
        FR.readAsDataURL( this.files[0] );         
        FR.addEventListener("load", function(e) {
            document.getElementById("img").src = e.target.result;
            $('.up-menu').addClass('shifter');
            $('#uplpadding,#menu').css('padding','5px');
            $('.home-info').css('display','none');
            $('.after-up,#window').css('display','block');
            $('.corner').css('z-index','1')
            $('.img-window').innerHeight($('.body').innerHeight()-$('#up-menu').innerHeight());
            $('#res,#load,#arr').css('display','none');
        }); 
    }
}
$('.corner .div1').click(()=>{
    $('.corner').toggleClass('corner-add');
    if($('.corner').hasClass('corner-add')){
        $('.corner .div1').html('x');
        $('.corner .div2').html($('.instrc-window').html());
    }else{
        $('.corner .div1').html('?');
        $('.corner .div2').html('');
    }
    
})

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    rgb = [parseInt(result[3], 16),parseInt(result[2], 16),parseInt(result[1], 16)].toString()
    return rgb;
}

function theme(){
    $('#sun').slideToggle(1000);
    $('#moon').slideToggle(1000);
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r)
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000 *365));
    let expires = "expires="+d.toUTCString();
    if(rs.getPropertyValue('--black1') == '#000000'){
        r.style.setProperty('--black1','#ffffff');
        r.style.setProperty('--black2','#e2e2e2');
        r.style.setProperty('--white','#171717');
        r.style.setProperty('--font-color','#e2e2e2');
        document.cookie = "theme=dark;" + expires + ";path=/";
        
    }else{
        r.style.setProperty('--black1','#000000');
        r.style.setProperty('--black2','#262626');
        r.style.setProperty('--white','#ffffff');
        r.style.setProperty('--font-color','#212529');
        document.cookie = "theme=bright;" + expires + ";path=/";
    }
}