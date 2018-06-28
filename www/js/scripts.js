var amigoDao = new Dao("amigos");
var contaDao = new Dao("contasInseridas");
var idAtualAmigo = 0;
var amigos;
var itens = [];
var idAtualItem = 0;
var contas;
var idAtualConta = 0;

$(document).ready(function() {
    
    $("#btnVoltarListaAmigo").click( function() {
        $("#novoAlteraAmigo").hide();
        $("#listaAmigos").show();
    });

    $("#btnSalvarAmigo").click(function () { 
        if(verificaAmigo()){
            var amigo = {};
            amigo.nome = $("#nomeAmigo").val();
            amigo.telefone = $("#telefoneAmigo").val();

            if(idAtualAmigo < 0){
                amigoDao.inserir(amigo);
            }else{
                amigoDao.alterar(idAtualAmigo, amigo);
            }
            
            listarAmigos();
            $("#listaAmigos").show();
            $("#novoAlteraAmigo").hide();
        }
        
    });

    $("#btnExcluirAmigo").click(function(){
        amigoDao.excluir(idAtualAmigo);
        listarAmigos();
        $("#listaAmigos").show();
        $("#novoAlteraAmigo").hide();
    });

    $("#btnExcluirConta").click(function(){
        contaDao.excluir(idAtualConta);
        listarContas();
        $("#listaContas").show();
        $("#resumoConta").hide();
    });

    $("#btnListaAmigos").click(function(){
        $("#home").hide();
        $("#listaAmigos").show();
    });

    $("#btnNovoAmigo").click(function () { 
        idAtualAmigo = -1;
        $("#novoAlteraAmigo").show();
        $("#listaAmigos").hide();
        $("#btnExcluirAmigo").hide();
        $("#nomeAmigo").val("");
        $("#telefoneAmigo").val("");
    });

    $("#btnHome").click(function(){
        $("#home").show();
        $("#novoAlteraAmigo").hide();
        $("#listaAmigos").hide();
        $("#listaContas").hide();
        $("#novaConta").hide();
        $("#novoItem").hide();
        $("#listaAmigosConta").hide();
        $("#resumoConta").hide();
    });

    $("#btnListaContas").click(function(){
        $("#listaContas").show();
        $("#home").hide();
    });

    $("#btnNovaConta").click(function(){
        $("#novaConta").show();
        $("#listaContas").hide();
        itens = [];
        amigosMarcados = [];
        $("#itensConsumidos").html("");
    });

    $("#btnNovoItem").click(function(){
        idAtualItem = -1;
        $("#novaConta").hide();
        $("#novoItem").show();
        $("#produto").val("");
        $("#preco").val("");
        $("#quantidade").val("");
    });

    $("#btnSalvarItem").click(function(){
        
        adicionaItem();
    });

    $("#btnExcluirItem").click(function(){
        excluirItem();
    });

    $("#btnVoltarListaItens").click(function(){
        $("#novaConta").show();
        $("#novoItem").hide();
    });

    $("#btnProximaTelaAmigos").click(function(){
        if(itens.length > 0){
            $("#listaAmigosConta").show();
            $("#novaConta").hide();
            listarAmigosCheck();
        }else{
            exibeErro("Adicione 'Itens Consumidos'");
        }
       
    });

    $("#voltarItens").click(function(){
        $("#listaAmigosConta").hide();
        $("#novaConta").show();
    });

    $("#btnProximaTelaResumo").click(function(){
        pegarAmigos();
        $("#resumoConta").show();
        $("#listaAmigosConta").hide();
        $("#btnSalvarConta").show();
        $("#btnVoltarListaAmigosMarcados").show();
        $("#btnExcluirConta").hide();
        $("#btnVoltarListaContas").hide();
        preencheConta();
    });

    $("#btnSalvarConta").click(function(){
        salvarConta();
    });

    $("#btnVoltarListaAmigosMarcados").click(function(){
        $("#resumoConta").hide();
        $("#listaAmigosConta").show();
    });

    $("#btnVoltarListaContas").click(function(){
        $("#listaContas").show();
        $("#resumoConta").hide();
    });

    listarAmigos();
    listarContas();
});

function salvarConta(){
    if(verificaConta()){
        var conta = {};
        conta.nomeConta = $("#nomeConta").val();
        conta.precofinal = $("#precoFinal").val();
        conta.precodividido = $("#precoDividido").val();
        conta.itens = itens;
        conta.amigosmarcados = amigosMarcados;

        contaDao.inserir(conta);

        listarContas();
        $("#resumoConta").hide();
        $("#home").show();
    }
    
}

function listarAmigos(){
    amigos = amigoDao.listar();

    $("#itensAmigo").html("");
    
    for(i in amigos){
        $("#itensAmigo").append("<a href='javascript:alterarAmigo("+i+")' class='list-group-item list-group-item-action listaAmigos'>"+amigos[i].nome+"</a>" );
    }
}

function listarContas(){
    contas = contaDao.listar();

    $("#itensConta").html("");

    for(i in contas){
        $("#itensConta").append("<a href='javascript:exibirConta("+i+")' class='list-group-item list-group-item-action listaAmigos'>"+contas[i].nomeConta+"</a>" );
    }
}

function listarAmigosCheck() {
    amigos = amigoDao.listar();

    $("#itensAmigoConta").html("");
    
    for(i in amigos){
        $("#itensAmigoConta").append("<li class='list-group-item listaAmigos'>"+
        "<label class='checkbox'>"+amigos[i].nome+""+
        "<input type='checkbox' id='"+i+"'>"+
        "<span class='checkmark'></span>"+
        "</label></li>" );
    }
}

