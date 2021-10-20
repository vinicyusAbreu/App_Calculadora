(function() {
    'use strict';
    const theme1 = document.querySelector('.theme-1');
    const theme2 = document.querySelector('.theme-2');
    const theme3 = document.querySelector('.theme-3');
    const indicador = document.querySelector('.indicator');
    const numeros = document.querySelectorAll("[data-js='button-number']")
    const operacao = document.querySelectorAll("[data-js='button-operation']")
    const igual = document.querySelector('[data-js="button-equal"]')
    const resultado = document.querySelector('input');
    const reset = document.querySelector('[data-js="button-ce"]');
    const del = document.querySelector('[data-js="button-del"]');


    const changeTheme = (value) => {
        document.documentElement.removeAttribute("data-theme");
        document.documentElement.setAttribute("data-theme", `theme${value}`);
    }



    theme1.addEventListener('click', function() {
        indicador.style.left = '.3rem'
        changeTheme(1)
    })
    theme2.addEventListener('click', function() {
        indicador.style.left = '2.15rem'

        changeTheme(2)
    })
    theme3.addEventListener('click', function() {
        indicador.style.left = '4.3rem'
        changeTheme(3)
    })

    Array.from([...numeros]).forEach(event => {
        event.addEventListener('click', clickNumero)
    });

    Array.from([...operacao]).forEach(event => {
        event.addEventListener('click', clickOperacao)
    });

    igual.addEventListener('click', resultadoOperacao);

    reset.addEventListener('click', reseteResultados)

    del.addEventListener('click', deleteCaracter);

    function clickNumero() {


        resultado.value += this.value;
    }

    function clickOperacao() {
        resultado.value = removeUltimoItemOperador(resultado.value);
        resultado.value += this.value;
    }

    function resultadoOperacao() {

        let valor_campo = resultado.value;
        resultado.value = "";
        let regex = /\d+.{8}/g;


        if (valor_campo.length > 0) {

            try {
                if (eval(valor_campo).toString().match(regex)) {

                    let valor = String(eval(valor_campo));
                    let result = valor.match(regex)

                    resultado.value = result[0];
                    return
                }


                resultado.value = eval(valor_campo);
            } catch {
                resultado.value = valor_campo;
            }

        }


    }



    function ultimoItemOperador(numero) {
        let operacoes = ['+', '-', '*', '/', '.'];
        let ultimoItem = numero.split('').pop();
        return operacoes.some(function(operator) {
            return operator === ultimoItem;
        });
    }

    function removeUltimoItemOperador(numero) {
        if (ultimoItemOperador(numero)) {
            return numero.slice(0, -1);
        }
        return numero;
    }

    function reseteResultados() {
        resultado.value = "";
    }

    function deleteCaracter() {
        resultado.value = resultado.value.slice(0, -1);
    }




})()