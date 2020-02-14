var swal = require('sweetalert2');
var mysql = require('mysql');
var load = 0;
var t1 = 0;
var t2 = 0;
var color = "#ACABB1";

window.onerror = function() {
    return true;
}
$(window).error(function(e) {
    e.preventDefault();
}); // IGNORE ALL ERROR JQUERY!

function error_alert(pa) {

    swal.fire({
        position: 'top-end',
        type: 'error',
        title: 'Algo deu errado' + pa,
        showConfirmButton: false,
        timer: 2500
    })

    const log = require('electron-log');
    log.transports.file.level = 'warn';
    log.transports.file.file = `${process.resourcesPath}\\logs\\log.log`;

log.warn(`Algo deu errado ${pa}`);
//console.log(`${process.resourcesPath.replace(/\\/g, "/")}/logs/project.log`);

    //var x10 = new Date();
   // x10 = moment(x10).format("YYYY-MM-D HH:mm:ss");
   // swal(`${process.resourcesPath}/logs/project.log`);       
  // var filename = `${process.resourcesPath.replace(/\\/g, "/")}/logs/project.log`;
//console.log('opening log file: ', filename);

//var log = require('simple-node-logger').createSimpleFileLogger( filename );

   
   /*swal(`${process.resourcesPath.replace(/\\/g, "/")}/logs/project.log`);
    const log = require('simple-node-logger').createSimpleLogger(`${process.resourcesPath.replace(/\\/g, "/")}/logs/project ${x10}.log`);
    log.setLevel('warn');
    */
  //  log.warn(`Algo deu errado ${pa}`);

}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgb2hex(a) {
    var c = a.split("(")[1].split(")")[0];
    c = c.split(",");
    //console.log(c);

    return "#" + componentToHex(parseInt(c[0])) + componentToHex(parseInt(c[1])) + componentToHex(parseInt(c[2]));

}

function colorAt(id, table) {



    if (table == 1) {
        console.log(id + color);

        $('#tablet').find('tr').eq(id).css('background-color', color);
        $('#tablet').find('tr').eq(id).find(".btnSaveAt").prop("disabled", false);

    }
    if (table == 2) {
        $('#tablet2').find('tr').eq(id).css('background-color', color);
        $('#tablet2').find('tr').eq(id).find(".btnSaveAt").prop("disabled", false);
    }

    document.getElementById("y1").checked = false;
    document.getElementById("y2").checked = false;
    document.getElementById("y3").checked = false;
    document.getElementById("y4").checked = false;
    document.getElementById("y5").checked = false;
    color = "#ACABB1";

}



function clean_tr(tr) {

    $('#tablet').find('tr').eq(tr + 1).find('td').eq(3).find('input').val('');
    $('#tablet').find('tr').eq(tr + 1).find('td').eq(4).find('input').val('');
    $('#tablet').find('tr').eq(tr + 1).find('td').eq(5).find('input').val('');
}

function soma(table) {
    var somav = 0,
        somav2 = 0;
    while (!$(document).ready()) {
        console.log(12);
    }
    if (table == 1) {
        $("#tablet > tbody > tr:not('#soma') td").find('#valori').each(function() {

            somav += parseInt($(this).val());

        });

        $("#tablet tr:last").find('#somatd').html('R$ ' + somav);
        $("#tablet2 > tbody > tr:not('#soma')").find('#valori').each(function() {

            somav2 += parseInt($(this).val());

        });
        $("#somaDia").text((somav + somav2).toFixed(2));
    }
    if (table == 2) {
        $("#tablet2 > tbody > tr:not('#soma')").find('#valori').each(function() {

            somav += parseInt($(this).val());

        });

        $("#tablet2 tr:last").find('#somatd').html('R$ ' + somav);
        $("#tablet > tbody > tr:not('#soma') td").find('#valori').each(function() {

            somav2 += parseInt($(this).val());

        });
        $("#somaDia").text((somav + somav2).toFixed(2));
    }

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sanduba',
        dateStrings: true,
        multipleStatements: true,
        database: 'aroma'


    });
    connection.connect();

    var sql = `SELECT SUM(valor) as soma_semana FROM atendimento WHERE data BETWEEN CONCAT((SELECT SUBDATE(?, weekday(?))),' 13:00:00') AND ?`;
    var day = moment($('#daySet').val(), 'YYYY/MM/DD');
    //console.log($('#daySet').val());
    day = moment(day, 'YYYY-MM-DD').add(1, 'days');
   // console.log(day);
    day = moment(day).format('YYYY-MM-DD');
<<<<<<< HEAD
    console.log(day);
    day = day + " 03:00:00";
    
=======
    
    day = day + " 03:00:00";
>>>>>>> 48546134e843d49fe9b38974c7aa6ea3849ecb6e
    console.log(day);

    connection.query(sql, [day, day, day], function(error, results) {
        if (error) { console.log(error.code); error_alert(" ao somar semana") } else {
            if (results[0].soma_semana) {
                console.log(results[0].soma_semana);

                if (ocult == 0) {
                    $('#somaSemana').text((results[0].soma_semana).toFixed(2));
                } else {
                    $('#somaSemana').text("###");
                }
            }
        }
    });

    sql = `SELECT SUM(valor) as soma_mes FROM atendimento WHERE (MONTH(data) = ?) AND (data BETWEEN CONCAT(YEAR(data),'-',MONTH(data),'-','01',' 13:00:00') AND ?)`;

    var month = 1 + moment($('#daySet').val(), 'YYYY/MM/DD').month();
    day = moment($('#daySet').val(), 'YYYY/MM/DD');
    day = moment(day, 'YYYY-MM-DD').add(1, 'days');
    day = moment(day).format('YYYY-MM-DD');
    day = day + " 03:00:00";
    if (month) {

        connection.query(sql, [month, day], function(error, results) {
            if (error){ console.log(error.code); error_alert(" ao somar mes");}
            else {
                if (results[0].soma_mes) {
                    if (ocult == 0) {
                        $('#somaMes').text((results[0].soma_mes).toFixed(2));
                    } else {
                        $('#somaMes').text("###");
                    }
                }
            }
        });
        sql = `SELECT COUNT(valor) as atendimento_dia FROM atendimento WHERE atendimento.data BETWEEN ? AND ?`;

        day = moment($('#daySet').val(), 'YYYY/MM/DD');
        day = moment(day).format('YYYY-MM-DD');
        day = day + " 13:00:00";
        var a = moment(day).format('YYYY-MM-DD');
        a = moment(a, 'YYYY-MM-DD').add(1, 'days');
        a = moment(a).format('YYYY-MM-DD');
        a = a + " 03:00:00";
        var values = [day, a];
        // console.log(day +a); 
        connection.query(sql, values, function(error, results) {
            if (error){ console.log(error.code); error_alert(" ao contar atendimentos do dia")}
            else { $('#atendimentoDia').text(results[0].atendimento_dia); }
        });
        sql = `SELECT COUNT(valor) as atendimento_semana FROM atendimento WHERE data BETWEEN CONCAT((SELECT CONCAT(DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY),' 13:00:00'))) AND ?`;
        day = moment($('#daySet').val(), 'YYYY/MM/DD');
        day = moment(day, 'YYYY-MM-DD').add(1, 'days');
        day = moment(day).format('YYYY-MM-DD');
        day = day + " 03:00:00";
        //console.log(day);     
        connection.query(sql, [day], function(error, results) {
            if (error){ console.log(error.code); error_alert(" ao contar atendimentos da semana")}
            else { $('#atendimentoSemana').text(results[0].atendimento_semana); }
        });
        sql = `SELECT COUNT(valor) as atendimento_mes FROM atendimento WHERE (MONTH(data) = ?) AND (data BETWEEN CONCAT(YEAR(data),'-',MONTH(data),'-','01',' 13:00:00') AND ?)`;
        month = 1 + moment($('#daySet').val(), 'YYYY/MM/DD').month();
        day = moment($('#daySet').val(), 'YYYY/MM/DD');
        day = moment(day, 'YYYY-MM-DD').add(1, 'days');
        day = moment(day).format('YYYY-MM-DD');
        day = day + " 03:00:00";

        connection.query(sql, [month, day], function(error, results) {
            if (error){ console.log(error.code); error_alert(" ao contar atendimentos do mes")}
            else { $('#atendimentoMes').text(results[0].atendimento_mes); }
        });
    }
    connection.end();

    return (somav);
}

function clica() {
    $('.btnSaveAt').each(function() {

        if (!$(this).is(':disabled')) {


            $(this).trigger('click');

        }

    });
    stwo();

}

<<<<<<< HEAD
console.log(moment(data_atendimento).format("YYYY-MM-D HH:mm:ss").hour()); 
=======

>>>>>>> 48546134e843d49fe9b38974c7aa6ea3849ecb6e