function alterarAmigo(index){
    $("#nomeAmigo").val(amigos[index].nome);
    $("#telefoneAmigo").val(amigos[index].telefone);
    idAtualAmigo = index;
    $("#btnExcluirAmigo").show();
    $("#listaAmigos").hide();
    $("#novoAlteraAmigo").show();    
}

function adicionaItem(){
    if(verificaItens()){
        if(idAtualItem > -1){
            itens[idAtualItem].produto = $("#produto").val();
            itens[idAtualItem].preco = $("#preco").val();
            itens[idAtualItem].quantidade = $("#quantidade").val();
        }else{
            item = {};
            item.produto = $("#produto").val();
            item.preco = $("#preco").val();
            item.quantidade = $("#quantidade").val();
    
        itens.push(item);
        }
        
    
        $("#itensConsumidos").html("");
    
        for(i in itens){
            $("#itensConsumidos").append("<a href='javascript:alterarItem("+i+")' class='list-group-item list-group-item-action listaAmigos'>"+itens[i].produto+" - R$"+(itens[i].preco*itens[i].quantidade)+"</a>" );
        }
    
        $("#novaConta").show();
        $("#novoItem").hide();
    }
   
}

function alterarItem(index){
    $("#produto").val(itens[index].produto);
    $("#preco").val(itens[index].preco);
    $("#quantidade").val(itens[index].quantidade);
    idAtualItem = index;
    $("#btnExcluirItem").show();
    $("#novaConta").hide();
    $("#novoItem").show();
}

function excluirItem(){
    itens.splice(idAtualItem, 1);

    $("#itensConsumidos").html("");

    for(i in itens){
        $("#itensConsumidos").append("<a href='javascript:alterarItem("+i+")' class='list-group-item list-group-item-action listaAmigos'>"+itens[i].produto+" -          R$"+(itens[i].preco*itens[i].quantidade)+"</a>" );
    }

    $("#novaConta").show();
    $("#novoItem").hide();
}

function pegarAmigos(){
    amigosMarcados = [];
    for(i in amigos){
        if($("#"+i+"").is(':checked')){
            amigosMarcados.push(amigos[i]);
        }
    }
}

function preencheConta(){
    $("#nomeConta").attr("disabled", false);
    $("#nomeConta").val("");
    var qtdPessoas = 0;
    var preco = 0;
    var precodividido = 0;

    $("#itensConsumidosConta").html("");

    for(i in itens){
        $("#itensConsumidosConta").append("<li class='list-group-item listaAmigos'>"+itens[i].produto+" - R$"+(itens[i].preco*itens[i].quantidade)+"</label></li>");
        preco += itens[i].preco*itens[i].quantidade;
    }

    $("#itensAmigosContaFinal").html("");

    for(i in amigosMarcados){
        $("#itensAmigosContaFinal").append("<li class='list-group-item listaAmigos'>"+amigosMarcados[i].nome+"</label></li>");
        qtdPessoas ++;
    }

    qtdPessoas +=1;
    precodividido = preco/qtdPessoas;

    $("#precoFinal").val(preco);
    $("#precoDividido").val(precodividido);
}

function exibeErro(mensagem) {
    var x = document.getElementById("mensagem");
    x.className = "show";
    document.getElementById("mensagem").innerHTML = mensagem;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function verificaConta(){
    if($("#nomeConta").val() == undefined || $("#nomeConta").val() == null || $("#nomeConta").val() == ""){
        exibeErro("Campo 'Nome da Conta' é obrigatório");
        return false;
    }
    return true;
}

function verificaAmigo(){

    if($("#nomeAmigo").val() == undefined || $("#nomeAmigo").val() == null || $("#nomeAmigo").val() == ""){
        exibeErro("Campo 'Nome' é obrigatório");
        return false;
    }

    if($("#telefoneAmigo").val() == undefined || $("#telefoneAmigo").val() == null || $("#telefoneAmigo").val() == ""){
        exibeErro("Campo 'Telefone' é obrigatório");
        return false;
    }
    return true;
}

function verificaItens(){

    if($("#produto").val() == undefined || $("#produto").val() == null || $("#produto").val() == ""){
        exibeErro("Campo 'Produto' é obrigatório");
        return false;
    }
    
    if($("#preco").val() == undefined || $("#preco").val() == null || $("#preco").val() == ""){
        exibeErro("Campo 'Preço' é obrigatório");
        return false;
    }

    if($("#quantidade").val() == undefined || $("#quantidade").val() == null || $("#quantidade").val() == ""){
        exibeErro("Campo 'Quantidade' é obrigatório");
        return false;
    }
    return true;
}

function exibirConta(index) {
    $("#listaContas").hide();
    $("#resumoConta").show();
    $("#btnSalvarConta").hide();
    $("#btnVoltarListaAmigosMarcados").hide();
    $("#btnExcluirConta").show();
    $("#btnVoltarListaContas").show();

    $("#itensConsumidosConta").html("");

    for(i in contas[index].itens){
        $("#itensConsumidosConta").append("<li class='list-group-item listaAmigos'>"+contas[index].itens[i].produto+" - R$"+(contas[index].itens[i].preco*contas[index].itens[i].quantidade)+"</label></li>");
    }

    $("#itensAmigosContaFinal").html("");

    for(i in contas[index].amigosmarcados){
        $("#itensAmigosContaFinal").append("<li class='list-group-item listaAmigos'>"+contas[index].amigosmarcados[i].nome+"</label></li>");
    }

    idAtualConta = index;

    $("#nomeConta").val(contas[index].nomeConta);
    $("#precoFinal").val(contas[index].precofinal);
    $("#precoDividido").val(contas[index].precodividido);
    $("#nomeConta").attr("disabled", true);
}

