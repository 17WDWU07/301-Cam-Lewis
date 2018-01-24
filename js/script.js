
var chartOne = document.getElementById("chart1");
var chartTwo = document.getElementById("chart2");
var chartThree = document.getElementById("chart3");
var chartFour = document.getElementById("chart4");

$("#chart1").click(function(){
		$("#chart1").toggleClass("large1");
		chartOne.scrollIntoView();
});
$("#chart2").click(function(){
		$("#chart2").toggleClass("large2");
		chartTwo.scrollIntoView();
});
$("#chart3").click(function(){
		$("#chart3").toggleClass("large3");
		chartThree.scrollIntoView();
});
$("#chart4").click(function(){
		$("#chart4").toggleClass("large4");
		chartFour.scrollIntoView();
});