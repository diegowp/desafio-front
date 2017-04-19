<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Desafio FrontEnd - DWP Clima / Tempo</title>		
		<meta name="description" content="Desafio FrontEnd - DWP Clima / Tempo">
		<meta name="keywords" content="Desafio FrontEnd - DWP Clima Tempo"> 
		<meta name="author" content="DiegoDWP">
		<link rel="stylesheet" href="css/font-awesome.min.css">
		<link rel="stylesheet" href="css/main.css">
	</head>
	<body>
		
		<header id="header" class="fluid-box">
			<div class="content container-box">
				<!-- <nav class="main-menu-content">
					<a href="/" class="nav-brand">DWP</a>
					<ul class="main-menu">
						<li>
							<a href="#">Menu 1</a>
						</li>
						<li>
							<a href="#">Menu 2</a>
						</li>
						<li>
							<a href="#">Menu 3</a>
						</li>
					</ul>
				</nav> -->
			</div>
		</header>

		<section id="main" class="fluid-box">
			<div class="content container-box">
				
				<article id="result" class="card-wrapper">
					<header class="card-header">
						<h3>Selecione uma cidade</h3>
						<select id="estados">
							<option value="Selecione . . .">Selecione . . .</option>
							<optgroup label="Estados"></optgroup>
						</select>
						<select id="cidades">
						</select>
						<span id="messages"></span>
						<a href="#" class="favorito"><i class="fa fa-star-o" aria-hidden="true"></i></a>
					</header>
					<div class="card-content">
						
						<h3 class="local cls">--</h3>
						<span class="data cls">--</span> - <span class="situacao cls">--</span>

						<div class="clima-wrapper">
							<ul class="clima-itens">
								<li class="clima-max cls">Max: --</li>
								<li class="clima-min cls">Min: --</li>
							</ul>
						</div>	

						<div class="vento-wrapper">
							<ul class="vento-itens">
								<li class="vento-umidade cls">Umidade do ar: --</li>
								<li class="vento-velocidade cls">Velocidade do vento: --</li>
								<li class="vento-visibilidade cls">Visibilidade: --</li>
							</ul>
						</div>

						<div class="for-weekend-wrapper">
							<h3>Dicas para o final de semana:</h3>
							<p></p>
						</div>

					</div>
					<footer class="card-footer">
						<canvas id="chart" width="600" height="400"></canvas>
					</footer>
				</article>

			</div>
		</section>

		<footer id="footer" class="fluid-box">
			<div class="content container-box">
				
			</div>
		</footer>


		<script type="text/javascript" src="js/jquery.min.js"></script>
		<script type="text/javascript" src="js/chart.js"></script>
		<script type="text/javascript" src="js/main.js"></script>

	</body>
</html>