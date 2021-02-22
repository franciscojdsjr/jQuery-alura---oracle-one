var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");


$(function(){

    atualizaTamanhoFrase();
    incializaContadores();
    inicializaCronometro();
    inicializaBordaValidadora ();
    $("#botao-reiniciar").click(reiniciaJogo);
    $(".botao-remover").click(removeLinha);
});


function atualizaTamanhoFrase() {

var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;

var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);


};

function incializaContadores() {

    var campo = $(".campo-digitacao");
campo.on("input",function() {

     var conteudo = campo.val();
     var quantidadePalavras = conteudo.split(/\S+/).length - 1;
     $("#contador-palavras").text(quantidadePalavras);

     var quantidadeCaracteres = conteudo.length;
     $("#contador-caracteres").text(quantidadeCaracteres);

});};

function inicializaCronometro() {

    

campo.one("focus",function() {

    var tempoRestante = $("#tempo-digitacao").text();
    $("#botao-reiniciar").attr("disabled",true);
    var cronometroID = setInterval(function(){
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);

        if(tempoRestante < 1) {
            clearInterval(cronometroID);
            $("#botao-reiniciar").attr("disabled", false);
            finalizaJogo();
        }
    },1000);
});};

function atualizaTempoInicial (tempo){


    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);

};



function inicializaBordaValidadora () {

        
        campo.on("input", function(){
            var frase = $(".frase").text();
            var digitado = campo.val();
            var comparavel = frase.substr(0,digitado.length);
            
            if(digitado == comparavel){

                campo.addClass("borda-verde");
                campo.removeClass("borda-vermelha");
                
            }else{
                campo.addClass("borda-vermelha");
                campo.removeClass("borda-verde");
            }


        });
};



function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Francisco Júnior"
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);

    $(".placar").slideDown(200);
    scrollPlacar();


}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event) {
    event.preventDefault();
    $(this).parent().parent().fadeOut(300);
    setTimeout(function(){

        $(this).parent().parent().remove();
    },300);
}

$("#botao-placar").click(mostraPlacar);

function mostraPlacar() {

    $(".placar").stop().slideToggle(150);



};

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("html, body").animate(
    {
        scrollTop: posicaoPlacar
    }, 300);
}

function reiniciaJogo() {

    $("#botao-reiniciar").click(function(){

        campo.attr("disabled", false);
        campo.val("");
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0");
        $("#tempo-digitacao").text(tempoInicial);
        inicializaCronometro();   
        campo.removeClass("campo-desativado");
        campo.removeClass("borda-vermelha");
        campo.removeClass("borda-verde");
});};

function finalizaJogo() {

    campo.attr("disabled", true);
    campo.addClass("campo-desativado");
    inserePlacar();
    removeLinha();
};

$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);
$("#botao-sync").click(sincronizaPlacar);

function fraseAleatoria() {

    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria).fail(function() {

        setTimeout(function(){

            $("#erro").toggle();      

        },2000);


    })
    .always(function(){

            $("#spinner").toggle();

    });
};


function buscaFrase() {

    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();
    var dados = {id: fraseId};

    $.get("http://localhost:3000/frases",dados, trocaFrase)
    .fail(function(){

        $("#erro").toggle();
        setTimeout(function(){

            $("#erro").toggle();
        }, 2000);

    })
    .always(function(){
        $("#spinner").toggle();
    });

};

function trocaFrase(data){

    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);

};

function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);

};


function sincronizaPlacar() {

        var placar = [];
        var linhas $("tbody>tr");
        linhas.each(function(){

            var usuario = $(this).find("td:nth-child(1)").text();
            var palavras = $(this).find("td:nth-child(2)").text();

            var score = {

                usuario: usuario,
                pontos: palavras,

            };  

            placar.push(score)

        });
        
        var daods = {

            placar: placar
        };

        $.post("http://localhost:3000/placar",dados, function() {

            console.log("Salvou o placar");

        });

};