function write(num, id, nome, horario, responsavel, valor, procedimento, cor) {
    console.log("write");

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sanduba',
        dateStrings: true,
        multipleStatements: true,
        database: 'aroma'


    });
    connection.connect();
    var ve = 1;

    if (id != -1) {


        var sql = `INSERT INTO atendimento(num,id,nome,horario,responsavel,valor,data,procedimento,cor) VALUES(?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE    
  num=?, nome=?,horario=?,responsavel=?,valor=?,data=?,procedimento=?,cor=?`;
<<<<<<< HEAD
        
        var data_atendimento = $('#daySet').val() + ` ${horario}:00`;
        data_atendimento = moment(data_atendimento).format("YYYY-MM-D HH:mm:ss");
        console.log(data_atendimento);
        if(parseInt(moment(data_atendimento).format("HH"),10)>=0 && parseInt(moment(data_atendimento).format("HH"),10)<5){
            data_atendimento=moment(data_atendimento).add(1,'days').format('YYYY-MM-DD HH:mm:ss');
        };
        console.log(data_atendimento);
=======
        var data_atendimento = $('#daySet').val() + ` ${horario}:00`;
        data_atendimento = moment(data_atendimento).format("YYYY-MM-D HH:mm:ss");
>>>>>>> 48546134e843d49fe9b38974c7aa6ea3849ecb6e
        connection.query(sql, [num, id, nome, horario, responsavel, valor, data_atendimento, procedimento, cor, num, nome, horario, responsavel, valor, data_atendimento, procedimento, cor], function(error) {
            if (error) {
                console.log(error.code);
                error_alert(' ao inserir atendimento');
            } else {}
        });

        /*
        sql = `UPDATE ficha_cliente SET descricao=CONCAT(descricao," MODIFICADO","
Atendimento realizado no dia e horario: ",(SELECT DATE(data) 
   FROM atendimento WHERE id=? ORDER BY id DESC LIMIT 1)," ",(SELECT horario FROM atendimento WHERE id=? ORDER BY id DESC LIMIT 1),
   " no valor R$ ",(SELECT valor FROM atendimento WHERE id=? ORDER BY id DESC LIMIT 1),
   " por ",(SELECT responsavel FROM atendimento WHERE id=? ORDER BY id DESC LIMIT 1)) WHERE ficha_a=?`;

        connection.query(sql, [id, id, id, id, num], function(err) {
            if (err) { throw err; } else {}
        });
*/


    } else {
        console.log("as");
        var sql = `INSERT INTO atendimento(num,nome,horario,responsavel,valor,data,procedimento,cor) VALUES(?,?,?,?,?,?,?,?)`;
        var data_atendimento = $('#daySet').val() + ` ${horario}:00`;
<<<<<<< HEAD
        console.log(data_atendimento);
        if(parseInt(moment(data_atendimento).format("HH"),10)>=0 && parseInt(moment(data_atendimento).format("HH"),10)<5){
            data_atendimento=moment(data_atendimento).add(1,'days').format('YYYY-MM-DD HH:mm:ss');
        };
        console.log(data_atendimento);
=======
>>>>>>> 48546134e843d49fe9b38974c7aa6ea3849ecb6e
        connection.query(sql, [num, nome, horario, responsavel, valor, data_atendimento, procedimento, cor], async function(error) {
            if (error) {
                error_alert(' ao inserir atendimento');
                console.log(error.code);
                ve = 0;
            } else {}
        });

        /*
                sql = `INSERT INTO ficha_cliente(descricao,ficha_a,id_cliente) 
             VALUES(CONCAT("Atendimento realizado no dia e horario: ",(SELECT DATE(data) 
             FROM atendimento WHERE num=? ORDER BY id DESC LIMIT 1)," ",(SELECT horario FROM atendimento WHERE num=? ORDER BY id DESC LIMIT 1),
             " no valor R$ ",(SELECT valor FROM atendimento WHERE num=? ORDER BY id DESC LIMIT 1),
             " por ",(SELECT data FROM atendimento WHERE num=? ORDER BY id DESC LIMIT 1)),?,?)
              ON DUPLICATE KEY UPDATE descricao=CONCAT("Atendimento realizado no dia e horario: ",
              (SELECT DATE(data) FROM atendimento WHERE num=? ORDER BY id DESC LIMIT 1)," ",
              (SELECT horario FROM atendimento WHERE num=? ORDER BY id DESC LIMIT 1)," no valor R$ ",
              (SELECT valor FROM atendimento WHERE num=? ORDER BY id DESC LIMIT 1)," por ",
              (SELECT responsavel FROM atendimento WHERE num=? ORDER BY id DESC LIMIT 1))`;

                connection.query(sql, [num, num, num, num, num, num, num, num, num, num], function(err) {
                    if (err) { throw err; } else {}
                });
        */
    }

    if (ve == 1) {
        swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Salvo Com Sucesso!',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

function cria_save(id, nome, horario, responsavel, valor, procedimento, cor) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sanduba',
        dateStrings: true,
        multipleStatements: true,
        database: 'aroma'


    });



    connection.connect();
    var sql = 'INSERT INTO cliente(nome,state_cadastro) VALUES(?,0) ';

    connection.query(sql, [nome], async function(error, results) {
        if (error) {
            error_alert(' ao inserir cliente');
            console.log(error.code);
        }

    });
    sql = "SELECT id FROM cliente ORDER BY id DESC LIMIT 1";
    connection.query(sql, function(err, result) {
        if (err) {error_alert(" ao selecionar id do cliente em cria_save()"); throw err; } else {
            insert_ficha(result[0].id);
            write(result[0].id, id, nome, horario, responsavel, valor, procedimento, cor);
        }
    });



    connection.end();


}

function saveAt(id, table) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sanduba',
        dateStrings: true,
        multipleStatements: true,
        database: 'aroma'


    });
    console.log(id + " table: " + table);

    if (table == 1) {
        connection.connect();
        var sql = 'SELECT `id`,`nome` FROM `cliente` WHERE CONCAT(cliente.`id`) = ? ';
        var na1 = $('#tablet').find('tr').eq(id).find('td').eq(1).html();

        connection.query(sql, [na1], async function(error, results) {
            if (error) {
                error_alert(' ao salvar');
                console.log(error.code);
            } else {
                if (results.length > 0) {

                    write($('#tablet').find('tr').eq(id).find('td').eq(1).html(), $('#tablet').find('tr').eq(id).find('td').eq(0).html(), $('#tablet').find('tr').eq(id).find('td').find('#nomee').val(), $('#tablet').find('tr').eq(id).find('td').find('#horarioi').val(), 'Andreia', $('#tablet').find('tr').eq(id).find('td').find('#valori').val(), $('#tablet').find('tr').eq(id).find('td').find('#procei').val(), rgb2hex($('#tablet').find('tr').eq(id).css("background-color")));
                } else {


                    cria_save($('#tablet').find('tr').eq(id).find('td').eq(1).html(), $('#tablet').find('tr').eq(id).find('td').find('#nomee').val(), $('#tablet').find('tr').eq(id).find('td').find('#horarioi').val(), 'Andreia', $('#tablet').find('tr').eq(id).find('td').find('#valori').val(), $('#tablet').find('tr').eq(id).find('td').find('#procei').val(), rgb2hex($('#tablet').find('tr').eq(id).css("background-color")));
                }
            }
        });

        $('#tablet tr').eq(id).find('td').eq(2).find("button").prop("disabled", true);


    }
    if (table == 2) {
        connection.connect();
        var sql = 'SELECT `id`,`nome` FROM `cliente` WHERE CONCAT(cliente.`id`) = ? ';
        var na1 = $('#tablet2').find('tr').eq(id).find('td').eq(1).html();
        connection.query(sql, [na1], async function(error, results) {
            if (error) { console.log(error.code); error_alert("ao selecionar cliente pra salvar");} else {
                if (results.length > 0) {
                    write($('#tablet2').find('tr').eq(id).find('td').eq(1).html(), $('#tablet2').find('tr').eq(id).find('td').eq(0).html(), $('#tablet2').find('tr').eq(id).find('td').find('#nomee').val(), $('#tablet2').find('tr').eq(id).find('td').find('#horarioi').val(), 'Ronaldo', $('#tablet2').find('tr').eq(id).find('td').find('#valori').val(), $('#tablet2').find('tr').eq(id).find('td').find('#procei').val(), rgb2hex($('#tablet2').find('tr').eq(id).css("background-color")));
                } else {

                    cria_save($('#tablet2').find('tr').eq(id).find('td').eq(1).html(), $('#tablet2').find('tr').eq(id).find('td').find('#nomee').val(), $('#tablet2').find('tr').eq(id).find('td').find('#horarioi').val(), 'Ronaldo', $('#tablet2').find('tr').eq(id).find('td').find('#valori').val(), $('#tablet2').find('tr').eq(id).find('td').find('#procei').val(), rgb2hex($('#tablet2').find('tr').eq(id).css("background-color")));
                }
            }
        });
        $('#tablet2 tr').eq(id).find('td').eq(2).find("button").prop("disabled", true);
    }




    return;
}

