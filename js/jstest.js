var $TABLE = $('#tableA');
var $BTN = $('#export-btn');
var $EXPORT = $('#export');
var i=0;
console.log("bla");
var sumVal=0;

function somaA(){

    var table = document.getElementById("tableB");
    for(var i = 2; i < table.rows.length; i++)
    {
        sumVal = sumVal + parseInt(table.rows[i].cells[2].innerHTML);
    }
    console.log(sumVal);
    
    $('#somaA').val(sumVal);
return;
}

$('.table-add').click(function () {
i++;

var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line invisible');
//$TABLE.find('tr.hide').remove();
var htm=`<tr><td class="pt-3-half " style="width:10% !important;" contenteditable="true"><div class="input-group clockpicker">
<input type="text" class="form-control" value="13:00">
<span class="input-group-addon">
    <span class="glyphicon glyphicon-time"></span>
</span>
</div>
</td></tr>`;

//$TABLE.find('table').append(htm);
$TABLE.find("td:contains('c')").html("new");
$TABLE.find('table').append($clone);
//$clone.addClass('hide invisible');
});

$('.table-remove').click(function () {
$(this).parents('tr').detach();
});

$('.table-up').click(function () {
var $row = $(this).parents('tr');
if ($row.index() === 1) return; // Don't go above the header
$row.prev().before($row.get(0));
});

$('.table-down').click(function () {
var $row = $(this).parents('tr');
$row.next().after($row.get(0));
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.click(function () {
var $rows = $TABLE.find('tr:not(:hidden)');
var headers = [];
var data = [];

// Get the headers (add special header logic here)
$($rows.shift()).find('th:not(:empty)').each(function () {
headers.push($(this).text().toLowerCase());
});

// Turn all existing rows into a loopable array
$rows.each(function () {
var $td = $(this).find('td');
var h = {};

// Use the headers from earlier to name our hash keys
headers.forEach(function (header, i) {
h[header] = $td.eq(i).text();
});

data.push(h);
});

// Output the result
$EXPORT.text(JSON.stringify(data));
});