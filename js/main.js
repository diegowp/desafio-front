jQuery(document).ready(function($) {
	

	var general_funcs = {

		combo_cities: function(){

			var estados = $("#estados");
			var cidades = $("#cidades");

			$.ajax({
				url: 'js/estados_cidades.json',
				type: 'GET',
				dataType: 'json',
				success: function( data ){
					
					$.each( data, function( index, val ) {
						$("optgroup", estados).append('<option value="'+val["nome"]+'">'+val["nome"]+'</option>');
					});

					estados.change(function(event) {
						var city = $("option:selected", estados).val();

						cidades.empty();

						$.each( data, function( index, val ) {
							
							if( city == val['nome'] ){
								
								$.each( val["cidades"], function( index, val ) {
									cidades.append('<option value="'+val+'">'+val+'</option>');
								});

							}

						});

					});

				}
			});

		},

		getCityInfo: function(){

			var city = $("#cidades");

			city.change(function(event) {
				
				var city_selected = $("option:selected", city).val()

				$.ajax({
					url: 'json_api/'+city_selected+'.json',
					type: 'GET',
					dataType: 'json',
					success: function( data ){

						if( data.query.count == 0 ){
							$("span#messages").show();
							$("#messages").html("Não foi possível recuperar as informações sobre a região!");
						}else{

							$("span#messages").hide();
							var response = data.query.results.channel;

							var clima = [];

							clima['title'] = response.title

							clima['chill'] = general_funcs.convertToCelsius( response.wind.chill );
							clima['direction'] = response.wind.direction;
							clima['speed'] = general_funcs.convertToKm( response.wind.speed );

							clima['humidity'] = response.atmosphere.humidity;
							clima['visibility'] = general_funcs.convertToKm( response.atmosphere.visibility );

							for (var i = 0; i <= 4; i++) {
								clima['dias '+i] = [
									response.item.forecast[i].date,
									response.item.forecast[i].day,
									general_funcs.convertToCelsius( response.item.forecast[i].high ),
									general_funcs.convertToCelsius( response.item.forecast[i].low ),
									response.item.forecast[i].text
								];
							};

							general_funcs.assignFields( clima );
							general_funcs.createChart( clima );

						}

					}
				});
				

			});

		},

		assignFields: function( clima ){

			$(".cls").html("");

			$(".local").html( clima['title'] );
			$(".data").html( clima['dias 1'][0] );
			$(".situacao").html( clima['dias 1'][4] );
			$(".clima-max").html( "Max: " + clima['dias 1'][2] + "ºc" );
			$(".clima-min").html( "Min: " + clima['dias 1'][3] + "ºc" );

			$(".vento-umidade").html( "Umidade: " + clima['humidity'] + "%" );
			$(".vento-velocidade").html( "Velocidade: " + clima['speed'] + " km/h" );
			$(".vento-visibilidade").html( "Visibilidade: " + clima['visibility'] + " km/h");

		},

		createChart: function( clima ){

			var labels = [];
			var temps = [];
			var ctx = $("#chart");

			for (var i = 0; i <= 4; i++) {
				var dia = clima['dias '+i][0].split(" ");
				labels[i] = clima['dias '+i][1] + ' || Max: ' +clima['dias '+i][2]+ '/ Min: ' +clima['dias '+i][3] ;
				temps[i] = clima['dias '+i][2];
			};

			var data = {
				labels: labels,
				datasets: [
					{
						label: "Previsão para a semana",
						backgroundColor: [
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',
			                'rgba(75, 192, 192, 0.2)',
			                'rgba(153, 102, 255, 0.2)',
			                'rgba(255, 159, 64, 0.2)'
			            ],
			            borderColor: [
			                'rgba(255,99,132,1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)',
			                'rgba(75, 192, 192, 1)',
			                'rgba(153, 102, 255, 1)',
			                'rgba(255, 159, 64, 1)'
			            ],
			            borderWidth: 1,
			            data: temps,
					}
				]
			};

			var create = new Chart( ctx, {
				type: 'bar',
				data: data,
				options: {
			        scales: {
			            xAxes: [{
			                stacked: true
			            }],
			            yAxes: [{
			                stacked: true
			            }]
			        }
			    }
			} );

		},

		convertToCelsius: function( temp ){
			var calc = ( temp - 32 ) / 1.8;
			return calc.toFixed(0);
		},

		convertToKm: function( speed ){
			var calc = ( speed * 1.609 );
			return calc.toFixed(2);
		},

		init: function(){
			this.combo_cities();
			this.getCityInfo();
		}

	};

	general_funcs.init();

});