console.log('Loaded!');
var element=document.getElementById('main-text');
element.innerHTML="New Value";
var img=document.getElementById('madi');
var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft+10;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function(){
    var interval=setInterval(moveRight,100);
    img.style.marginLeft='100px';
};

var submit=document.getElementById('submit_btn');
submit.onclick=function(){
    
    var request= new XMLHttpRequest();
    
    request.onreadystatechange=function(){
         if(request.readyState===XMLHttpRequest.DONE){
             if(request.status===200){
                 alert('Logged in successfully');
             }
             else if(request.status===403){
                 alert('Username/Password is incorrect');
             }
             else if(request.status===500){
                 alert('Soemthing went wrong on the server');
             }
             }
         };
         var username=document.getElementById('username').value;
         var password=document.getElementById('password').value;
         console.log(username);
         console.log(password);
         request.open('POST','http://rajeshri119.imad.hasura-app.io/login',true);
         request.setRequestHeader('Content-Type','application/json');
         request.send(JSON.stringify({username:username,password:password}));
    };
   
