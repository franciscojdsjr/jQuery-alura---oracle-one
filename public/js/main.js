var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;

var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);

var campo = $(".campo-digitacao");
campo.on("input",function() {

     var conteudo = campo.val();
     var quantidadePalavras = conteudo.split(/\S+/).length - 1;
     $("#contador-palavras").text(quantidadePalavras);

     var quantidadeCaracteres = conteudo.length;
     $("#contador-caracteres").text(quantidadeCaracteres);

});
campo.on("focus",function() {

    var tempoRestante = $("#tempo-digitacao").text();
    



});