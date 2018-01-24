
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

google.charts.load('current', {packages: ['corechart', 'controls']});
google.charts.setOnLoadCallback(drawDashboard);

function drawDashboard () {

	$.ajax({
		url: "js/people_info.json",
		dataType: "json",
		success: function(dataFromJSON) {
			console.log(dataFromJSON);

         	var data = new google.visualization.DataTable();
          	data.addColumn('number', 'Id');
          	data.addColumn('number', 'Age');
          	data.addColumn('string', 'Gender');  	
          	data.addColumn('string', 'Country of birth');
          	data.addColumn('string', 'Employed');
      		data.addColumn('string', 'Current living status');

          	for (var i = 0; i < dataFromJSON.length; i++) {
              data.addRow ([dataFromJSON[i].id,
              dataFromJSON[i].age,
              dataFromJSON[i].gender,
              dataFromJSON[i].birth_country,
              dataFromJSON[i].employed,
              dataFromJSON[i].living_status
            ]);
          }

      	var dashboard = new google.visualization.Dashboard (document.getElementById('dashboard'));

		var pieChart = new google.visualization.ChartWrapper({
          	chartType: 'PieChart',
          	containerId: 'chart1',
          		options: {
            		width: '100%',
                	height: '100%;',
                	legend: 'none',
                	title: 'Age vs Employed',
                	backgroundColor: {
          				fill: "transparent"
        			}
              	},
              	view: {
                	columns: [4, 5]
              }
          });





		var ageRangeSlider = new google.visualization.ControlWrapper({
          	controlType: 'NumberRangeFilter',
          	containerId: 'control1',
              	options: {
                	filterColumnLabel: 'Age'
              }
          });

      	dashboard.bind([ageRangeSlider], [pieChart]);      	
      	dashboard.draw(data);


		},
    	error: function(error) {
          console.log(error);
          alert("something went wrong, cannot connect to the server")
        }
	});


}