var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){

    atualizaTamanhoFrase();
    incializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
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

});}

function inicializaCronometro() {

    var tempoRestante = $("#tempo-digitacao").text();

campo.one("focus",function() {

    var cronometroID = setInterval(function(){
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);

        if(tempoRestante < 1) {
            campo.attr("disabled", true);
            clearInterval(cronometroID);
        }
    },1000);
});}

function reiniciaJogo() {

    $("#botao-reiniciar").click(function(){

        campo.attr("disabled", false);
        campo.val("");
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0");
        $("#tempo-digitacao").text(tempoInicial);
        inicializaCronometro();    
});}

