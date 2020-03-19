$(document).ready(function() {
  $("#btnAddCol").click(function() {
    var totalRows = countRows();
    var bodyRows = $("[id^='ibtr_']");
    var headRow = $("#tINBOUND > thead > tr > th").eq(4); // NOTE: There are 2 hidden columns (th) elements
    var headRowNewContent = $("<th><div style='width:100px!important; height:auto;'>Sell Rate EUR</div></th>"); // Create new head element to append
    var $footerRow = $('#tINBOUND > tfoot > tr > td:first-child'); // Getting the first TD element from footer

    headRow.after(headRowNewContent); // Adding a new <TH> element next to its left sibling

    $.each(bodyRows, function(index, value){
      var $currentTdObject = $(value).find('td').eq(4);
      var currentAmout = $currentTdObject.text();
      var $eurValueToAdd = $("<td/>", {
        text: "EUR " + convertValueToEUR(currentAmout).toFixed(5),
      });

      $currentTdObject.after($eurValueToAdd);
    });

    $footerRow.attr('colspan', '4'); // Updating footer span to include new EUR column
    
    // for (index = 0; index < bodyRows.length; index++) {
    //   var cell = bodyRows[index].insertCell(5);
    //   var newValue = bodyRows.find("td:eq(4)").html(); // debe tomar el valor de la celda al lado izq.!
    //   cell.innerHTML = "EUR " + convertValueToEUR(newValue).toFixed(5);
    // }

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