async function adet(vet) {

    var k = 0;
    while (k < vet.length) {
        await addT(vet[k].t, vet[k].id);

        k++;
    }


    return;
}
async function addT(id, t) {


    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sanduba',
        dateStrings: true,
        multipleStatements: true,
        database: 'aroma'


    });
    var oTable, oCells, Val1, na, Val3;
    if (id == 0) {

        oTable = document.getElementById('tablet');


        oCells = oTable.rows.item(t).cells;
        Val1 = oCells.item(0).innerHTML;
        na = oCells.item(1).innerHTML;
        Val3 = oCells.item(2).innerHTML.replace('R$ ', '');
    } else {
        oTable = document.getElementById('tablet2');
        oCells = oTable.rows.item(t).cells;
        Val1 = oCells.item(0).innerHTML;
        na = oCells.item(1).innerHTML;
        Val3 = oCells.item(2).innerHTML.replace('R$ ', '');
    }
    console.log(na);

    connection.connect();

    sql = 'SELECT `id`,`nome` FROM `cliente` WHERE CONCAT(cliente.`nome`) LIKE ? ';
    var na2 = na.concat("%");
    connection.query(sql, [na2], async function(error, results, fields) {
        if (error) { console.log(error.code); error_alert(" na função AddT()") } else {
            console.log(results);

            var i = 0;

            function formt(nome, numero) {

                this.nome = nome;
                this.id = id;

            }
            var form = [],
                inputop = [];
            for (i = 0; i < results.length; i++) {
                form.push({ nome: results[i].nome, id: results[i].id });
                inputop.push(results[i].nome);

            }


            var name;


            const { value: id } = await swal({
                title: 'Selecione o cliente',
                input: 'select',
                inputOptions: inputop,
                inputPlaceholder: 'Nome completo',
                showCancelButton: true,
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        resolve();

                    })
                }
            })
            var op = 0;
            if (id) {
                op = 1;
                var nc = form[id].id;
                var idULT = nc;
                name = form[id].nome;
                var nameULT = name;
            } else {
                op = 2;
                const { value: nam } = await swal({
                    title: "Confirme o nome completo do cliente",
                    input: 'text',
                    inputValue: na,
                    inputPlaceholder: 'Nome completo',
                    showCancelButton: true,
                    confirmButtonText: "Confirmar",
                    cancelButtonText: "Cancelar",

                });

                name = nam;
                var nameULT = name;
            }

            sql = "INSERT INTO atendimento(nome,num, data,horario,responsavel,cor,valor,data) VALUES ?";
            var x1 = nameULT,
                x2 = idULT;
            var x3 = Val1,
                x10 = new Date();
            var x4, x5;
            var data_atendimento = $('#daySet').val() + " 13:00:00";
            if (id == 1) {
                x4 = 'Ronaldo';
                x5 = '#60BDFF';
            } else {
                x4 = 'Andreia';
                x5 = 'pink';
            }

            var x6 = Val3;
            data_atendimento = moment(data_atendimento).format("YYYY-MM-D HH:mm:ss");

            var values = [
                [x1, x2, data_atendimento, x3, x4, x5, x6, data_atendimento]
            ];
            connection.query(sql, [values], function(err, result) {
                if (err){error_alert(" ao inserir atendimento em addt"); throw err;}

            });
        }

        oTable.rows.item(t).style.backgroundColor = "pink";
    });



    return;

}

async function aux(x8, de, x6, x2) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sanduba',
        dateStrings: true,
        multipleStatements: true,
        database: 'aroma'


    });
    //----------------------------
    connection.connect();


    var sql2 = 'UPDATE ficha_cliente SET `descricao`= ? WHERE `id_cliente` = ? ';

    var tf = de.concat(`
`, x6, " : ", x2);
    console.log(tf);
    values = [
        [x8, tf],
        [x8]
    ];
    connection.query(sql2, [tf, x8], function(err, result) {
        if (err){error_alert(" ao atualizar ficha_cliente em aux()"); throw err;}
    });


}

async function save(num) {

    var v1 = $('#ficharea').val();
    var v2 = $('#clientenome').val();
    var v3 = $('#clientenumero').val();
    var v4 = $('#clientedatan').val();
    var v5 = moment($('#clientedata').val()).format("YYYY-MM-D HH:mm:ss");

    var v6 = $('#inputState').val();
    var v7 = $('#clientemedicacao').val();
    var v8 = $('#clienteprofissao').val();
    var v9 = $('#clientecidade').val();
    var v10 = $('#clientebairro').val();
    var v11 = $('#clienterua').val();
    var v12 = $('#clientenumero_end').val();
    var v13 = $('#clientenome_apartamento').val();
    var v14 = $('#clientenumero_apartamento').val();
    var v15 = $('#clienteimg').attr('src');
    var v16 = $('#clientecirurgia').val();
    console.log(v12);
    
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sanduba',
        dateStrings: true,
        multipleStatements: true,
        database: 'aroma'

    });
    //----------------------------
    connection.connect();
    var ve = 1;
    sql = 'UPDATE ficha_cliente SET ficha_cliente.descricao= ? WHERE CONCAT(ficha_cliente.`id_cliente`)=? ';
    var tf = v1;

    connection.query(sql, [tf, num], function(error, results, fields) {
        if (error) {
            console.log(error.code);
            ve = 0;
            error_alert(' ao atualizar ficha');
        } else {
            // console.log(results);
            console.log("Number of records inserted: (ficha) " + results.affectedRows);

        }
    });
    sql = 'UPDATE atendimento SET  nome=? WHERE CONCAT(atendimento.num)=?';
    connection.query(sql, [v2, num], function(error, results, fields) {
        if (error) { console.log(error.code); error_alert(' ao atualizar ficha'); } else {
            // console.log(results);
            console.log("Number of records inserted: (atendimento) " + results.affectedRows);
        }
    });

    sql = 'UPDATE cliente SET image=?,nome=?,data=?,data_nascimento=?,cidade=?,bairro=?,rua=?,numero_end=?,numero=?,profissao=?,medicacao=?,nome_apartamento=?,numero_apartamento=?,estado_civil=?,cirurgia=? WHERE CONCAT(cliente.`id`)=?';
    connection.query(sql, [v15, v2, v5, v4, v9, v10, v11, v12, v3, v8, v7, v13, v14, v6, v16, num], function(error, results) {
        if (error) {
            ve = 0;
            error_alert(' ao atualizar ficha');
            console.log(error.code);
        } else {
            console.log("Number of records inserted: (cli) " + results.affectedRows);
        }
    });

    connection.end();
    //stwo();
    if (ve == 1) {
        swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Salvo Com Sucesso!',
            showConfirmButton: false,
            timer: 1500
        })
    }

}

async function clean(num, op) {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sanduba',
        dateStrings: true,
        multipleStatements: true,
        database: 'aroma'


    });
    //----------------------------
    connection.connect();

    sql = 'UPDATE ficha_cliente SET descricao= ? WHERE CONCAT(ficha_cliente.`id_cliente`)=?';
    var tf = " ";
    connection.query(sql, [tf, num], function(error, results, fields) {
        if (error) { console.log(error.code); error_alert(' ao limpar ficha'); } else {
            //console.log(results);



        }
    });

    connection.end();
    stwo();

}

async function increment() {

    const { value: name } = await swal({

        title: "Quem o Indicou?", //Event Title
        html: `<input type="text" id="nameC" placeholder="Nome do cliente"/>`,
        onOpen: function() {
            function functionLabel(value, name) {
                var connection = mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: 'sanduba',
                    dateStrings: true,
                    multipleStatements: true,
                    database: 'aroma'


                });
                if (value == -1) {

                    connection.connect();
                    var sql = "INSERT INTO cliente(nome,data,indicacao) VALUES ?";
                    var x2 = name,
                        x10 = new Date();
                    x10 = moment(x10).format("YYYY-MM-D HH:mm:ss");
                    var values = [
                        [x2, x10, 1]
                    ];
                    connection.query(sql, [values], function(err, result) {
                        if (err) { error_alert(' ao inserir cliente indicador'); throw err }
                    });
                    //
                    var id_cli;
                    sql = "SELECT id FROM cliente ORDER BY id DESC LIMIT 1";
                    connection.query(sql, function(err, result) {
                        if (err) {error_alert(" ao selecionar id do cliente em increment()"); throw err; } else {
                            id_cli = result[0].id;
                            insert_ficha(id_cli);
                        }
                    });
                } else {

                    var sql = 'UPDATE cliente SET indicacao=indicacao+1 WHERE CONCAT(cliente.`id`)=?';
                    var values = [
                        [value]
                    ];
                    connection.query(sql, [values], function(err) {
                        if (err) { error_alert(' ao atualizar indicação'); throw err }
                    });
                }
                connection.end();
                return;
            };
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'sanduba',
                dateStrings: true,
                multipleStatements: true,
                database: 'aroma'


            });
            connection.connect();
            var clienteData = [];
            var sql = 'SELECT nome,id FROM `cliente`';
            connection.query(sql, function(err, result) {
                if (err) {error_alert(" ao selecionar nome e id do cliente em increment()"); throw err } else {
                    //console.log(result);

                    for (i = 0; i < result.length; i++) {
                        clienteData.push({ value: result[i].nome, label: result[i].nome, nome: result[i].nome, id: result[i].id, index: i, se: 0 });

                    }

                    $("#nameC").on('change', function() {
                        console.log("mu");
                    });

                    $('#nameC').each(function() {
                        $(this).autocomplete({
                            autofocus: true,
                            minLength: 1,
                            source: clienteData,
                            select: function(event, ui) {
                                event.preventDefault();
                                $(this).val(ui.item.value);
                                if (ui.item.op == "no") {
                                    functionLabel(-1, ui.item.value);
                                } else { functionLabel(clienteData[ui.item.index].id, ui.item.value); }

                                return false;
                            },
                            response: function(event, ui) {

                                if (ui.content.length === 0) {

                                    var noResult = { value: $(this).val(), label: "Cliente novo", op: "no" };
                                    ui.content.push(noResult);
                                    return false;
                                }
                            }
                        });
                        $(this).autocomplete("search");

                    });
                }
            });
        }

    });

    return;
}

