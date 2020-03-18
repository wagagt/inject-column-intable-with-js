$(document).ready(function() {
  $("#btnAdd").click(function() {
    var count = 3,
      first_row = $("#Row2");
    while (count-- > 0) first_row.clone().appendTo("#blacklistgrid");
  });

  $("#btnAddCol").click(function() {

    $("#blacklistgrid tr").each(function() {
      $(this).append("<td>test</td>");
    // alert("addcolumn");
  });
});

// id = "tINBOUND"  //5+1
// id = "tOUTBOUND"

    var root = document.getElementById('tINBOUND').getElementsByTagName('thead')[0];
    var header = root.rows[0];

    var totalRowCount = $("#tINBOUND tr").length;



    <script language="javascript" type="text/javascript">
        function insertColumn(position) {
        //Find the tr by class name: alt
        var row = document.getElementsByClassName("alt");
        for (index = 0; index < row.length; index++) {
          var cell = row[index].insertCell(position);
        cell.innerHTML = "New Column";
      }

      //Find the tr by class name: alt2. I would suggest you to use same class for the TR, where we are adding a new column
      var row = document.getElementsByClassName("alt2");
        for (index = 0; index < row.length; index++) {
          var cell = row[index].insertCell(position);
        cell.innerHTML = "New Column";
      }
    }
    </script>