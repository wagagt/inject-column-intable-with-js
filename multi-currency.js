$(document).ready(function() {
  $("#btnAddCol").one("click", function() {
    var bodyRows = $("[id^='ibtr_']");
    var mainHeadRow = $("#tINBOUND > thead > tr > th"); // NOTE: There are 2 hidden columns (th) elements
    var sellRateHeadRow = mainHeadRow.eq(4); // Getting the "Sell Rate" column TH element
    var revenueHeadRow = mainHeadRow.eq(6); // Getting the "Revenue" column TH element
    var costPerMinHeadRow = mainHeadRow.eq(8); // Getting the "Cost Per Minute" column TH element
    var marginPerMinHeadRow = mainHeadRow.eq(11); // Getting the "Margin Per Minute" column TH element

    var sellRateRowNewContent = $(
      "<th><div style='width:100px!important; height:auto;align:center;'>Sell Rate EUR</div></th>"
    ); // Create "sell rate EUR" head element to append
    var revenueRowNewContent = $(
      "<th><div style='width:100px!important; height:auto;align:center;'>Revenue EUR</div></th>"
    ); // Create "revenue EUR" element to append

    var costPerMinRowNewContent = $(
      "<th><div style='width:100px!important; height:auto;align:center;'>Cost Per <br>Minute EUR</div></th>"
    ); // Create "cost per minute EUR" element to append

    var marginPerMinRowNewContent = $(
      "<th><div style='width:100px!important; height:auto;align:center;'>Margin Per <br>Minute EUR</div></th>"
    ); // Create "margin per minute EUR" element to append

    var footerRow = $("#tINBOUND > tfoot > tr > td:first-child"); // Getting the first TD element from footer
    var footerRowToEurRevenue = $("#tINBOUND > tfoot > tr > td").eq(2); // Getting the first TD element from footer
    var revenueTotal = 0;

    sellRateHeadRow.after(sellRateRowNewContent); // Adding a new "Sell Rate EUR" <TH> element next to its left sibling
    revenueHeadRow.after(revenueRowNewContent); // Adding a new "Revenue EUR" <TH> element next to its left sibling
    costPerMinHeadRow.after(costPerMinRowNewContent); // Adding a new "Cost Per Minute EUR" <TH> element next to its left sibling
    marginPerMinHeadRow.after(marginPerMinRowNewContent); // Adding a new "Margin Per Minute EUR" <TH> element next to its left sibling

    $.each(bodyRows, function(index, value) {
      // Add "Sell Rate" EUR
      var currentSellRateTdObject = $(value)
        .find("td")
        .eq(4);
      var currentSellRateAmount = currentSellRateTdObject.text();
      var eurSellRateValueToAdd = $("<td/>", {
        text: "EUR " + convertValueToEUR(currentSellRateAmount).toFixed(5)
      });
      currentSellRateTdObject.after(eurSellRateValueToAdd);

      // Add "Revenue" EUR
      var currentRevenueTdObject = $(value)
        .find("td")
        .eq(7);
      var currentRevenueAmout = currentRevenueTdObject.text();
      var finalRevenueConverted = convertValueToEUR(
        currentRevenueAmout
      ).toFixed(2);
      var eurRevenueValueToAdd = $("<td/>", {
        text: "EUR " + formatMoney(finalRevenueConverted)
      });
      revenueTotal = revenueTotal + finalRevenueConverted;
      currentRevenueTdObject.after(eurRevenueValueToAdd);

      // Add "Cost Per Minute" EUR
      var currentCostPerMinuteTdObject = $(value)
        .find("td")
        .eq(10);
      var currentCostPerMinuteAmount = currentCostPerMinuteTdObject.text();
      var eurCostPerMinuteValueToAdd = $("<td/>", {
        text: "EUR " + convertValueToEUR(currentCostPerMinuteAmount).toFixed(5)
      });
      currentCostPerMinuteTdObject.after(eurCostPerMinuteValueToAdd);

      // Add "Margin Per Minute" EUR
      var currentMarginPerMinuteTdObject = $(value)
        .find("td")
        .eq(14);
      var currentMarginPerMinuteAmount = currentMarginPerMinuteTdObject.text();
      var eurMarginPerMinuteValueToAdd = $("<td/>", {
        text:
          "EUR " + (Math.floor(convertValueToEUR(currentMarginPerMinuteAmount) * 100) / 100).toFixed(2)
      });
      currentMarginPerMinuteTdObject.after(eurMarginPerMinuteValueToAdd);
    });

    // FIX FOOTER
    footerRow.attr("colspan", "4"); // Updating footer span to include new EUR column
    footerRowToEurRevenue.after("<td> EUR " + revenueTotal + "</td>"); // Adding footer revenue EUR total
  });

  // FUNCTIONS
  function convertValueToEUR(value) {
    var usdAmount = value.replace("USD ", "");
    usdAmount = usdAmount.replace(",", "");
    var exchangeRate = 0.91;
    var usdAmount = parseFloat(usdAmount);
    var newEURAmount = usdAmount * exchangeRate;
    return newEURAmount;
  }

  function countRows() {
    totalRows = $("[id^='ibtr_']");
    return totalRows.length;
  }

  function formatMoney(number, decPlaces, decSep, thouSep) {
    (decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces),
      (decSep = typeof decSep === "undefined" ? "." : decSep);
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(
      parseInt((number = Math.abs(Number(number) || 0).toFixed(decPlaces)))
    );
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return (
      sign +
      (j ? i.substr(0, j) + thouSep : "") +
      i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
      (decPlaces
        ? decSep +
          Math.abs(number - i)
            .toFixed(decPlaces)
            .slice(2)
        : "")
    );
  }
});