function setstate(num, q) {
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

    sql = 'UPDATE cliente SET state_cadastro=? WHERE CONCAT(cliente.`id`)=?';
    connection.query(sql, [q, num], function(error, results, fields) {
        if (error) {
            error_alert(' ao completar cliente');
            console.log(error.code);
        } else {



        }
    });


    return;
}

async function ficha(num, op) {

    //console.log(num);
    var sql;
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sanduba',
        dateStrings: true,
        multipleStatements: true,
        database: 'aroma'


    });
    //----------------------------
    connection.connect();
    console.log(num);
    sql = 'SELECT cliente.`cirurgia`,ficha_cliente.`descricao` ,cliente.`state_cadastro`, cliente.`image`,cliente.`nome`,cliente.`indicacao`, cliente.`numero`,cliente.`data` as data_cli,cliente.`id` ,cliente.`nome_apartamento`,cliente.`data_nascimento`,cliente.`numero_apartamento`,cliente.`profissao`,cliente.`estado_civil`,cliente.`medicacao`,cliente.`cidade`,cliente.`bairro`,cliente.`rua`,cliente.`numero_end` ,ficha_cliente.data FROM `cliente`,ficha_cliente WHERE cliente.`id`=? AND cliente.`id`=ficha_cliente.`id_cliente`';
    connection.query(sql, [num], function(error, results, fields) {
        if (error) {
            error_alert(' ao carregar ficha');
            console.log(error.code);
        } else {
            //console.log(results);

            if (results.length > 0) {
                // console.log("e");

                if (results[0].indicacao != null) {
                    $('#clienteindicacao').val(results[0].indicacao);
                }
                if (results[0].descricao != null) {
                    $('#ficharea').val(results[0].descricao);
                }
                if (results[0].nome != null) {
                    $('#clientenome').val(results[0].nome);
                }
                if (results[0].numero != null) {
                    $('#clientenumero').val(results[0].numero);
                }
                if (results[0].data_nascimento != null) {
                    $('#clientedatan').val(results[0].data_nascimento);
                }
                if (results[0].data_cli != null) {
                    var xd = moment(results[0].data_cli).format("YYYY-MM-DD");


                    $('#clientedata').val(xd);
                }
                if (results[0].estado_civil != null) {
                    $('#inputState').val(results[0].estado_civil);
                } else {
                    $('#inputState').val("Solteiro");

                }
                if (results[0].medicacao != null) {
                    $('#clientemedicacao').val(results[0].medicacao);
                }
                if (results[0].profissao != null) {
                    $('#clienteprofissao').val(results[0].profissao);
                }
                if (results[0].cidade != null) {
                    $('#clientecidade').val(results[0].cidade);
                }
                if (results[0].bairro != null) {
                    $('#clientebairro').val(results[0].bairro);
                }
                if (results[0].rua != null) {
                    $('#clienterua').val(results[0].rua);
                }
                
                
                if (results[0].numero_end != null) {
                    $('#clientenumero_end').val(results[0].numero_end);
                }
                if (results[0].nome_apartamento != null) {
                    $('#clientenome_apartamento').val(results[0].nome_apartamento);
                }
                if (results[0].numero_apartamento != null) {
                    $('#clientenumero_apartamento').val(results[0].numero_apartamento);
                }
                if (results[0].image != null) {
                    $('#clienteimg').attr('src', results[0].image);

                }
                if (results[0].cirurgia != null) {
                    $('#clientecirurgia').val(results[0].cirurgia);
                }

                const bu1 = $('#buts1');
                const bu2 = $('#buts2');
                const bu3 = $('#buts3');
                const bu4 = $('#buts4');
                //const fich = $('#fi');
                bu3.click(async function() {

                    setindica(results[0].numero, $('#input_zerar').val());
                    $('#clienteindicacao').val($('#input_zerar').val());
                });


                bu4.click(async function() {

                    const { value: ui } = await swal({

                        title: "Tirar foto", //Event Title
                        html: `<div id="camdemo" style="width: 320px; height: 240px; text-align: center; margin: 0 auto;"></div>
<br>
<div style="text-align:center;">
    <input type="button" class="btn btn-info" id="start" value="Ligar/Desligar câmera"/>
     <a id="test"></a>
      <input type=button class="btn btn-primary" value="Tirar foto" id="take"/>
    	<div id="resulttitle"></div>
	<div id="results" ></div>

</div>`,
                        onBeforeOpen: () => {
                            const content = swal.getContent();
                            const $ = content.querySelector.bind(content);

                            const start = $('#start');
                            const take = $('#take');

                            var enabled = false;

                            var WebCamera = require("webcamjs");
                            start.addEventListener('click', () => {

                                if (!enabled) { // Start the camera !
                                    enabled = true;
                                    WebCamera.attach('#camdemo');
                                    console.log("The camera has been started");
                                } else { // Disable the camera !
                                    enabled = false;
                                    WebCamera.reset();
                                    console.log("The camera has been disabled");
                                }
                            });
                            //var ui;
                            take.addEventListener('click', () => {

                                // play sound effect


                                // take snapshot and get image data
                                WebCamera.snap(function(data_uri) {
                                    uil = data_uri;

                                    document.getElementById('resulttitle').innerHTML = '<h2>Foto Tirada:</h2><br>';
                                    // display results in page
                                    //
                                    document.getElementById('results').innerHTML =
                                        '<img id="imageprev" src="' + data_uri + '"/>';
                                });

                                WebCamera.reset();

                            });
                            /*savefile.addEventListener('click', () => {
                          //op=1;
                          //console.log(ui);
                          //

                    });*/


                        },
                        preConfirm: () => {
                            return [
                                document.getElementById('imageprev').getAttribute('src')

                            ]
                        }
                    });
                    //console.log(ui);
                    $('#clienteimg').attr("src", ui);
                });



                /*().on('submit',function(e) {
                    
                    save(results[0].id);
                    
                });*/

                $("#formFICHA").submit(function(e) {
                    e.preventDefault();
                    save(results[0].id);
                });


                bu2.click(function() {

                    clean(results[0].numero, 1);
                    $('#ficharea').val(" ");
                });

                if (results[0].state_cadastro == 0) {

                    increment();
                    setstate(results[0].id, 1);


                }


                show('t5', 'l5');

            }

        }
    });
    $("#TableFicha tr").remove();
    sql = 'SELECT*FROM atendimento WHERE atendimento.num=?';
    connection.query(sql, [num], function(error, results, fields) {
        if(error){ error_alert(" ao selecionar atendimentos em ficha()");}
        for (i = 0; i < results.length; i++) {
            if (results[i].responsavel == "Andreia") {
                $("#TableFicha").append(`<tr style="background-color:pink;"><td class="clientename">` + results[i].data + `</td><td>` +
                    results[i].horario + `</td><td>` + results[i].procedimento +
                    `</td><td><svg width="20" height="20" style="margin-right: 4px; ">
                    <rect width="20" height="20" style="fill:` + results[i].cor + `;stroke-width:3;stroke:rgb(0,0,0)" /></svg>` +
                    `</td><td>` + results[i].valor + `</td><tr>`);
            } else {
                $("#TableFicha").append(`<tr style="background-color:#60BDFF;"><td class="clientename">` + results[i].data + `</td><td>` +
                    results[i].horario + `</td><td>` + results[i].procedimento +
                    `</td><td><svg width="20" height="20" style="margin-right: 4px; "><rect width="20" height="20" style="fill:` + results[i].cor + `;stroke-width:3;stroke:rgb(0,0,0)" /></svg>` +
                    `</td><td>` + results[i].valor + `</td><tr>`);

            }


        }


    });


    connection.end();

    return;
}

function setindica(cli, ni) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sanduba',
        dateStrings: true,
        multipleStatements: true,
        database: 'aroma'


    });
    //----------------------------
    connection.connect();

    var sql = 'UPDATE cliente SET indicacao=? WHERE CONCAT(cliente.`numero`)=?';
    connection.query(sql, [ni, cli], function(error, results, fields) {
        if (error) {
            error_alert(' ao atualizar indicação');
            console.log(error.code);
        } else {
            //console.log(results);



        }
    });
    connection.end();

    return;
}

function saveDesp(cod, ind) {


    var sql;
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sanduba',
        dateStrings: true,
        multipleStatements: true,
        database: 'aroma'


    });
    //----------------------------
    connection.connect();

    sql = 'UPDATE despesa SET despesa.descricao=? valor=? prazo=? WHERE CONCAT(despesa.`cod_despesa`)=?';
    connection.query(sql, [$("#TableData3").find('tr').eq(ind).find('td').eq(0).val(), $("#TableData3").find('tr').eq(ind).find('td').eq(1).val(), $("#TableData3").find('tr').eq(ind).find('td').eq(3).val(), cod], function(error, results, fields) {
        if (error) {
            error_alert(' ao atualizar despesa');
            console.log(error.code);
        } else {

        }
    });


}

