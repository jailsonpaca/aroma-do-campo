var cdiv = 't1',
    cid = 'l1',
    option = 3,
    oop;
var mysql = require('mysql');

function handleChange(checkbox) {



    if ($('#y5').on(':checked')) {
        color = checkbox.value;

        return;
    }
    if ($('#y4').is(':checked')) {
        color = checkbox.value;

        return;
    }
    if ($('#y3').is(':checked')) {
        color = checkbox.value;

        return;
    }
    if ($('#y2').is(':checked')) {
        color = checkbox.value;

        return;
    }
    if ($('#y1').is(':checked')) {
        color = checkbox.value;

        return;
    }

}




$("#search_form").on('submit',function(e) {
    //console.log("call");
    search(1);
    //e.preventDefault();
    //$("#search_cli").click();
    return false;
});

function searchDay() {

    $("#TableDataAtendimento tr").remove();
    $("#TableDataAtendimento2 tr").remove();

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sanduba',
        dateStrings: true,
        multipleStatements: true,
        database: 'aroma'
    });
    connection.connect();
    var v = $('#daySet').val();
    var a = moment(v).format('YYYY-MM-DD');
    a = moment(a, 'YYYY-MM-DD').add(1, 'days');
    a = moment(a).format('YYYY-MM-DD');

    a = a + " 03:00:00";
    v = v + " 13:00:00";


    var sql = `SELECT*FROM atendimento WHERE atendimento.data BETWEEN ? AND ?`;
    var values = [v, a];
    connection.query(sql, values, function(error, results) {
        if (error) console.log(error.code);
        else {

            var len = results.length,r=0,a=0,i;


            for (i = 0; i < len; i++) {
                if (results[i].responsavel == 'Andreia') {
                    $("#TableDataAtendimento").append(`<tr style="background-color:` + results[i].cor + `;"><td class="invisible" style='display: none; !important;'>` + results[i].id + `<td class="invisible" style='display: none; !important;'>` + results[i].num + `</td><td style="display: inline-flex;"><button  type="button" class="btn btn-info btn-ati btnSaveAt"  onclick="saveAt(` + (a + 1) + `,1);" disabled><div class="textSaveAt">SV</div></button><button id="btnColor" type="button" class="btn btn-info  btnSaveAt2" onclick="colorAt(` + (a + 1) + `,1);"><div class="textColor">cor</div></button></td>` +
                        `<td ><input class="form-control transparent-input " type="time" value="` + results[i].horario + `" id="horarioi"/>` +
                        `</td><td  id="nome"><input class="form-control transparent-input" type="text" onkeypress="this.style.width = ((this.value.length + 1) * 8) + 'px';" value="` + results[i].nome + `" id="nomee"></td><td  ><input class="form-control transparent-input" value="` + results[i].valor + `" id="valori"></td><td ><input class="form-control transparent-input"  id="procei" value="` + results[i].procedimento + `">` + `</td><td><button type="button" class="btn btn-danger btn-exc" onclick="remove(` + results[i].id + `,20);">Excluir</button><span style="display:inline-block; width: 10px;"></span></td></tr>`);
                a++;
                    }
                if (results[i].responsavel == 'Ronaldo') {
                    $("#TableDataAtendimento2").append(`<tr style="background-color:` + results[i].cor + `;"><td class="invisible" style='display: none; !important;'>` + results[i].id + `<td class="invisible" style='display: none; !important;'>` + results[i].num + `</td><td style="display: inline-flex;"><button  type="button" class="btn btn-info btn-ati btnSaveAt"  onclick="saveAt(` + (r + 1) + `,2);" disabled><div class="textSaveAt">SV</div></button><button id="btnColor" type="button" class="btn btn-info  btnSaveAt2" onclick="colorAt(` + (r + 1) + `,2);"><div class="textColor">cor</div></button></td>` +
                        `<td ><input class="form-control transparent-input" type="time" value="` + results[i].horario + `" id="horarioi"/>` +
                        `</td><td id="nome"><input class="form-control transparent-input" type="text" onkeypress="this.style.width = ((this.value.length + 1) * 8) + 'px';" value="` + results[i].nome + `" id="nomee"/></td><td ><input class="form-control transparent-input" value="` + results[i].valor + `" id="valori"/></td><td ><input class="form-control transparent-input"  id="procei" value="` + results[i].procedimento + `">` + `</td><td><button type="button" class="btn btn-danger btn-exc" onclick="remove(` + results[i].id + `,21);">Excluir</button><span style="display:inline-block; width: 10px;"></span></td></tr>`);
                r++;
                    }

            }
            $("#TableDataAtendimento").append("<tr id='soma'><td class='invisible' style='display: none; !important;'></td><td class='invisible' style='display: none;'></td><td></td><td></td><td >Soma do dia:</td><td id='somatd'>R$ " + soma(1) + "</td><td></td><td></td></tr>");
            $("#TableDataAtendimento2").append("<tr id='soma'><td class='invisible' style='display: none; !important;'></td><td class='invisible' style='display: none; !important;'></td><td></td><td></td><td>Soma do dia:</td><td id='somatd'>R$ " + soma(2) + "</td><td><td></td></td></tr>");

        }
    });
    connection.end();
    return;
}

