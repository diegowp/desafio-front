jQuery(document).ready(function($) {	

	var general_funcs = {

		combo_cities: function(){

			var estados = $("#estados");
			var cidades = $("#cidades");

			$.ajax({
				url: 'js/estados_cidades.json',
				type: 'GET',
				dataType: 'jsonp',
				success: function( data ){
					
					$.each( data, function( index, val ) {
						$("optgroup", estados).append('<option value="'+val["nome"]+'">'+val["nome"]+'</option>');
					});

					estados.change(function(event) {
						var city = $("option:selected", estados).val();

						cidades.empty();

						cidades.append('<option value=". . .">. . .</option>');

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
				
				var city_selected = $("option:selected", city).val();
				general_funcs.requestCityInfo( city_selected );								

			});

		},

		requestCityInfo: function( city_selected ){

			$.ajax({
				url: 'json_api/'+city_selected+'.json',
				type: 'GET',
				dataType: 'jsonp',
				success: function( data ){

					if( data.query.count == 0 ){
						$("span#messages").show();
						$("#messages").html("Não foi possível recuperar as informações sobre a região!");
					}else{

						$("span#messages").hide();
						$(".for-weekend-wrapper p").html("");
						var response = data.query.results.channel;

						var clima = [];

						clima['title'] = response.title

						clima['chill'] = general_funcs.convertToCelsius( response.wind.chill );
						clima['direction'] = response.wind.direction;
						clima['speed'] = general_funcs.convertToKm( response.wind.speed );

						clima['humidity'] = response.atmosphere.humidity;
						clima['visibility'] = general_funcs.convertToKm( response.atmosphere.visibility );

						for (var i = 0; i <= 7; i++) {
							clima['dias '+i] = [
								response.item.forecast[i].date,
								response.item.forecast[i].day,
								general_funcs.convertToCelsius( response.item.forecast[i].high ),
								general_funcs.convertToCelsius( response.item.forecast[i].low ),
								response.item.forecast[i].text
							];
						};

						general_funcs.assignFields( clima );
						general_funcs.weekend( clima );
						general_funcs.createChart( clima );

					}

				},
				error: function(){
					$("#messages").html("Ops, ocorreu um erro inesperado! Não foi possível recuperar as informações sobre essa cidade.");
					$("#messages").addClass('show');
				}
			});

		},

		assignFields: function( clima ){

			// Limpa os campos
			$(".cls").html("");

			$(".local").html( clima['title'] );
			$(".data").html( clima['dias 1'][0] );
			$(".situacao").html( clima['dias 1'][4] + " - " );
			$(".clima-max").html( "Max: " + clima['dias 1'][2] + "ºc" );
			$(".clima-min").html( "Min: " + clima['dias 1'][3] + "ºc" );

			$(".vento-umidade").html( "Umidade do ar: " + clima['humidity'] + "%" );
			$(".vento-velocidade").html( "Velocidade do vento: " + clima['speed'] + " km/h" );
			$(".vento-visibilidade").html( "Visibilidade: " + clima['visibility'] + " km");

			// Informações da semana
			var weekDetail = $("#semana");
			weekDetail.html('<ul class="semana-list"></ul>');
			semanaList = $(".semana-list", weekDetail);

			for( var i = 0; i <= 7; i++  ){
				semanaList.append('<li>'+clima["dias "+i][1]+' <br/> Max: '+clima["dias "+i][2]+'ºc <br/> Min: '+clima["dias "+i][3]+'ºc </li>');
			}

			this.weatherCases( clima['dias 1'] );

		},

		weekend: function( clima ){

			for( var i = 0; i <= 7; i++  ){

				if( clima['dias '+i][1] == "Sat" ){
					var sat = clima['dias '+i];
				}
				if( clima['dias '+i][1] == "Sun" ){
					var sunday = clima['dias '+i];
				}

			}

			this.weatherCases( sat );
			this.weatherCases( sunday );			

		},

		weatherCases: function( day ){

			var showMessage = "",
				label = "",
				splitDay = "";

			console.log( day );

			if( day[1] == "Sat" ){
				splitDay = day[0].split(" ");
				showMessage = $(".for-weekend-wrapper p");
				label = "Para esse Sabádo dia " + splitDay[0] + ", teremos um dia ";
			}
			else if( day[1] == "Sun"){
				splitDay = day[0].split(" ");
				showMessage = $(".for-weekend-wrapper p");
				label = "Para esse Domingo dia " + splitDay[0] + ", teremos um dia ";
			}
			else if( (day[1] !== 'Sat') && (day[1] !== 'Sun') ){
				showMessage = $(".situacao");
				label = "Hoje teremos um dia ";
			}

			switch( day[4] ){
				case "Tropical Storm":
					text = "com Tempestades tropicais. Não esqueça de sair acompanhando de um guarda-chuvas.<br/><br/>";
					showMessage.append( text );
					break;
				case "Thunderstorms":
					text = label + "com Trovoadas. Evite a manipulação de equipamentos que conduzam eletricidade e procure um local seguro para se abrigar.<br/><br/>";
					showMessage.append( text );
					break;
				case "Drizzle":
					text = label + "com Garoa. Talvez assistir um Netflix seja uma boa opção =)<br/><br/>";
					showMessage.append( text );
					break;
				case "Hail":
					text = label + "com Granizo. Grandes chances de chuvas de granizo, evite locais abertos e procure um lugar seguro para se abrigar.<br/><br/>";
					showMessage.append( text );
					break;
				case "Dust":
					text = label + "com Tempo seco. Mantenha o corpo hidratado, e evite ficar muito tempo expoosto ao Sol.<br/><br/>";
					showMessage.append( text );
					break;
				case "Foggy":
					text = label + "com Neblina. Muito cuidado nas estradas, neblina requer atenção dobrada.<br/><br/>";
					showMessage.append( text );
					break;
				case "Windy":
					text = label + "com Ventania. Evite locais com muitas árvores. Caso seja pego de surpresa, procure um local seguro para se abrigar.<br/><br/>";
					showMessage.append( text );
					break;
				case "Cloudy":
					text = label + "Nublado. Se for sair, talvez seja bom levar um guarda-chuvas =) <br/><br/>";
					showMessage.append( text );
					break;
				case "Cold":
					text = label + "Frio. Hora de tirar o casaco do guard-roupas, Talvez um cinema ou uma boa bebida quente em casa seja uma opção =).<br/><br/>";
					showMessage.append( text );
					break;
				case "Mostly Cloudy":
					text = label + "Predominantemente nublado. Se for sair, talvez seja bom levar um guarda-chuvas =) <br/><br/>";
					showMessage.append( text );
					break;
				case "Partly Cloudy":
					text = label + "Parcialmente nublado. O dia não será tão bonito, sair com um guarda-chuvas é boa idéia.<br/<br/>";
					showMessage.append( text );
					break;
				case "Mixed Rain and Hail":
					text = label + "com Chuva com granizo. Evite ficar em locais abertos.<br/><br/>";
					showMessage.append( text );
					break;
				case "Hot":
					text = label + "Quente. Beba bastante água e evite a exposição ao Sol em excesso no período das 11h às 15h.<br/><br/>";
					showMessage.append( text );
					break;
				case "Sunny":
					text = label + "Ensolarado. Beba bastante água e aproveite esse belo dia para conhecer os parques de sua cidade =)<br/><br/>";
					showMessage.append( text );
					break;
				case "Isolated Thunderstorms":
					text = label + "com Tempestades isoladas. Não esqueça de levar o seu guarda-chuvas.<br/><br/>";
					showMessage.append( text );
					break;
				case "Scattered Thunderstorms":
					text = label + "com Tempestades dispersas. Não esqueça de levar o seu guarda-chuvas.<br/><br/>";
					showMessage.append( text );
					break;
				case "Scattered Showers":
					text = label + "com Chuvas dispersas. Não esqueça de levar o seu guarda-chuvas.<br/><br/>";
					showMessage.append( text );
					break;
				case "Rain":
					text = label + "com Tempestades dispersas. Não esqueça de levar o seu guarda-chuvas.<br/><br/>";
					showMessage.append( text );
					break;
				default:
					text = "Ops! Ocorreu algum erro inesperado.<br/><br/>";
					showMessage.append( text );
					break;
			}

		},

		createChart: function( clima ){

			var labels = [];
			var temps = [];
			var ctx = document.getElementById("chart");

			for (var i = 0; i <= 7; i++) {
				var dia = clima['dias '+i][0].split(" ");
				//labels[i] = clima['dias '+i][1] + ' || Max: ' +clima['dias '+i][2]+ '/ Min: ' +clima['dias '+i][3] ;
				labels[i] = clima['dias '+i][1];
				temps[i] = clima['dias '+i][2];
			};

			var data = {
				labels: labels,
				datasets: [
					{
			            label: "Previsão para a semana",
			            fill: false,
			            lineTension: 0.1,
			            backgroundColor: "rgba(75,192,192,0.4)",
			            borderColor: "rgba(75,192,192,1)",
			            borderCapStyle: 'butt',
			            borderDash: [],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "rgba(75,192,192,1)",
			            pointBackgroundColor: "#fff",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "rgba(75,192,192,1)",
			            pointHoverBorderColor: "rgba(220,220,220,1)",
			            pointHoverBorderWidth: 2,
			            pointRadius: 1,
			            pointHitRadius: 10,
			            data: temps,
			            spanGaps: false,
			        }
				]
			};

			Chart.defaults.global.responsive = true;
			var create = new Chart( ctx, {
				type: 'line',
				data: data,
				options: {
					responsive: true,
					scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero:true
			                }
			            }]
			        }
			    }
			} );

		},

		setFavorite: function(){

			$(".favorito").click(function(event) {
				event.preventDefault();

				if( general_funcs.getLocalStorage() ){

					general_funcs.deleteLocalStorage();
					$("i", this).removeClass('fa-star');
					$("i", this).addClass('fa-star-o');					

				}else{

					var city = $("#cidades");
					var city_selected = $("option:selected", city).val();

					if( city_selected ){
						$("span#messages").hide();
						general_funcs.setLocalStorage( city_selected );
						$("i", this).removeClass('fa-star-o');
						$("i", this).addClass('fa-star');
					}else{
						$("span#messages").html( "Nenhuma cidade selecionada" );
						$("span#messages").show();
					}
					
				}

			});	

		},

		defaultValues: function(){

			if( !this.getLocalStorage() ){
				this.requestCityInfo( 'Blumenau' );
				$("#cidades").append('<option value="Blumenau">Blumenau</option>');
			}else{
				var favorito = $(".favorito");
				$("i", favorito).removeClass('fa-star-o');
				$("i", favorito).addClass('fa-star');
				$("#cidades").append('<option value="'+this.getLocalStorage()+'">'+this.getLocalStorage()+'</option>');
				this.requestCityInfo( this.getLocalStorage() );
			}

		},

		convertToCelsius: function( temp ){
			var calc = ( temp - 32 ) / 1.8;
			return calc.toFixed(0);
		},

		convertToKm: function( speed ){
			var calc = ( speed * 1.609 );
			return calc.toFixed(2);
		},

		setLocalStorage: function( city ){
			return localStorage.setItem( "cidade", city );
		},

		getLocalStorage: function(){
			return localStorage.getItem("cidade");
		},

		deleteLocalStorage: function(){
			return localStorage.removeItem("cidade");
		},

		init: function(){
			this.combo_cities();
			this.getCityInfo();
			this.setFavorite();
			this.defaultValues();
		}

	};

	general_funcs.init();

});