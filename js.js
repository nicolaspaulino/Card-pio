function loadCard()
{   
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "carda.xml", true);
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
            loadXML(this);
        }
    }

    xmlhttp.send();
}
function loadXML(produtos)
{

   var i;
   var xmlDoc = produtos.responseXML;
   var cardaXML = xmlDoc.getElementsByTagName("PRODUTO");

   for (i = 0; i < cardaXML.length; i++)
   {    
       var tipo = cardaXML[i].getElementsByTagName("TIPO")[0].childNodes[0].nodeValue;
       var descri = cardaXML[i].getElementsByTagName("DESCRI")[0].childNodes[0].nodeValue;
       var price = cardaXML[i].getElementsByTagName("PRICE")[0].childNodes[0].nodeValue;

       var quantia= document.createElement("INPUT")
       quantia.setAttribute("id","quantia" + i)
       quantia.setAttribute("type","number")
       quantia.setAttribute("min","0")

        var corpoTabela = document.getElementById("corpotable")
        let row = corpoTabela.insertRow();
        let celula0 = row.insertCell();
        let celula1 = row.insertCell();
        let celula2 = row.insertCell();
        let celula3= row.insertCell();
    
        celula0.innerHTML = tipo
        celula1.innerHTML = descri
        celula2.innerHTML = "R$:"+ price
        celula3.appendChild(quantia);

       
   }  
}
function Enviar()
{   
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "carda.xml", true);
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
            Calcular(this);
        }
    }

    xmlhttp.send();

}
function Calcular(produtos) {

    let total = 0
    var xmlDoc = produtos.responseXML;
    var cardaXML = xmlDoc.getElementsByTagName("PRODUTO")
    document.getElementById("resultado").innerHTML=""

    for (let i = 0; i < cardaXML.length; i++) {
        let qnt = parseFloat(document.getElementById("quantia" + i).value) || 0
        let descri2 = cardaXML[i].getElementsByTagName("DESCRI")[0].childNodes[0].nodeValue
        let price = parseFloat(cardaXML[i].getElementsByTagName("PRICE")[0].childNodes[0].nodeValue)
        let subtotal = qnt * price
        total += subtotal

        if (qnt > 0) {
            var corpoTabela2 = document.getElementById("resultado")
            let row = corpoTabela2.insertRow()
            let celula0 = row.insertCell()
            let celula1 = row.insertCell()
            let celula2 = row.insertCell()

            celula0.innerHTML = descri2
            celula1.innerHTML = qnt
            celula2.innerHTML = subtotal.toFixed(2);
        }
        document.getElementById("total-pedido").innerHTML ="Valor Total: R$" + total.toFixed(2)
    }
}
function cancelar()
{
    document.getElementById("resultado").innerHTML=""
    document.getElementById("total-pedido").innerHTML ="Valor Total: R$ 0.00" 

}
function finalizar() {
    let total = parseFloat(document.getElementById("total-pedido").innerHTML.replace("Valor Total: R$", ""))
    
    let confirmar = confirm("Deseja finalizar o pedido?")
    if (confirmar) {
        let mensagem = `Sua comanda é: 5\nValor total: R$ ${total.toFixed(2)}\nVá ao caixa para realizar o pagamento.`
        alert(mensagem)
    } else {
        alert("Operação cancelada.")
    }
}