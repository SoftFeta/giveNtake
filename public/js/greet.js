var currentDate=new Date();
var hour=currentDate.getHours();
if (hour<6 || (hour >19 && hour<24)) {
    document.getElementById('thumbs').innerHTML="Good night";
} else if (hour < 12) {
    document.write("Good morning");
} else if (hour < 15) {
    document.write("Good afternoon");
} else {
    document.write("Good evening");
}