async function mostrar(op) {
    switch (op) {
        //clientes
        case 1:
            {
                var sql;
                var connection = mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: 'sanduba',
                    dateStrings: true,
                    multipleStatements: true,
                    database: 'aroma'


                });
                //----------------------------
                connection.connect();

                sql = 'SELECT `nome`, `CPF`, `numero`,`data`,`id` FROM `cliente` WHERE CONCAT(cliente.`state_cadastro`)=1';
                connection.query(sql, function(error, results, fields) {
                    if (error) {
                        error_alert(' ao carregar clientes');
                        console.log(error.code);
                    } else {

                        var len = results.length,
                            i;

                        for (i = 0; i < len; i++) {
                            $("#TableData1").append(`<tr><td class="clientename">` + results[i].nome + `</td><td>` +
                                results[i].numero + `</td><td>` + results[i].data +
                                `</td><td><span style="display:inline-block; width: 10px;"></span>` +
                                `<button type="button" class="btn btn-danger btn-exc" onclick="remove(` + results[i].id + `,6);">Excluir</button>` +
                                `<span style="display:inline-block; width: 10px;"></span></td><td><span style="display:inline-block; width: 10px;"></span>` +
                                `<button type="button" class="btn btn-success" onclick="ficha(` + results[i].id + `,1);">Ver ficha</button></td><tr>`);
                        }


                    }
                });
                connection.end();
                break;
            }
            //empregados----------------------------------
        case 2:
            {

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

                sql = 'SELECT*FROM `atividades`';
                connection.query(sql, function(error, results, fields) {
                    if (error) {
                        error_alert(' ao carregar atividades');
                        console.log(error.code);
                    } else {

                        var len = results.length,
                            i;

                        for (i = 0; i < len; i++) {
                            $("#TableData2").append("<tr><td>" + results[i].nome_ati + "</td><td>" + results[i].valor + "</td><td>" + results[i].data + "</td><td>" + '<button type="button" class="btn btn-danger btn-exc" onclick="remove(' + results[i].cod_atividade + ',3);">Excluir</button><span style="display:inline-block; width: 10px;"></span><button type="button" class="btn btn-info btn-ati " onclick="update(`2018-12-13`,' + results[i].cod_atividade + ',3);">Editar</button></td></tr>');
                        }

                    }
                });
                connection.end();



                break;
            }
            //produtos
        case 3:
            {

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

                sql = 'SELECT*FROM `despesas`';
                connection.query(sql, function(error, results, fields) {
                    if (error) {
                        error_alert(' ao carregar despesas');
                        console.log(error.code);
                    } else {

                        var len = results.length,
                            i;

                        for (i = 0; i < len; i++) {
                            $("#TableData3").append("<tr><td><input type='text' value='" + results[i].descricao + "' ></td><td>R$ <input type='text' value='" + results[i].valor + " '></td><td>" + results[i].data + "</td><td><input type='date' value='" + results[i].prazo + "'></td><td>" + '<button class="btn btn-info " onclick="saveDesp(' + results[i].cod_despesa + ',' + i + ');"><div class="textColor">SV</div></button><button type="button" class="btn btn-danger btn-exc" onclick="remove(' + results[i].cod_despesa + ',4);">Excluir</button></td></tr>');
                        }

                    }
                });
                connection.end();


                break;
            }
            //reservas
        case 4:
            {

                var sql;
                var connection = mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: 'sanduba',
                    dateStrings: true,
                    multipleStatements: true,
                    database: 'aroma'


                });

                var connection2 = mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: 'sanduba',
                    dateStrings: true,
                    multipleStatements: true,
                    database: 'aroma'


                });


                connection.connect();
                sql = 'SELECT cliente.`nome`,cliente.numero, ficha_cliente.descricao,ficha_cliente.data FROM `cliente`,ficha_cliente WHERE cliente.`id`=ficha_cliente.id_cliente';

                connection.query(sql, function(error, results, fields) {
                    if (error) {
                        error_alert(" ao selecionar cliente em mostrar(4)");
                        console.log(error.code);
                    } else {
                        console.log(results);


                        var len = results.length;

                        for (i = 0; i < len; i++) {

                            $("#TableData4").append("<tr><td>" + results[i].nome + "</td><td>" + results[i].data + "</td><td>" + results[i].descricao + "</td><td>" + '<button type="button" class="btn btn-danger btn-exc" onclick="remove(' + results[i].ficha_a + ',5);">Excluir</button><span style="display:inline-block; width: 10px;"></span><button type="button" class="btn btn-info " onclick="update(' + results[i].ficha_a + ',5);"><span class="glyphicon ">✎</span></button></td></tr>');
                        }

                    }
                });
                connection.end();


                break;
            }
        case 14:
            {
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

                sql = 'SELECT cliente.nome,cliente.id FROM `cliente` WHERE CONCAT(cliente.`state_cadastro`)=?';
                connection.query(sql, [0], function(error, results, fields) {
                    if (error) {
                        error_alert(' ao selecionar cliente em mostrar(14)');
                        console.log(error.code);
                    } else {

                        var len = results.length,
                            i;


                        for (i = 0; i < len; i++) {
                            //console.log("nome "+results[i].nome+" id "+results[i].id);
                            $("#TableData14").append("<tr><td>" + results[i].nome +
                                `</td><td><button type="button" class="btn btn-danger btn-exc" onclick="remove(` + results[i].id + `,6);">Excluir</button>` +
                                `</td><td><button type="button" class="btn btn-success" onclick="ficha(` + results[i].id + `,1);">Ver ficha</button></td><tr>`);
                        }
                    }
                });
                connection.end();


                break;
            }
        case 15:
            {

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

                sql = 'SELECT cliente.nome,cliente.numero,cliente.indicacao FROM `cliente` WHERE CONCAT(cliente.`indicacao`)>=? ORDER BY cliente.indicacao DESC';
                connection.query(sql, [1], function(error, results, fields) { //NUMERO DE INDICAÇÃO INDICACAO
                    if (error) {
                        error_alert(' ao carregar indicação');
                        console.log(error.code);
                    } else {

                        var len = results.length,
                            i;

                        for (i = 0; i < len; i++) {
                            $("#TableData15").append("<tr><td>" + results[i].nome +
                                `</td><td>` + results[i].numero + `</td><td>` + results[i].indicacao + `</td><td><button type="button" class="btn btn-danger btn-ada" id="btn_zerar" onclick="setindica(` + results[i].numero + `,0); stwo();">Zerar</button>`);
                        }
                    }
                });
                connection.end();


                break;
            }//atendimentos
        case 20:
            {


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

                sql = 'SELECT atendimento.num,atendimento.procedimento,atendimento.id,atendimento.valor,atendimento.data,atendimento.horario,atendimento.`nome`,atendimento.`responsavel`,atendimento.`id`,atendimento.`cor` FROM `atendimento` WHERE atendimento.`responsavel`="Andreia" AND atendimento.data BETWEEN ? AND ? ORDER BY atendimento.data ASC';
                var CurrentDate = moment().format('YYYY-MM-DD');
                var a = moment(CurrentDate).format('YYYY-MM-DD');
                CurrentDate = CurrentDate + ' 13:00:00';

                a = moment(a, 'YYYY-MM-DD').add(1, 'days');
                a = moment(a).format('YYYY-MM-DD');

                a = a + " 03:00:00";
                var values = [CurrentDate, a];
                connection.query(sql, values, function(error, results) {
                    if (error) {
                        error_alert(' ao carregar atendimento ');
                        console.log(error.code);
                    } else {

                        var len = results.length,
                            i;

                        for (i = 0; i < len; i++) {
                            //soma+=results[i].valor;
                            $("#TableDataAtendimento").append(`<tr style="background-color:` + results[i].cor + `;"><td class="invisible" style='display: none; !important;'>` + results[i].id + `<td class="invisible" style='display: none; !important;'>` + results[i].num + `</td><td style="display: inline-flex;"><button  type="button" class="btn btn-info btn-ati btnSaveAt"  onclick="saveAt(` + (i + 1) + `,1);" disabled><div class="textSaveAt">SV</div></button><button id="btnColor" type="button" class="btn btn-info  btnSaveAt2" onclick="colorAt(` + (i + 1) + `,1);"><div class="textColor">cor</div></button></td>` +
                                `<td ><input class="form-control transparent-input " type="time" value="` + results[i].horario + `" id="horarioi"/>` +
                                `</td><td  id="nome"><input class="form-control transparent-input" type="text" onkeypress="this.style.width = ((this.value.length + 1) * 8) + 'px';" value="` + results[i].nome + `" id="nomee"></td><td  ><input class="form-control transparent-input" value="` + results[i].valor + `" id="valori">` + `</td><td ><input class="form-control transparent-input"  id="procei" value="` + results[i].procedimento + `">` + `</td><td><button type="button" class="btn btn-danger btn-exc" onclick="remove(` + results[i].id + `,20);">Excluir</button><span style="display:inline-block; width: 10px;"></span></td></tr>`);
                        }
                        $("#TableDataAtendimento").append("<tr id='soma'><td class='invisible' style='display: none; !important;'></td><td class='invisible' style='display: none;'></td><td></td><td></td><td >Soma do dia:</td><td id='somatd'>R$ " + soma(1) + "</td><td></td><td></td></tr>");

                    }

                });

                connection.end();
                break;
            }
        case 21:
            {

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

                sql = 'SELECT atendimento.num,atendimento.procedimento,atendimento.id,atendimento.valor,atendimento.data,atendimento.horario,atendimento.`nome`,atendimento.`responsavel`,atendimento.`id`,atendimento.`cor` FROM `atendimento` WHERE  atendimento.`responsavel`="Ronaldo" AND atendimento.data BETWEEN ? AND ? ';
                var CurrentDate = moment().format('YYYY-MM-DD');
                var a = moment(CurrentDate).format('YYYY-MM-DD');
                CurrentDate = CurrentDate + ' 13:00:00';
                a = moment(a, 'YYYY-MM-DD').add(1, 'days');
                a = moment(a).format('YYYY-MM-DD');
                a = a + " 03:00:00";
                var values = [CurrentDate, a];
                connection.query(sql, values, function(error, results) {
                    if (error) {
                        error_alert(" ao selecionar atendimento em mostrar(21)");
                        console.log(error.code);
                    } else {
                        var len = results.length,
                            i;
                        for (i = 0; i < len; i++) {
                            $("#TableDataAtendimento2").append(`<tr style="background-color:` + results[i].cor + `;"><td class="invisible" style='display: none; !important;'>` + results[i].id + `<td class="invisible" style='display: none; !important;'>` + results[i].num + `</td><td style="display: inline-flex;"><button  type="button" class="btn btn-info btn-ati btnSaveAt"  onclick="saveAt(` + (i + 1) + `,2);" disabled><div class="textSaveAt">SV</div></button><button id="btnColor" type="button" class="btn btn-info  btnSaveAt2" onclick="colorAt(` + (i + 1) + `,2);"><div class="textColor">cor</div></button></td>` +
                                `<td ><input class="form-control transparent-input" type="time" value="` + results[i].horario + `" id="horarioi"/>` +
                                `</td><td id="nome"><input class="form-control transparent-input" type="text" onkeypress="this.style.width = ((this.value.length + 1) * 8) + 'px';" value="` + results[i].nome + `" id="nomee"/></td><td ><input class="form-control transparent-input" value="` + results[i].valor + `" id="valori"/></td>` + `</td><td ><input class="form-control transparent-input"  id="procei" value="` + results[i].procedimento + `">` + `</td><td><button type="button" class="btn btn-danger btn-exc" onclick="remove(` + results[i].id + `,21);">Excluir</button><span style="display:inline-block; width: 10px;"></span></td></tr>`);
                        }
                        $("#TableDataAtendimento2").append("<tr id='soma'><td class='invisible' style='display: none; !important;'></td><td class='invisible' style='display: none; !important;'></td><td></td><td></td><td>Soma do dia:</td><td id='somatd'>R$ " + soma(2) + "</td><td></td><td></td></tr>");
                        load = 1;
                    }
                });
                connection.end();

            }

    }



    return;
}

