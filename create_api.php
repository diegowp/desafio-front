<?php

header('Content-Type: text/html; charset=utf-8');

set_time_limit( 9999999999 );

function getData( $cidade ){
	$cidade = str_replace(' ', '%20', $cidade);
	$data = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' .$cidade. '%2C%20bra%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
	$getDataContent = file_get_contents( $data );
	return $getDataContent;
}

$combo_cidades = 'combo_cidades/estados_cidades.json';
$getComboContent = json_decode( file_get_contents( $combo_cidades ), true );

foreach ($getComboContent as $key => $value) {
	# code...
	print_r( $value['nome'] );
	echo '<br>';

	foreach ($value['cidades'] as $key => $value) {
		# code...
		echo '->' . $value . '<br>';

		$create_json = 'json_api/' . trim( utf8_decode($value) ) . '.json';
		$fp = fopen( $create_json , 'w');
		$response = getData( $value );
		fwrite( $fp , $response);
		fclose( $fp );
	}

}

echo "end";


?>