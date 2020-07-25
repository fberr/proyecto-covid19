const minuevoArreglo = [];
 fetch("https://chile-coronapi1.p.rapidapi.com/v3/latest/communes", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "chile-coronapi1.p.rapidapi.com",
		"x-rapidapi-key": "ad0e275576msha2a016a3104aedap1dc45cjsnc4bdf6359209"
	}
})
.then (response => response.json() )
.then(data => {
    let selectComuna = document.getElementById('select-comuna');
    
    for (var i in data) {
        let comunaId = data[i].communeInfo._id;
        let comunaNombre = data[i].commune;
        let comunaConfirmados = Object.values(data[i].confirmed);
        let comunaPoblacion = data[i].communeInfo.population;

        if (comunaId >= 13000 && comunaId <= 13999) {
          
            minuevoArreglo.push({ 
                id: comunaId, 
                commune: comunaNombre, 
                confirmados: comunaConfirmados,
                poblacion: comunaPoblacion
            })
        }
    }

    for (let o in minuevoArreglo) { 
        selectComuna.innerHTML += 
        `<option value="${minuevoArreglo[o].id}">${minuevoArreglo[o].commune}</option>`;
    }
    
    selectComuna.addEventListener('change', (event) => {
        const resultado = document.getElementById('resultado');
        const valuef = event.target.value;

        minuevoArreglo.forEach(element => {
            console.log(element)
            if (valuef == element.id) {
                resultado.innerHTML = 
                `<p>Comuna de: <strong>${element.commune}</strong><br> 
                Casos Positivos: <strong>${element.confirmados}</strong><br>
                Población: <strong>${element.poblacion}</strong>
                </p>`;
            }
        });
    });

    let com = document.querySelector('.com');
    let positivo = document.querySelector('.po');
    let pob = document.querySelector('.pob');
    resultado.innerHTML = 
    `<p>Comuna de: <strong>${minuevoArreglo[0].commune}</strong><br> 
        Casos Positivos: <strong>${minuevoArreglo[0].confirmados}</strong><br>
        Población: <strong>${minuevoArreglo[0].poblacion}</p></strong>
    `;

    document.querySelector('.loading').style.display = 'none';
    document.querySelector('.box-cifras').style.display = 'flex';
    

})
.catch(err => {
	console.log(err);
});

fetch("https://chile-coronapi1.p.rapidapi.com/v3/latest/nation", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "chile-coronapi1.p.rapidapi.com",
		"x-rapidapi-key": "ad0e275576msha2a016a3104aedap1dc45cjsnc4bdf6359209"
	}
})
.then (response => response.json() )
.then(data => { 
    let confirmadosNac = document.getElementById('confir-nac');
    let totalFall = document.getElementById('total-fall');
    let fechaNac = document.getElementById('fecha-nac');
    
    confirmadosNac.innerHTML = data.confirmed;
    totalFall.innerHTML = data.deaths;
    fechaNac.innerHTML = data.day;
})
.catch(err => {
	console.log(err);
});
// fecha actual formato mes/dia/año
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
console.log('hoy', today)