
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

google.charts.load('current', {packages: ['geochart', 'corechart', 'controls'],
'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'});
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

		var geoChart = new google.visualization.ChartWrapper({
          	chartType: 'GeoChart',
          	containerId: 'chart1',
          		options: {
            		width: '90%',
                	height: '90%;',
                	legend: 'none',
                	title: 'Country vs employment rate',
                	backgroundColor: {
          				fill: "transparent"
        			}
              	},
              	view: {
                	columns: [3]
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

      	dashboard.bind([ageRangeSlider, employmentFilter], [geoChart]);      	
      	dashboard.draw(data);
      	drawPie(dataFromJSON);
      	drawBar(dataFromJSON);
        drawDonut(dataFromJSON);

    ///// controls /////
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
      drawDonut(newData);
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
        width: '400',
        height: '400',
        slices: {  
            0: {color: '#336E7B'},
            1: {color: '#2574A9'}
        },
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

  function drawDonut(data) {
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
        pieHole: 0.4,
        slices: {  
            0: {offset: 0.2, color: '#336E7B'},
            1: {color: '#34495E'}
          },
        backgroundColor: {
          fill: "transparent"
        }
      };

      var Donut = new google.visualization.PieChart(document.getElementById('chart4'));
      Donut.draw(dataEmployed, options);
  }