async function insert_ficha(id_cli) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sanduba',
        dateStrings: true,
        multipleStatements: true,
        database: 'aroma'

    });

    connection.connect();
    var sql2 = 'INSERT INTO ficha_cliente(`id_cliente`,`descricao`)  SELECT  ?,?    WHERE   NOT EXISTS  (   SELECT  1 FROM    ficha_cliente    WHERE   `id_cliente` = ? )';
    var tf = " ";
    connection.query(sql2, [id_cli, tf, id_cli], function(err) {
        if (err){error_alert(" ao inserir ficha_cliente em insert_ficha()"); throw err;}
    });
    connection.end();

}
async function add(op) {

    //console.log("ASD");


    switch (op) {
        case 1:



            const { value: formValues } = await swal({
                title: 'Adicionar ',
                html: '<input id="procedimento" class="swal2-input" placeholder="Procedimento">' +
                    '<input id="valor" class="swal2-input" placeholder="Valor">',
                focusConfirm: false,
                preConfirm: () => {
                    return [

                        document.getElementById('procedimento').value,
                        document.getElementById('valor').value


                    ]
                }
            })
            if (formValues) {

                var connection = mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: 'sanduba',
                    dateStrings: true,
                    multipleStatements: true,
                    database: 'aroma'


                });

                connection.connect();


                var sql = "INSERT INTO atividades(nome_ati, valor, data) VALUES ?";
                var x = document.getElementById("procedimento").value,
                    x2 = document.getElementById("valor").value,
                    x10 = new Date();
                x10 = moment(x10).format("YYYY-MM-D HH:mm:ss");
                //console.log(x10);
                var values = [
                    [x, x2, x10]
                ];
                connection.query(sql, [values], function(err, result) {
                    if (err) { error_alert(' ao inserir atividades'); throw err; }
                    //console.log("Number of records inserted: " + result.affectedRows);
                });

                connection.end();
                stwo();
            }

            break;
        case 2:

            const { value: formValues2 } = await swal({
                title: 'Adicionar Cliente',
                html: '<input id="nomes" class="swal2-input" type="text" placeholder="Nome">' +
                    '<input id="numero" class="swal2-input" placeholder="Número(celular/telefone) COM DDD">',

                focusConfirm: false,
                preConfirm: () => {
                    return [

                        document.getElementById('numero').value,
                        document.getElementById('nomes').value


                    ]
                }
            })
            if (formValues2) {

                var connection = mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: 'sanduba',
                    dateStrings: true,
                    multipleStatements: true,
                    database: 'aroma'


                });

                connection.connect();
                console.log(formValues2);

                var sql = "INSERT INTO cliente(numero,nome,data) VALUES ?";
                var x = formValues2[0],
                    x2 = formValues2[1],
                    x10 = new Date();
                x10 = moment(x10).format("YYYY-MM-DD HH:mm:ss");
                var values = [
                    [x, x2, x10]
                ];
                connection.query(sql, [values], function(err, result) {
                    if (err) { error_alert(" ao inserir cliente em add(2)"); throw err; }
                    console.log("Number of records inserted: " + result.affectedRows);
                });
                var id_cli;
                sql = "SELECT id FROM cliente ORDER BY id DESC LIMIT 1";
                connection.query(sql, function(err, result) {
                    if (err) {error_alert(" ao selecionar ultimo id do cliente em add(2)"); throw err; } else {
                        id_cli = result[0].id;
                        insert_ficha(id_cli);
                    }
                });

                connection.end();
            }
            stwo();

            break;
        case 3:

            const { value: formValues3 } = await swal({
                title: 'Adicionar ',
                html: '<input id="descricao" class="swal2-input" placeholder="Descrição da despesa">' +
                    '<input id="valor" class="swal2-input" placeholder="Valor">' +
                    '<input id="prazo" type="date" class="swal2-input" placeholder="Prazo(se houver)">',
                focusConfirm: false,
                preConfirm: () => {
                    return [

                        document.getElementById('descricao').value,
                        document.getElementById('valor').value,
                        document.getElementById('prazo').value


                    ]
                }
            })
            if (formValues3) {

                var connection = mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: 'sanduba',
                    dateStrings: true,
                    multipleStatements: true,
                    database: 'aroma'


                });

                connection.connect();


                var sql = "INSERT INTO despesas(descricao, valor,prazo,data) VALUES ?";
                var x = document.getElementById("descricao").value,
                    x2 = document.getElementById("valor").value,
                    x3 = document.getElementById("prazo").value,
                    x10 = new Date();
                x10 = moment(x10).format("YYYY-MM-D HH:mm:ss");
                //console.log(x10);
                x3 = x3.concat(" ", "00:00");
                var values = [
                    [x, x2, x3, x10]
                ];
                connection.query(sql, [values], function(err, result) {
                    if (err) { error_alert(' ao inserir despesas'); throw err; }
                    //console.log("Number of records inserted: " + result.affectedRows);
                });

                connection.end();
                stwo();
            }

            break;
        case 4:


            break;
        case 5:


            break;

        case 20:
            console.log("entrou");

            const { value: na } = await swal({
                title: 'Digite o Nome do Cliente',
                input: 'text',
                //inputValue: inputValue,
                showCancelButton: true,
                inputValidator: (value) => {
                    return !value && 'Você precisa escrever alguma coisa!'
                }
            })
            if (na) {

                var connection = mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: 'sanduba',
                    dateStrings: true,
                    multipleStatements: true,
                    database: 'aroma'


                });

                connection.connect();

                sql = 'SELECT `id`,`nome` FROM `cliente` WHERE CONCAT(cliente.`nome`) LIKE ? ';
                var na2 = na.concat("%");
                connection.query(sql, [na2], async function(error, results, fields) {
                    if (error) {
                        error_alert(" ao selecionar cliente em add(20)");
                        console.log(error.code);
                    } else {
                        console.log(results);

                        var i = 0;

                        function formt(nome, numero) {

                            this.nome = nome;
                            this.id = id;

                        }
                        var form = [],
                            inputop = [];
                        for (i = 0; i < results.length; i++) {
                            form.push({ nome: results[i].nome, id: results[i].id });
                            inputop.push(results[i].nome);

                        }


                        var name;


                        const { value: id } = await swal({
                            title: 'Selecione o cliente',
                            input: 'select',
                            inputOptions: inputop,
                            inputPlaceholder: 'Nome completo',
                            showCancelButton: true,
                            inputValidator: (value) => {
                                return new Promise((resolve) => {
                                    resolve();

                                })
                            }
                        })
                        var op = 0;
                        if (id) {
                            op = 1;
                            var nc = form[id].id;
                            name = form[id].nome;
                        } else {
                            op = 2;
                            const { value: nam } = await swal({
                                title: "Confirme o nome completo do cliente",
                                input: 'text',
                                inputValue: na,
                                inputPlaceholder: 'Nome completo',
                                showCancelButton: true,
                                confirmButtonText: "Confirmar",
                                cancelButtonText: "Cancelar",

                            });

                            name = nam;

                        }


                        const { value: formValues20 } = await swal({
                            title: 'Adicionar atendimento',
                            html:

                                `<input id="horario" class="swal2-input"  placeholder="horário"  value="13:00">` +
                                '<input id="nome" class="swal2-input" placeholder="Nome" value="' + name + '">' +
                                '<input id="procedimento" class="swal2-input" placeholder="Procedimento">' +
                                '<input type="radio" name="res" id="resp" value="#60BDFF">Ronaldo <input type="radio" id="resp" name="res" value="pink"> Andreia<br></br>' +
                                '<input id="valor" class="swal2-input" placeholder="Valor">',
                            focusConfirm: false,
                            showCancelButton: true,
                            cancelButtonText: "Cancelar",

                            preConfirm: () => {
                                return [
                                    document.getElementById('horario').value,
                                    document.getElementById('nome').value,
                                    document.getElementById('procedimento').value,
                                    $('input[name="res"]:checked').val(),

                                    document.getElementById('valor').value


                                ]
                            }
                        })
                        if (formValues20) {

                            var connection = mysql.createConnection({
                                host: 'localhost',
                                user: 'root',
                                password: 'sanduba',
                                dateStrings: true,
                                multipleStatements: true,
                                database: 'aroma'


                            });
                            var x5;
                            connection.connect();
                            console.log("f20: " + formValues20);
                            if ($('input[name="res"]:checked').val() == 'pink') {
                                x5 = 'Andreia';
                            } else {
                                x5 = 'Ronaldo';
                            }
                            if (op == 1) {
                                var sql = "INSERT INTO atendimento(nome,num, data,horario,procedimento,responsavel,cor,valor) VALUES ?";
                                var data_atendimento = $('#daySet').val() + " 13:00:00";
                                var x1 = document.getElementById("nome").value,
                                    x2 = nc;
                                var x3 = document.getElementById("horario").value,
                                    x10 = new Date(),
                                    x4 = document.getElementById("procedimento").value;
                                var x6 = $('input[name="res"]:checked').val();
                                var x7 = document.getElementById("valor").value;
                                data_atendimento = moment(data_atendimento).format("YYYY-MM-D HH:mm:ss");
                                //console.log(x10);
                                var values = [
                                    [x1, x2, data_atendimento, x3, x4, x5, x6, x7]
                                ];
                                connection.query(sql, [values], function(err, result) {
                                    if (err) { error_alert(' ao inserir atendimento'); throw err; }
                                    console.log("Number of records inserted: " + result.affectedRows);
                                });

                                connection.end();

                            }
                            if (op == 2) {
                                console.log("op2");

                                var idULT;
                                var sql = "INSERT INTO cliente(nome) VALUES (?)";

                                var nameULT = name;
                                console.log(nameULT);

                                connection.query(sql, [nameULT], function(err, result) {
                                    if (err){error_alert(" ao inserir nome do cliente em add(20)"); throw err;}
                                });
                                sql = "SELECT id FROM cliente ORDER BY id DESC LIMIT 1";
                                connection.query(sql, function(err, result) {
                                    if (err) {error_alert(" ao selecionar id do cliente em add(20)"); throw err } else {
                                        idULT = result[0].id;


                                        console.log("re:" + idULT);

                                        sql = "INSERT INTO atendimento(nome,num, data,horario,procedimento,responsavel,cor,valor) VALUES ?";
                                        var x1 = nameULT,
                                            x2 = idULT;
                                        var x3 = document.getElementById("horario").value,
                                            x10 = new Date(),
                                            x4 = document.getElementById("procedimento").value;
                                        var x6 = $('input[name="res"]:checked').val();
                                        var data_atendimento = $('#daySet').val() + " 13:00:00";
                                        var x7 = document.getElementById("valor").value;
                                        data_atendimento = moment(data_atendimento).format("YYYY-MM-D HH:mm:ss");

                                        var values = [
                                            [x1, x2, data_atendimento, x3, x4, x5, x6, x7]
                                        ];
                                        connection.query(sql, [values], function(err, result) {
                                            if (err) { error_alert(' ao inserir atendimento em add(20) da ultima conexão'); throw err; }

                                        });
                                    }
                                    connection.end();
                                });
                            }
                            //stwo();
                        }
                    }
                });
            }


            break;



    }



    return;
}

