## Desafio Front-end

Número de itens disponíveis para consulta:

 - 26 Estados + DF
 - 5.287 Municípios

Técnologias usadas:

 - HTML5
 - CSS3 ( SASS )
 - jQuery
 - Chart.js ( para os gráficos )
 - Gulp
 - PHP ( apenas para gerar os arquivos locais para consulta, a aplicação não depende dele. )

Testado nos dispositivos:

 - Asus Zenfone 5 
 - Asus Zenfone 3 Max
 - Iphone 5s
 - Iphone 6 plus
 - Monitor 21" Full HD

Testado nos navegadores:

 - Google Chrome ( Desktop e Mobile )
 - Firefox ( Desktop e Mobile )
 - Safari
 - Via ( Mobile )
 - CM Browser ( Mobile )
 - Internet Explorer
 - Edge
 - Opera

### Mensagens de erros.

> Não foi possível recuperar as informações sobre a região!
( A API não retornou nenhum dado da região )

> Ops, ocorreu um erro inesperado! Não foi possível recuperar as informações sobre essa cidade.
( Quando o request retorna 404 )

> Nenhuma cidade selecionada.
( Quando o usuário tenta adicionar aos favoritos sem selecionar a cidade )

> Ops! Ocorreu algum erro inesperado.
( Exibido nos campos destinados as informações do clima, ele é apresentado quando a situação do clima não foi tratada no switch no main.js )

### Observações gerais sobre o projeto.

Para gerar os arquivos das cidades, fiz um script simples em php ( create_api.php ) para consultar a [API do Yahoo weather](https://developer.yahoo.com/weather/).

Confesso que vacilei em um detalhe na hora de criar os arquivos, acabei invalidando cidades com o mesmo nome em Estados diferentes. Consequentemente quando selecionada uma dessas cidades, existe a possibilidade de apresentar a informação incorreta.

> Como eu resolveria isso? Adicionando a sigla do Estado ao nome do arquivo.

No final dos projetos, sempre chego a conclusão de que "como design sou um ótimo malabarista" =P .