$(document).ready(function() {
  $("#btnAddCol").one('click', function() {
    var bodyRows = $("[id^='ibtr_']");
    var mainHeadRow = $("#tINBOUND > thead > tr > th"); // NOTE: There are 2 hidden columns (th) elements
    var sellRateHeadRow = mainHeadRow.eq(4); // Getting the sell rate column TH element
    var revenueHeadRow = mainHeadRow.eq(6); // Getting the revenue column TH element
    var sellRateRowNewContent = $("<th><div style='width:100px!important; height:auto;'>Sell Rate EUR</div></th>"); // Create sell rate EUR head element to append
    var revenueRowNewContent = $("<th><div style='width:100px!important; height:auto;'>Revenue EUR</div></th>"); // Create revenue EUR element to append
    var footerRow = $('#tINBOUND > tfoot > tr > td:first-child'); // Getting the first TD element from footer
    var footerRowToEurRevenue = $('#tINBOUND > tfoot > tr > td').eq(2); // Getting the first TD element from footer
    var revenueTotal = 0;

    sellRateHeadRow.after(sellRateRowNewContent); // Adding a new sell rate EUR <TH> element next to its left sibling
    revenueHeadRow.after(revenueRowNewContent); // Adding a new revenue EUR <TH> element next to its left sibling

    $.each(bodyRows, function(index, value){
      var currentSellRateTdObject = $(value).find('td').eq(4);
      var currentSellRateAmout = currentSellRateTdObject.text();
      var eurSellRateValueToAdd = $("<td/>", {
        text: "EUR " + convertValueToEUR(currentSellRateAmout).toFixed(5),
      });

      currentSellRateTdObject.after(eurSellRateValueToAdd);

      var currentRevenueTdObject = $(value).find('td').eq(7);
      var currentRevenueAmout = currentRevenueTdObject.text();
      var finalRevenueConverted = convertValueToEUR(currentRevenueAmout);
      var eurRevenueValueToAdd = $("<td/>", {
        text: "EUR " + finalRevenueConverted,
      });
      revenueTotal = revenueTotal + finalRevenueConverted;

      currentRevenueTdObject.after(eurRevenueValueToAdd);
    });

    footerRow.attr('colspan', '4'); // Updating footer span to include new EUR column
    footerRowToEurRevenue.after('<td> EUR '+ revenueTotal +'</td>'); // Adding footer revenue EUR total
  });

  function convertValueToEUR(newValue) {
    EUR = newValue.replace("USD ", "");
    return parseFloat(EUR) * 0.91;
  }

  function countRows() {
    totalRows = $("[id^='ibtr_']");
    return totalRows.length;
  }
});
