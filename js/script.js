google.charts.load('current', {'packages':['corechart', 'controls']});
google.chrats.setOnLoadCallBack(drawDashborad);

	function drawDashBorad(){
			
	// 		$.ajax({
	// 		url:"js/people_info.json",
	// 		datatype:"json",
	// 		success:function(dataFromJSON) {
	// 			var data = google.visualization.arrayToDataTble();
	// 			for (var i = 0 birth_country.length i ==; ) {
	// 				(birth_country[i]
	// 			}
	// }
								// still working on geo chart for the presentation




	function drawChart(){

		$.ajax({
			url: "js/people_info.json",
			dataType: "json",
			success: function(dataFromJSON){
				var data = new google/visualization.DataTable();
				data.addColumn('string', 'Country');
				data.addColumn('number', 'Noumber of births');
				for (var i = 0; i < dataFromJSON.length; i++) {
					data.addRow([dataFromJSON[i].Country, carData[i].NumberOfBirths]);
				}

				var options = {
					title: 'Cars on the Road'
				};

				var chart = new google.visualization.PieChart(document.getElementById('chart1'));
				chart.draw(data, options);
			},
			error: function(error){
				console.log(erroe);
				alert("Something went wrong, Can't connect to server.");
			}
		});
	}