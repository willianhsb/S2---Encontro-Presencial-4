
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('endereco').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('estado').value=("");
    document.getElementById('ibge').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('endereco').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('estado').value=(conteudo.uf);
    document.getElementById('ibge').value=(conteudo.ibge);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisa_cep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('endereco').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('estado').value="...";
        document.getElementById('ibge').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};

function validarNome(){
    try {
        let nome = document.getElementById('nome').value;
        let re = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/;
    if (!re.test(nome)) {
        //se o campo for invalido, retorna falso p/ o formulario não ser enviado
        alert("Nome Inválido!");
        document.form.nome.focus();
        return false;
    } 
        return true;

        } catch (error) {
            console.error(error);
            return false;
        }

}

function validarCPF(){
     cpf = document.getElementById("cpf").value;

    if(typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if(!cpf || 
        cpf.length != 11 ||
            cpf == "00000000000" ||
                cpf == "11111111111" ||
                cpf == "22222222222" ||
                cpf == "33333333333" ||
                cpf == "44444444444" ||
                cpf == "55555555555" ||
                cpf == "66666666666" ||
                cpf == "77777777777" ||
                cpf == "88888888888" ||
                cpf == "99999999999" 
       )
{
    return false;
}

var soma = 0;
var resto

for (var i = 1; i <= 9; i++)
    soma = soma + parseInt(cpf.substring(i-1, i)) * (11-i);
    resto = (soma * 10) % 11;
 if ((resto == 10) || (resto == 11)) resto = 0;
 if (resto != parseInt(cpf.substring(9,10))) return false;
    soma=0;

    for (var i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12-i);
        resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(10,11))) return false;

 return true;
    
}   
    

function confereCPF(){
    const valido = validarCPF();
    if(!valido){
        alert("CPF Inválido!");
        document.form.cpf.focus();
    }
    return valido;
}

function gerar_json(form){
    var nome = form.nome.value;
    var cpf = form.cpf.value;
    var telefone_res  = form.telefone_res.value;
    var telefone_cel = form.telefone_cel.value;
    var cep = form.cep.value;
    var endereco = form.endereco.value;
    var numero = form.numero.value;
    var bairro = form.bairro.value;
    var cidade = form.cidade.value;
    var estado = form.estado.value;
    var ibge = form.ibge.value;

    var dados= {nome, cpf, telefone_res, telefone_cel, cep, endereco, numero, bairro, cidade, estado, ibge};


    var formularioValido = validarNome() && confereCPF() && telefone_validation();
    if( formularioValido){
        document.write("<h2> Retorno em JSON </h2>");
        document.write(JSON.stringify(dados, null, '<br>'));
    }else{
        alert("Preencha todos os campos de forma correta! Verificar celular se inicia com o digito '9'");
        document.form.focus();
    }   

}

function telefone_validation() {
    telefone = document.getElementById("telefone_res" ).value;
    celular = document.getElementById("telefone_cel").value;
    //retira todos os caracteres menos os numeros
    telefone = telefone.replace(/\D/g, '');
    celular = celular.replace(/\D/g, '');

    //verifica se tem a qtde de numero correto
    if (!(telefone.length >= 10 && telefone.length <= 11)) return false;
    if(!(celular.length >= 10 && celular.length <= 11)) return false;

    //Se tiver 11 caracteres, verificar se começa com 9 o celular
    if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;
    if (celular.length == 11 && parseInt(celular.substring(2, 3)) != 9) return false;
        
    //verifica se não é nenhum numero digitado errado (propositalmente)
    for (var n = 0; n < 10; n++) {
        //um for de 0 a 9.
        //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
        //caractere a ser repetido
        if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) return false;
        if (celular == new Array(11).join(n) || celular == new Array(12).join(n)) return false;
        
    }
    //DDDs validos
    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];
    //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
    if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;
    if (codigosDDD.indexOf(parseInt(celular.substring(0, 2))) == -1) return false;

    
    if (new Date().getFullYear() < 2017) return true;
    if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;
        alert("telefone válido")
    if (celular.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(celular.substring(2, 3))) == -1) return false;
        alert("celular válido")
    //se passar por todas as validações acima, então está tudo certo
    return true;
}


//mascaras
$(function(){
    $(".cpf_mask").mask('999.999.999-99');
    $(".tel_res_mask").mask('(99)9999-9999');
    $(".tel_cel_mask").mask('(99)99999-9999');
    $(".cep_mask").mask('99999-999');


});

$(document).ready(function(){

    $("#telefone_res").blur(function(){
        var res = /^\([1-9]{2}\)[2-4]{1}[0-9]{3}\-[0-9]{4}$/;

        if(!res.test($("#telefone_res").val())){
            if($("#telefone_res").val() == ''){
                alert("O telefone residencial é obrigatório. Digite o número de telefone residencial válido para prosseguir!");
            }else{
                alert("Telefone Residencial Inválido, insira um número válido para prosseguir!");                
            }
        }else{
            $("#telefone_cel").prop('disabled', false) //se id telefone_cel estiver desabilitado, ele será habilitado.
        }
    })

    $("#telefone_cel").blur(function(){
        var cel = /^\([1-9]{2}\)9[7-9]{1}[0-9]{3}\-[0-9]{4}$/;

        if(!cel.test($("#telefone_cel").val())){
            if($("#telefone_cel").val() == ''){
                alert("O telefone celular é obrigatório. Digite o número de celular válido para prosseguir!");
            }else{
                alert("Telefone Inválido, insira um número válido para prosseguir!");
            }
        }else{
            $("#cep").prop('disabled', false) //se cep estiver desabilitado, ele será habilitado.
        }
    })    

})

