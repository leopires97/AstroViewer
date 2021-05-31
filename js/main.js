//pega o ID formulario sendo "chamado" pelo botão com a classe Submit
document.getElementById("formulario").addEventListener("submit", cadastrarVeiculo);		/*pega a form e tem o evento que é o click do submit*/

//função de cadastro
function cadastrarVeiculo(e){
	var modeloVeiculo = document.getElementById("modeloVeiculo").value;		/*pega o valor do campo input modeloVeiculo do HTML*/
	var placaVeiculo = document.getElementById("placaVeiculo").value;		/*pega o valor do campo input placaVeiculo do HTML*/
	var time = new Date();
	
	if(modeloVeiculo == "" && placaVeiculo == "" || modeloVeiculo == "" || placaVeiculo == "")
	{
		window.alert("Campos obrigatórios não preenchidos.");
	} else {
	carro = {	/*cria o objeto com os seguintes parametros.*/
		modelo: modeloVeiculo,
		placa: placaVeiculo,
		hora: (time.getHours() < 10 ? '0' : '') + time.getHours(),
		minutos: (time.getMinutes() < 10 ? '0' : '') + time.getMinutes(),
		segundos: (time.getSeconds() < 10 ? '0' : '') + time.getSeconds()
	}
	if(localStorage.getItem("patio") === null) {	 
		var carros = [];
		carros.push(carro);
		localStorage.setItem("patio", JSON.stringify(carros))
	} else {
		var carros = JSON.parse(localStorage.getItem("patio"));
		carros.push(carro);
		localStorage.setItem("patio", JSON.stringify(carros));
	}
	document.getElementById("modeloVeiculo").value = "";
	document.getElementById("placaVeiculo").value = "";
	mostraPatio();
	}
	e.preventDefault();	
}

function apagarVeiculo(placa) {
	var carros = JSON.parse(localStorage.getItem("patio"));
	
	for(var i = 0; i < carros.length; i++) {
		if(carros[i].placa == placa){
			carros.splice(i, 1);
		}
		localStorage.setItem("patio", JSON.stringify(carros));
	}
	mostraPatio();
}

function mostraPatio(){
	var carros = JSON.parse(localStorage.getItem("patio"));
	var carrosResultado = document.getElementById("resultado");
	
	carrosResultado.innerHTML = "";
	
	for(var i = 0; i < carros.length; i++){
		var modelo = carros[i].modelo;
		var placa = carros[i].placa;
		var hora = carros[i].hora + ":" + carros[i].minutos + ":" + carros[i].segundos;	

		carrosResultado.innerHTML += "<tr><td>" + modelo +
									"</td><td>" + placa +
									"</td><td>" + hora + "</td>" +
		'<td><button class="btn btn-danger" onClick="apagarVeiculo(\'' + placa + '\')">Excluir</button></td></tr>';
	}
}