async function update(da, st, op) {

    switch (op) {
        //Atendimentos
        case 1:

            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'sanduba',
                dateStrings: true,
                multipleStatements: true,
                database: 'aroma'


            });

            connection.connect();
            var form = [];
            var tit = "";
            sql = 'SELECT `nome`,`valor`,`horario`,`cor`,`responsavel`,procedimento` FROM `atendimento` WHERE CONCAT(atendimento.`id`)=? ';
            connection.query(sql, [st], async function(error, results, fields) {
                if (error) { console.log(error.code); error_alert(" ao selecionar atendimento em update(1) "); } else {

                    console.log(results[0].title);
                    console.log('len: ' + results.length);
                    var va = "",
                        i = 0;


                    form = { procedimento: results[0].procedimento, nome: results[0].nome, valor: results[0].valor, responsavel: results[0].responsavel, cor: results[0].cor, horario: results[0].horario };

                }
            });
            const { value: nom } = await swal({
                title: 'Editar Nome',
                input: 'text',
                inputValue: form.nome,





            })
            const { value: hora } = await swal({
                title: 'Editar Horário',
                input: 'text',
                inputValue: form.horario,




            })
            const { value: proce } = await swal({
                title: 'Editar Valor',
                input: 'text',
                inputValue: form.procedimento,




            })


            const { value: co } = await swal({
                title: 'Responsável:',
                html: 'Atual: ' + form.responsavel + '<br/><input type="radio" name="res" id="resp" value="#60BDFF">Ronaldo <input type="radio" id="resp" name="res" value="pink"> Andreia<br>',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        $('input[name="res"]:checked').val(),
                        //document.getElementById('resp').value,


                    ]
                }
            })


            form.nome = nom;
            form.horario = hora;
            form.valor = va;


            if (co = "Ronaldo") {
                form.responsavel = 'Ronaldo';
                form.cor = "#60BDFF";
            } else {
                form.responsavel = 'Andreia';
                form.cor = "pink";
            }

            if (form) {




                var x1 = form.nome,
                    x2 = form.valor,
                    x3 = form.horario,
                    x4 = form.responsavel,
                    x5 = form.cor;


                console.log("Connected! resp: " + x5 + " da: " + x6);
                var sql = 'UPDATE `atendimento` SET `nome`=?,`valor`=?,`horario`=?,`responsavel`=?,`cor`=? WHERE CONCAT(atendimento.`id`)=?';
                var values = [
                    [x1, x2, x3, x4, x5, st]
                ];
                connection.query(sql, [x1, x2, x3, x4, x5, st], function(err, result) {
                    if (err){error_alert(" ao atualizar atendimento em update(1)"); throw err;}
                    console.log("Number of records inserted: " + result.affectedRows);
                });

            }

            connection.end();
            //stwo();
            break;
            //atividades
        case 3:

            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'sanduba',
                dateStrings: true,
                multipleStatements: true,
                database: 'aroma'


            });


            const { value: formValues2 } = await swal({
                title: 'Editar Atividade',

                html: '<input id="nome" class="swal2-input" placeholder="Nome">' +
                    '<input id="preco" class="swal2-input" placeholder="Preço">' +
                    '<input type="date" id="data" class="swal2-input" placeholder="Data de Adição">',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('nome').value,
                        document.getElementById('preco').value,
                        document.getElementById('data').value
                    ]
                }
            })
            if (formValues2) {


                connection.connect();


                var x = document.getElementById('nome').value,
                    x2 = document.getElementById("preco").value,
                    x3 = document.getElementById("data").value;

                var sql = 'UPDATE `atividades` SET `nome_ati`=?,`valor`=?,`data`=? WHERE CONCAT(atividades.`cod_atividade`)=?';
                x3 = x3.concat(" ", "00:00");

                connection.query(sql, [x, x2, x3, st], function(err, result) {
                    if (err){error_alert(" ao atualizar atividades em update(1)"); throw err;}
                    console.log("Number of records updated: " + result.affectedRows);
                });



                connection.end();
                stwo();
                //$("#TableData2  tr").remove();
                console.log("bla");
                mostrar(2);


            }
            break;

            //cliente
        case 4:

            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'sanduba',
                dateStrings: true,
                multipleStatements: true,
                database: 'aroma'


            });


            const { value: formValues4 } = await swal({
                title: 'Editar Cliente',
                html: '<input id="nome" class="swal2-input" placeholder="Nome">' +
                    '<input id="numero" class="swal2-input" placeholder="Número celular/telefone COM DDD">' +
                    'Data de Adição:<input type="date" id="data" class="swal2-input" placeholder="Data de Adição">',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('nome').value,
                        document.getElementById('numero').value,
                        document.getElementById('data').value
                    ]
                }
            })
            if (formValues4) {


                connection.connect();


                var x = document.getElementById('nome').value,
                    x2 = document.getElementById("numero").value,
                    x3 = document.getElementById("data").value;

                var sql = 'UPDATE `cliente` SET `nome`=?,`numero`=?,`data`=? WHERE CONCAT(cliente.`numero`)=?';
                x3 = x3.concat(" ", "00:00");
                console.log("upcli");
                connection.query(sql, [x, x2, x3, st], function(err, result) {
                    if (err) { error_alert(" ao atualizar cliente em update(4)"); throw err; }
                    console.log("Number of records updated: " + result.affectedRows);
                });



                connection.end();
                stwo();
                //$("#TableData1  tr").remove();
                console.log("bla");
                mostrar(1);


            }
            break;
        case 20:
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'sanduba',
                dateStrings: true,
                multipleStatements: true,
                database: 'aroma'


            });

            var oTable = document.getElementById('tablet');
            var oCells = oTable.rows.item(st + 1).cells;
            var Val1 = oCells.item(0).innerHTML;
            var Val2 = oCells.item(1).innerHTML;
            var Val3 = oCells.item(2).innerHTML.replace('R$ ', '');
            const { value: formValues20 } = await swal({
                title: 'Editar Atendimento',

                html: '<input id="nome" value="' + Val2 + '" class="swal2-input" placeholder="Nome">' +
                    '<input id="valor" value="' + Val3 + '" class="swal2-input" placeholder="Valor">' +
                    '<input type="radio" name="res" id="resp" value="#60BDFF">Ronaldo <input type="radio" id="resp" name="res" value="pink"  checked="checked"> Andreia<br></br>' +
                    '<input type="time" id="horario" value="' + Val1 + '" class="swal2-input" placeholder="Horário">',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('nome').value,
                        document.getElementById('valor').value,
                        document.getElementById('horario').value,
                        $('input[name="res"]:checked').val()
                    ]
                }
            })
            if (formValues20) {


                connection.connect();


                var x1 = document.getElementById('nome').value,
                    x2 = document.getElementById("valor").value;
                var x3 = document.getElementById("horario").value,
                    x4 = document.getElementById("responsavel").value;

                var sql = 'UPDATE `atendimento` SET `nome`=?,`valor`=?,`horario`=?, responsavel=? WHERE CONCAT(atendimento.`id`)=?';

                console.log("upati");
                connection.query(sql, [x1, x2, x3, x4, da], function(err, result) {
                    if (err) { error_alert(" ao atualizar atendimento em update(20)"); throw err; }
                    console.log("Number of records updated: " + result.affectedRows);
                });



                connection.end();
                stwo();

            }
            break;
        case 21:
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'sanduba',
                dateStrings: true,
                multipleStatements: true,
                database: 'aroma'


            });

            var oTable = document.getElementById('tablet2');
            var oCells = oTable.rows.item(st + 1).cells;
            var Val1 = oCells.item(0).innerHTML;
            var Val2 = oCells.item(1).innerHTML;
            var Val3 = oCells.item(2).innerHTML.replace('R$ ', '');

            const { value: formValues21 } = await swal({
                title: 'Editar Atendimento',

                html: '<input id="nome" value="' + Val2 + '" class="swal2-input" placeholder="Nome">' +
                    '<input id="valor" value="' + Val3 + '" class="swal2-input" placeholder="Valor">' +
                    '<input type="radio" name="res" id="resp" value="#60BDFF" checked="checked">Ronaldo <input type="radio" id="resp" name="res" value="pink"  > Andreia<br></br>' +
                    '<input type="time" id="horario" value="' + Val1 + '" class="swal2-input" placeholder="Horário">',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('nome').value,
                        document.getElementById('valor').value,
                        document.getElementById('horario').value,
                        $('input[name="res"]:checked').val()
                    ]
                }
            })
            if (formValues21) {


                connection.connect();


                var x1 = document.getElementById('nome').value,
                    x2 = document.getElementById("valor").value;
                var x3 = document.getElementById("horario").value,
                    x4 = document.getElementById("responsavel").value;

                var sql = 'UPDATE `atendimento` SET `nome`=?,`valor`=?,`horario`=?, responsavel=? WHERE CONCAT(atendimento.`id`)=?';

                console.log("upati");
                connection.query(sql, [x1, x2, x3, x4, da], function(err, result) {
                    if (err) { error_alert(' ao atualizar atendimento em update(21)'); throw err; }
                    console.log("Number of records updated: " + result.affectedRows);
                });



                connection.end();
                stwo();

            }


            break;



    }
    return;
}

