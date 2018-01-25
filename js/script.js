
var chartOne = document.getElementById("chart1");
var chartTwo = document.getElementById("chart2");
var chartThree = document.getElementById("chart3");
var chartFour = document.getElementById("chart4");

// $(function ()
// {
//     $('#chart1').on('click', function ()
//     {
//         $(this).width(1000).height(1000);
//     });
// });

// $("#chart1").click(function(){
// 		$("#chart1").toggleClass("large1").show();
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
			// console.log(dataFromJSON);

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
      		width: '450',
        	height: '470',
        	legend: 'Country vs employment rate',
        	title: 'Country vs employment rate',
          colorAxis: {colors: ['#00853f', '#e31b23']},
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
            labelStacking: 'horizontal'
          }
      	}
  	});

    var livingFilter = new google.visualization.ControlWrapper({
        controlType: 'CategoryFilter',
        containerId: 'control3',
        options: {
          filterColumnLabel: 'Living status',
          ui: {
            allowMultiple: false,
            allowTyping: false,
            labelStacking: 'vertical'
          }
        }
    });

  	dashboard.bind([ageRangeSlider, employmentFilter], [geoChart], [livingFilter]);      	
  	dashboard.draw(data);
  	drawPie(dataFromJSON);
  	drawBar(dataFromJSON);
    drawDonut(dataFromJSON);

    ///// controls /////
		google.visualization.events.addListener(ageRangeSlider, 'statechange', function() {
			var range = ageRangeSlider.getState();
			// console.log(range);
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
      // drawDonut(newData);
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
        width: '590',
        height: '400',
        colors:['white', '#ffffff'],
        legend: {textStyle: {color: 'white'}},
        titleTextStyle: {color: 'white'},
        slices: {
            0: {color: '#336E7B'},
            1: {color: '#2574A9'}
        },
        backgroundColor: {
		      fill: "transparent"
		    },
        width: '600',
        height: '600' 
      };

      var Pie = new google.visualization.PieChart(document.getElementById('chart2'));
      Pie.draw(dataEmployed, options);


  }
    

  function drawBar(data) {
      var dataLiving = new google.visualization.DataTable();
      dataLiving.addColumn('string', 'Current living status');
      dataLiving.addColumn('number', 'number of people');

      var parents = 0, homeowner = 0, renting = 0;

      for (var i = 0; i < data.length; i++) {
          if(data[i].living_status == "Living with parents") {
            parents++;
          } else if (data[i].living_status == "Homeowner") {
            homeowner++;
          } else if (data[i].living_status == "Renting") {
            renting++;
          }
      }
      // console.log(data[i].employed);
      dataLiving.addRow(["Parents", parents]);
      dataLiving.addRow(["Homeowner", homeowner]);
      dataLiving.addRow(["Renting", renting]);

      var options = {
		    title: "Current living status",
        legend: 'none',
        titleTextStyle: {color: 'white'},
        hAxis: {title: 'number of people', titleTextStyle: {color: 'white'}},
        vAxis: {textStyle: {color: 'white'}},
		    backgroundColor: {
			     fill: "transparent"
		    }
      };

      var Bar = new google.visualization.BarChart(document.getElementById('chart3'));
      Bar.draw(dataLiving, options);
  }

  function drawDonut(data) {
      var dataGender = new google.visualization.DataTable();
      dataGender.addColumn('string', 'Gender');
      dataGender.addColumn('number', 'Count');

      var male = 0, female = 0;

      for (var i = 0; i < data.length; i++) {
          if(data[i].gender == "Male") {
            male++;
          } else if (data[i].gender == "Female") {
            female++;
          }
      }
      // console.log(data[i].employed);
      dataGender.addRow(["Male", male]);
      dataGender.addRow(["Female", female]);

      var options = {
        title: "Gender makeup",
        pieHole: 0.4,
        width: '570',
        height: '500',
        legend: {textStyle: {color: 'white'}},
        titleTextStyle: {color: 'white'},
        slices: {  
            0: {offset: 0.2, color: '#336E7B'},
            1: {color: '#34495E'}
          },
        backgroundColor: {
          fill: "transparent"
        }
      };

      var Donut = new google.visualization.PieChart(document.getElementById('chart4'));
      Donut.draw(dataGender, options);
  }