/**
 * @author dongzhu
 */
KISSY.ready(function(){
	var canvas=document.getElementById("J_Canvas");
   	if(canvas==null) return false;
   var context=canvas.getContext("2d");
   function draw(){
   	
   	
   	context.fillStyle="#eeeeff";
   	var n=0;
   	for (var i=0;i<10;i++){
   		context.beginPath();
   		context.arc(i*25,i*25,i*10,0,Math.PI*2,true);
   		context.closePath();
   		context.fillStyle='rgba(255,0,0,0.25)';
   		context.fill();
   	}
   }
   function write(text,x,y){
   	context.fillStyle='#00f';
   	context.font='bold 30px ËÎÌå';
   	context.fillText(text,x,y);
   	console.log(text);
   }
   draw();
   var yinghuo="Áõ³¬ÎäÍ¬Ñ§".split('');
   console.log(yinghuo);
   for (var i=0; i < yinghuo.length; i++) {
   	var str=yinghuo[i],x=30*i,y=50,arg=[str,x,y];
   	
   	setTimeout(write,500*i,str,x,y);
    
   };
   
});