function remove(st, op) {



    switch (op) {
        case 1:

            var sql;
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'sanduba',
                dateStrings: true,
                multipleStatements: true,
                database: 'aroma'


            });



            sql = `DELETE FROM atendimento WHERE CONCAT(atendimento.id) = ?`;

            connection.connect();
            connection.query(sql, [st], async function(err, result) {
                if (err) { error_alert(' ao excluir'); throw err; } else {
                    console.log("Number of records deleted: " + result.affectedRows + " d " + st);
                    swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Salvo Com Sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
            connection.end();
            stwo();
            break;

        case 3:

            var sql;
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'sanduba',
                dateStrings: true,
                multipleStatements: true,
                database: 'aroma'


            });



            sql = `DELETE FROM atividades WHERE CONCAT(atividades.cod_atividade) = ?`;

            connection.connect();
            connection.query(sql, [st], async function(err, result) {
                if (err) { error_alert(' ao excluir'); throw err; } else {
                    console.log("Number of records deleted: " + result.affectedRows + " d " + st);
                    swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Salvo Com Sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
            connection.end();
            stwo();

            break;

        case 4:
            var sql;
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'sanduba',
                dateStrings: true,
                multipleStatements: true,
                database: 'aroma'


            });



            sql = `DELETE FROM despesas WHERE CONCAT(despesas.cod_despesa) = ?`;

            connection.connect();
            connection.query(sql, [st], async function(err, result) {
                if (err) { error_alert(' ao excluir'); throw err; } else {
                    console.log("Number of records deleted: " + result.affectedRows + " d " + st);
                    swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Salvo Com Sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
            connection.end();
            stwo();
            //  $("#TableData3 tr").html("");
            //mostrar(3);


            break;
        case 5:
            var sql;
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'sanduba',
                dateStrings: true,
                multipleStatements: true,
                database: 'aroma'


            });

            sql = `DELETE FROM ficha_cliente WHERE CONCAT(ficha_cliente.ficha_a) = ?`;

            connection.connect();
            connection.query(sql, [st], async function(err, result) {
                if (err) { error_alert(' ao excluir'); throw err; } else {
                    console.log("Number of records deleted: " + result.affectedRows + " d " + st);
                    swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Salvo Com Sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
            connection.end();
            stwo();
            break;

        case 6:
            var sql;
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'sanduba',
                dateStrings: true,
                multipleStatements: true,
                database: 'aroma'
            });

            sql = `DELETE FROM cliente WHERE CONCAT(cliente.id) = ?`;

            connection.connect();
            connection.query(sql, [st], async function(err, result) {
                if (err) { error_alert(' ao excluir'); throw err; } else {
                    console.log("Number of records deleted: " + result.affectedRows + " d " + st);
                    swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Salvo Com Sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            });

            /*sql=`DELETE FROM atendimento WHERE CONCAT(atendimento.num)=? `;
            connection.query(sql,[st], function (err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows + " d "+ st);

            });*/

            sql = `DELETE FROM ficha_cliente WHERE CONCAT(ficha_cliente.id_cliente)=?`;


            connection.query(sql, [st], async function(err, result) {
                if (err) { error_alert(' ao excluir'); throw err; } else {
                    console.log("Number of records deleted: " + result.affectedRows + " d " + st);
                    swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Salvo Com Sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });

            connection.end();
            stwo();
            break;

        case 20:
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

            sql = `DELETE FROM atendimento WHERE CONCAT(atendimento.id)=? `;
            connection.query(sql, [st], async function(err, result) {
                if (err) { error_alert(' ao excluir'); throw err; } else {
                    console.log("Number of records deleted: " + result.affectedRows + " d " + st);
                    swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Salvo Com Sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });




            connection.end();
            stwo();
            break;

        case 21:
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

            sql = `DELETE FROM atendimento WHERE CONCAT(atendimento.id)=? `;
            connection.query(sql, [st], async function(err, result) {
                if (err) { error_alert(' ao excluir'); throw err; } else {
                    console.log("Number of records deleted: " + result.affectedRows + " d " + st);
                    swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Salvo Com Sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            });

            connection.end();
            stwo();
            break;

    }

    return;
}