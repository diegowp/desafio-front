jQuery(document).ready(function($) {
	

	var general_funcs = {

		combo_cities: function(){

			$.ajax({
				url: 'estados_cidades.json',
				type: 'GET',
				dataType: 'jsonp',
				success: function( data ){
					
				}
			});
			

		},

		init: function(){

		}

	};

	general_funcs.init();

});