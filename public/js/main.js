var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){

    atualizaTamanhoFrase();
    incializaContadores();
    inicializaCronometro();
    inicializaBordaValidadora ();
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

});};

function inicializaCronometro() {

    var tempoRestante = $("#tempo-digitacao").text();

campo.one("focus",function() {

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



function inicializaBordaValidadora () {

        var frase = $(".frase").text();
        campo.on("input", function(){
            var digitado = campo.val();
            var comparavel = frase.substr(0 , digitado.length);
            
            if(digitado == comparavel){

                campo.addClass("borda-verde");
                campo.removeClass("borda-vermelha");
                
            }else{
                campo.addClass("borda-vermelha");
                campo.removeClass("borda-verde");
            }


        });
};



function inserePlacar(){

    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Francisco";
    var numeroPalavras = $("#contador-palavras").text();

    var linha = novalinha(usuario,numeroPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);



};


function novalinha(usuario,palavras){

    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;


};


function removeLinha() {
$(".botao-remover").click(function(event){

    event.preventDefault();
    $(this).parent().parent().remove();

});};


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
};
