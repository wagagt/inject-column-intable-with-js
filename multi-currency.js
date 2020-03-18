$(document).ready(function() {
  $("#btnAddCol").click(function() {
    var totalRows = countRows();
    var bodyRows = $("[id^='ibtr_']");
    var headRow = $("#tINBOUND > thead > tr");

    // Insert column -> "Sell Rate" ( en posicion 5 -> en base a los valores de la columna 4 ) NOTA: hay 1 columna escondida [0]
    var cellHead = headRow[0].insertCell(5);
    cellHead.innerHTML = "Sell Rate EUR";
    for (index = 0; index < bodyRows.length; index++) {
      var cell = bodyRows[index].insertCell(5);
      var newValue = bodyRows.find("td:eq(4)").html(); // debe tomar el valor de la celda al lado izq.!
      cell.innerHTML = "EUR " + convertValueToEUR(newValue).toFixed(5);
    }

    // Insert column -> "Revenue"
    // var cellHead = headRow[0].insertCell(7);
    // cellHead.innerHTML = "Revenue EUR";
    // for (index = 0; index < bodyRows.length; index++) {
    //   var cell = bodyRows[index].insertCell(7);
    //   var newValue = bodyRows.find("td:eq(6)").html();
    //   cell.innerHTML = "EUR " + convertValueToEUR(newValue);
    // }
  });

  function convertValueToEUR(newValue) {
    EUR = newValue.replace("USD ", "");
    return EUR * 0.91;
  }

  function countRows() {
    totalRows = $("[id^='ibtr_']");
    return totalRows.length;
  }
});
