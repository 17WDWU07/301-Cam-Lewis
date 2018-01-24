
// var chartOne = document.getElementById("chart1");
// var chartTwo = document.getElementById("chart2");
// var chartThree = document.getElementById("chart3");
// var chartFour = document.getElementById("chart4");

// $("#chart1").click(function(){
// 		$("#chart1").toggleClass("large1");
// 		chartOne.scrollIntoView();
// });
// $("#chart2").click(function(){
// 		$("#chart2").toggleClass("large2");
// 		chartTwo.scrollIntoView();
// });
// $("#chart3").click(function(){
// 		$("#chart3").toggleClass("large3");
// 		chartThree.scrollIntoView();
// });
// $("#chart4").click(function(){
// 		$("#chart4").toggleClass("large4");
// 		chartFour.scrollIntoView();
// });

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

		var barChart = new google.visualization.ChartWrapper({
          	chartType: 'BarChart',
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
                	columns: [0, 1]
              }
          });


		var ageRangeSlider = new google.visualization.ControlWrapper({
          	controlType: 'NumberRangeFilter',
          	containerId: 'control1',
          	options: {
            	filterColumnLabel: 'Age'
          	}
      	});

      	var employmentFilter = new google.visualization.ControlWrapper({
          	controlType: 'CategoryFilter',
          	containerId: 'control2',
          	options: {
                filterColumnLabel: 'Employed',
                ui: {
                  allowMultiple: false,
                  allowTyping: false,
                  labelStacking: 'vertical'
                }
          	}
      	});

      	dashboard.bind([ageRangeSlider, employmentFilter], [barChart]);      	
      	dashboard.draw(data);
      	drawPie(dataFromJSON);
      	drawBar(dataFromJSON);


		google.visualization.events.addListener(ageRangeSlider, 'statechange', function() {
			var range = ageRangeSlider.getState();
			console.log(range);
			var view = new google.visualization.DataView(data);
			view.setRows(data.getFilteredRows([
			    {
			      column: 1,
			      minValue: range.lowValue,
			      maxValue: range.highValue
			    }
			]));
			// console.log(view);
			var filteredRows = view.ol;
			var newData = [];
			for (var i = 0; i < filteredRows.length; i++) {
				newData.push(dataFromJSON[filteredRows[i]]); 
			};
			// console.log(newData);
			drawPie(newData);
		});


		},
    	error: function(error) {
          console.log(error);
          alert("something went wrong, cannot connect to the server")
        }
	});

}

  function drawPie(data) {
      var dataEmployed = new google.visualization.DataTable();
      dataEmployed.addColumn('string', 'Employed');
      dataEmployed.addColumn('number', 'Count');

      var yes = 0, no = 0;

      for (var i = 0; i < data.length; i++) {
          if(data[i].employed == "Yes") {
            yes++;
          } else if (data[i].employed == "No") {
            no++;
          }
      }
      // console.log(data[i].employed);
      dataEmployed.addRow(["Yes", yes]);
      dataEmployed.addRow(["No", no]);

      var options = {
		title: "Employment rate among the class",
		backgroundColor: {
			fill: "transparent"
		}
      };

      var Pie = new google.visualization.PieChart(document.getElementById('chart2'));
      Pie.draw(dataEmployed, options);
  }

  function drawBar(data) {
      var dataEmployed = new google.visualization.DataTable();
      dataEmployed.addColumn('string', 'Employed');
      dataEmployed.addColumn('number', 'Count');

      var yes = 0, no = 0;

      for (var i = 0; i < data.length; i++) {
          if(data[i].employed == "Yes") {
            yes++;
          } else if (data[i].employed == "No") {
            no++;
          }
      }
      // console.log(data[i].employed);
      dataEmployed.addRow(["Yes", yes]);
      dataEmployed.addRow(["No", no]);

      var options = {
		title: "Employment rate among the class",
		backgroundColor: {
			fill: "transparent"
		}
      };

      var Bar = new google.visualization.BarChart(document.getElementById('chart3'));
      Bar.draw(dataEmployed, options);
  }