function refresh() {
    //console.log(cdiv);
    if (cdiv != 't5') {
        console.log(cdiv);
        inseret(cdiv, cid, 1);

    } else {

        inseret('t3', 'l3', 1);
    }
    window.location.reload(false);

    return;
}

function cleantable(op) {

    switch (op) {
        case 1:

            //$("#TableData1 tr").remove();
            $("#TableData1 tr").empty();


            break;


    }


    return false;
}


function search(op) {
    cleantable(op);
    console.log("LLL");
    switch (op) {
        case 1:

            var v1 = $('#search1').val();
            v1 = String(v1);
            if (v1 == "444") {
                console.log("pass");
                ocult = 0;
            }
            var sql;
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'sanduba',
                dateStrings: true,
                multipleStatements: true,
                database: 'aroma'


            });

            connection.connect();

            sql = 'SELECT nome,numero,data,id FROM `cliente` WHERE CONCAT(cliente.`nome`) LIKE ? AND CONCAT(cliente.`state_cadastro`)=1';
            var s = '%';

            s = s.concat(v1, '%');
            console.log(s);
            connection.query(sql, [s], function(error, results, fields) { //NUMERO DE INDICAÇÃO INDICACAO
                if (error) console.log(error.code);
                else {
                    console.log(results);
                    //console.log('len: '+ results.length);

                    var len = results.length,
                        i;

                    for (i = 0; i < len; i++) {
                        $("#TableData1").append(`<tr><td class="clientename">` + results[i].nome + `</td><td>` +
                            results[i].numero + `</td><td>` + results[i].data +
                            `</td><td><span style="display:inline-block; width: 10px;"></span>` +
                            `<button type="button" class="btn btn-danger" onclick="remove(` + results[i].id + `,6);">Excluir</button>` +
                            `<span style="display:inline-block; width: 10px;"></span></td><td><span style="display:inline-block; width: 10px;"></span>` +
                            `<button type="button" class="btn btn-success" onclick="ficha(` + results[i].id + `,1);">Ver ficha</button></td><tr>`);
                    }
                }
            });
            connection.end();


            break;
    }



    return false;
}


function bc(op) {

    if (op == 1) {
        console.log("ba");

        $('.sidebar').css('background-color', '#492923');
    } else {

        $('.sidebar').css('background-color', '#2A724A');


    }


    return;
}


function inseret(sa, ca, op) {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sanduba',
        dateStrings: true,
        multipleStatements: true,
        database: 'aroma'


    });

    sql = `UPDATE showt SET sidb=?,cidb=?,state=? WHERE CONCAT(showt.id) = 1`;

    connection.connect();
    connection.query(sql, [sa, ca, op], function(err, results, fields) {
        if (err) throw err;
        else {
            //console.log(" state:"+op+" sa: "+sa+" ca: "+ca);
            //console.log("TET:"+sa+" e "+ca);

        }
    });
    connection.end();


}

function stwo() {
    //console.log("inserindo|SHOWTWO:"+cdiv+" e "+cid);
    if (cdiv != 't5') {
        inseret(cdiv, cid, 1);
    }
    window.location.reload(false);
    //$( ".col-9" ).load(window.location.href + ".col-9" );
    //show(sa,ca);


}

function tev(shown, sid) {
    var sql, sa = shown,
        ca = sid,
        state = 0;
    document.getElementById(cid).className = " s1";
    switch (sa) {
        case 't1':

            document.getElementById("l1").className = " active s1";


            break;

        case 't2':

            document.getElementById("l2").className = " active s1";

            break;
        case 't3':

            document.getElementById("l3").className = " active s1";

            break;
        case 't4':

            document.getElementById("l4").className = " active s1";

            break;
        case 't5':

            document.getElementById("l5").className = " active s1";

            break;
        case 't6':

            document.getElementById("l6").className = " active s1";

            break;
        case 't7':

            document.getElementById("l7").className = " active s1";

            break;



    }

    if (document.getElementById(sa)) { document.getElementById(sa).style.display = 'block'; }

    if (sa != cdiv) {
        document.getElementById(cdiv).style.display = 'none';
    }


    cdiv = sa;
    cid = ca;
    //inseret(sa,ca,0,'show');
    //console.log("inserindo:"+cdiv+" e "+cid);
    //your code to be executed after 1 second




}

function show(shown, sid) {
    var sql, sa, ca, state = 0;

    //console.log("OPCAO 1");
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sanduba',
        dateStrings: true,
        multipleStatements: true,
        database: 'aroma'


    });


    sql = `SELECT sidb,cidb,state FROM showt WHERE CONCAT(showt.id) = 1`;

    connection.connect();
    connection.query(sql, function(err, results, fields) {
        if (err) throw err;
        else {
            state = results[0].state;
            //   console.log("state: "+state);
            if (results[0].state == 1) {



                sa = results[0].sidb;
                ca = results[0].cidb;
                tev(sa, ca);
                inseret(sa, ca, 0);
            } else {

                tev(shown, sid);

                inseret(shown, sid, 0);
            }
            //console.log("sa: "+sa+" ca: "+ca);
        }
    });
    connection.end();
    //inseret(sa,ca,0);
    //inseret(sa,ca,0);







    return false;
}