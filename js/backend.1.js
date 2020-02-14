var swal = require('sweetalert2');
var mysql  = require('mysql');

async function aux(x8,de,x6,x2){
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password :'sanduba',
    dateStrings:true,
    multipleStatements: true,
    database : 'aroma'


  });
  //----------------------------
  connection.connect();


  var sql2 = 'UPDATE ficha_cliente SET `descricao`= ? WHERE `numero_cliente` = ? ';

  var tf=de.concat(`
`,x6," : ",x2);
  console.log(tf);
  values = [[x8,tf],[x8]];
  connection.query(sql2, [tf,x8], function (err, result) {
    if (err) throw err;
  });


}

async function save(num){

          var v1=$('#ficharea').val();
          var v2=$('#clientenome').val();
          var v3=$('#clientenumero').val();
          var v4=$('#clientedatan').val();
          var v5=moment($('#clientedata').val()).format("YYYY-MM-D HH:mm:ss");

          var v6=    $('#inputState').val();
          var v7=    $('#clientemedicacao').val();
          var v8=    $('#clienteprofissao').val();
          var v9=     $('#clientecidade').val();
          var v10=  $('#clientebairro').val();
          var v11=    $('#clienterua').val();
          var v12=    $('#clientenumero_end').val();
          var v13=    $('#clientenome_apartamento').val();
          var v14=    $('#clientenumero_apartamento').val();
          var v15=$('#clienteimg').attr('src');
          var v16=$('#clientecirurgia').val();
//console.log(v4+" "+v5);

  //console.log("SAVE"+String(str));
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password :'sanduba',
    dateStrings:true,
    multipleStatements: true,
    database : 'aroma'


  });
  //----------------------------
  connection.connect();

  sql = 'UPDATE ficha_cliente SET ficha_cliente.descricao= ?,ficha_cliente.numero_cliente=? WHERE CONCAT(ficha_cliente.`numero_cliente`)=? ';
  var tf=v1;

  connection.query(sql,[tf,v3,num],function (error, results, fields) {
  if (error) console.log(error.code);
  else {
    // console.log(results);
    console.log("Number of records inserted: (ficha) " + results.affectedRows);



  }
});
sql='UPDATE events SET num=?, title=? WHERE CONCAT(events.num)=?';
connection.query(sql,[v3,v2,num],function (error, results, fields) {
if (error) console.log(error.code);
else {
  // console.log(results);
  console.log("Number of records inserted: (events) " + results.affectedRows);



}
});

sql='UPDATE cliente SET image=?,nome=?,data=?,data_nascimento=?,cidade=?,bairro=?,rua=?,numero_end=?,numero=?,profissao=?,medicacao=?,nome_apartamento=?,numero_apartamento=?,estado_civil=?,cirurgia=? WHERE CONCAT(cliente.`numero`)=?';
connection.query(sql,[v15,v2,v5,v4,v9,v10,v11,v12,v3,v8,v7,v13,v14,v6,v16,num],function (error, results, fields) {
if (error) console.log(error.code);
else {

}
});

connection.end();
//stwo();

}


async function clean(num,op){
    console.log("REMOVE");
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password :'sanduba',
    dateStrings:true,
    multipleStatements: true,
    database : 'aroma'


  });
  //----------------------------
  connection.connect();

  sql = 'UPDATE ficha_cliente SET descricao= ? WHERE CONCAT(ficha_cliente.`numero_cliente`)=?';
  var tf=" ";
  connection.query(sql,[tf,num],function (error, results, fields) {
  if (error) console.log(error.code);
  else {
     //console.log(results);



  }
});

connection.end();
stwo();

}

async function increment(){

  const {value: name}=await swal({

    title: "Quem o Indicou?",//Event Title
    html:`<input type="text" id="name" placeholder="Nome ou digite 0"/>`,
    preConfirm: () => {

      return [
        document.getElementById('name').value

      ]
    }
    });if(name!="0"){


      var sql;
      var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password :'sanduba',
        dateStrings:true,
        multipleStatements: true,
        database : 'aroma'


      });
      //----------------------------
      //connection.connect();

      sql = 'SELECT numero,nome FROM cliente WHERE CONCAT(cliente.`nome`) LIKE ? AND CONCAT(cliente.`state_cadastro`)=1';
      var no=String(name).concat('%');
      //console.log(name+" "+no);
      connection.query(sql,[no],async function (error, results, fields) {
      if (error) console.log(error.code);
      else {


                  console.log(results);

                  var form= [],inputop=[];
                for(i=0;i<results.length;i++){
                  form.push({nome:results[i].nome, numero:results[i].numero});
                  inputop.push(results[i].nome);

               }
                console.log(inputop);


                const {value: number} = await  swal({

                    input: 'select',
                    title: 'Selecione o cliente correto',
                    inputOptions:inputop,
                    inputPlaceholder: 'Nome do cliente',
                    inputValidator: (value) => {
                      return new Promise((resolve) => {
                        if (value) {
                            resolve()
                        } else {
                          resolve('Voce precisa selecionar um nome:)')
                        }
                      })
                    }

                  });if(number){
                    var nc=form[number].numero;
                    //console.log(nc);
                        var connection = mysql.createConnection({
                          host     : 'localhost',
                          user     : 'root',
                          password :'sanduba',
                          dateStrings:true,
                          multipleStatements: true,
                          database : 'aroma'


                        });
                        //----------------------------
                        connection.connect();

                        var sql='UPDATE cliente SET indicacao=indicacao+1 WHERE CONCAT(cliente.`numero`)=?';
                        connection.query(sql,[nc],function (error, results, fields) {
                        if (error) console.log(error.code);
                        else {
                           //console.log(results);



                        }
                        });

                        connection.end();
                  }
      }
      });



    }



  return;
}

function setstate(num,q){
        var sql;
        var connection = mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password :'sanduba',
          dateStrings:true,
          multipleStatements: true,
          database : 'aroma'


        });

        connection.connect();

        sql = 'UPDATE cliente SET state_cadastro=? WHERE CONCAT(cliente.`numero`)=?';
        connection.query(sql,[q,num],function (error, results, fields) {
        if (error) console.log(error.code);
        else {



        }
      });


  return;
}

async function ficha(num,op){

//console.log(num);
  var sql;
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password :'sanduba',
    dateStrings:true,
    multipleStatements: true,
    database : 'aroma'


  });
  //----------------------------
  connection.connect();
   //console.log(num);
  sql = 'SELECT cliente.`cirurgia`,ficha_cliente.`descricao` ,cliente.`state_cadastro`, cliente.`image`,cliente.`nome`,cliente.`indicacao`, cliente.`numero`,cliente.`data` as data_cli,cliente.`nome_apartamento`,cliente.`data_nascimento`,cliente.`numero_apartamento`,cliente.`profissao`,cliente.`estado_civil`,cliente.`medicacao`,cliente.`cidade`,cliente.`bairro`,cliente.`rua`,cliente.`numero_end` ,ficha_cliente.data FROM `cliente`,ficha_cliente WHERE cliente.`numero`=? AND cliente.`numero`=ficha_cliente.`numero_cliente`';
  connection.query(sql,[num],function (error, results, fields) {
  if (error) console.log(error.code);
  else {
     //console.log(results);

       if(results){
         if(results[0].indicacao!=null){
     $('#clienteindicacao').val(results[0].indicacao);
   }
     if(results[0].descricao!=null){
     $('#ficharea').val(results[0].descricao);
   } if(results[0].nome!=null){
     $('#clientenome').val(results[0].nome);
   }if(results[0].numero!=null){
     $('#clientenumero').val(results[0].numero);
   }if(results[0].data_nascimento!=null){
     $('#clientedatan').val(results[0].data_nascimento);
   }  if(results[0].data_cli!=null){
      var xd=moment(results[0].data_cli).format("YYYY-MM-D");
     //console.log(results[0].data_nascimento+" - "+xd);
     $('#clientedata').val(xd);
   } if(results[0].estado_civil!=null){
     $('#inputState').val(results[0].estado_civil);
   }else{
     $('#inputState').val("Solteiro");

   }if(results[0].medicacao!=null){
     $('#clientemedicacao').val(results[0].medicacao);
   }if(results[0].profissao!=null){
     $('#clienteprofissao').val(results[0].profissao);
   }if(results[0].cidade!=null){
     $('#clientecidade').val(results[0].cidade);
   }if(results[0].bairro!=null){
     $('#clientebairro').val(results[0].bairro);
   }if(results[0].rua!=null){
     $('#clienterua').val(results[0].rua);
   }if(results[0].numero_end!=null){
     $('#clientenumero_end').val(results[0].numero_end);
   }if(results[0].nome_apartamento!=null){
     $('#clientenome_apartamento').val(results[0].nome_apartamento);
   }if(results[0].numero_apartamento!=null){
     $('#clientenumero_apartamento').val(results[0].numero_apartamento);
   }if(results[0].image!=null){
     $('#clienteimg').attr('src',results[0].image);

   }if(results[0].cirurgia!=null){
     $('#clientecirurgia').val(results[0].cirurgia);
   }

     //const $ = content.querySelector.bind(content);
     const bu1 = $('#buts1');
     const bu2 = $('#buts2');
     const bu3 = $('#buts3');
     const bu4 = $('#buts4');
     //const fich = $('#fi');
     bu3.click(async function(){
        setindica(results[0].numero,0);
     });


     bu4.click(async function(){

         const {value: ui}=await swal({

           title: "Tirar foto",//Event Title
           html:`<div id="camdemo" style="width: 320px; height: 240px; text-align: center; margin: 0 auto;"></div>
<br>
<div style="text-align:center;">
    <input type="button" class="btn btn-info" id="start" value="Ligar/Desligar câmera"/>
     <a id="test"></a>
    <input type="button" class="btn btn-success" id="savefile" value="Salvar foto"/>
    <input type=button class="btn btn-primary" value="Tirar foto" id="take"/>
    	<div id="resulttitle"></div>
	<div id="results" ></div>

</div>`,
             onBeforeOpen: () =>{
             const content = swal.getContent();
             const $ = content.querySelector.bind(content);

             const start = $('#start');
             const take = $('#take');
             const savefile = $('#savefile');
              var enabled = false;
              var uil;
              var WebCamera = require("webcamjs");
             start.addEventListener('click', () => {

               // Use require to add webcamjs


                 //console.log("asd");
                if(!enabled){ // Start the camera !
                  enabled = true;
                  WebCamera.attach('#camdemo');
                  console.log("The camera has been started");
                }else{ // Disable the camera !
                  enabled = false;
                  WebCamera.reset();
                 console.log("The camera has been disabled");
                }
            });
                      //var ui;
                    take.addEventListener('click', () => {

                          // play sound effect


                          // take snapshot and get image data
                          WebCamera.snap( function(data_uri) {
                            uil=data_uri;

document.getElementById('resulttitle').innerHTML='<h2>Foto Tirada:</h2><br>';
                          // display results in page
				//
                          document.getElementById('results').innerHTML =
                           '<img id="imageprev" src="'+data_uri+'"/>';
                          } );

                          WebCamera.reset();

                    });
                        savefile.addEventListener('click', () => {
                          //op=1;
                          //console.log(ui);
                          //

                    });


          }, preConfirm: () => {
             return [
               document.getElementById('imageprev').getAttribute('src')

             ]
           }
     });
            //console.log(ui);
        $('#clienteimg').attr("src",ui);
   });



     bu1.click(function(){
       //remove(moment(calEvent.start).format("YYYY-MM-D h:mm:ss"),1);
         //remove(eventObj.id,1);
         save(results[0].numero);

     });

     bu2.click(function(){
       //remove(moment(calEvent.start).format("YYYY-MM-D h:mm:ss"),1);
         //remove(eventObj.id,1);
         clean(results[0].numero,1);
         $('#ficharea').val(" ");
     });
        //$("#buts").empty();
        if(results[0].state_cadastro==0){

            increment();
            setstate(results[0].numero,1);


        }


       show('t5','l5');

   }

  }
  });
  connection.end();



  return;
}

function setindica(cli,ni){
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password :'sanduba',
    dateStrings:true,
    multipleStatements: true,
    database : 'aroma'


  });
  //----------------------------
  connection.connect();

  var sql='UPDATE cliente SET indicacao=? WHERE CONCAT(cliente.`numero`)=?';
  connection.query(sql,[ni,cli],function (error, results, fields) {
  if (error) console.log(error.code);
  else {
     //console.log(results);



  }
  });
    connection.end();

  return;
}

async function mostrar(op){
  switch(op){
  //clientes
      case 1:{
          var sql;
          var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password :'sanduba',
            dateStrings:true,
            multipleStatements: true,
            database : 'aroma'


          });
  //----------------------------
            connection.connect();

            sql = 'SELECT `nome`, `CPF`, `numero`,`data` FROM `cliente` WHERE CONCAT(cliente.`state_cadastro`)=1';
            connection.query(sql, function (error, results, fields) {
            if (error) console.log(error.code);
            else {
                //console.log(results);
                //console.log('len: '+ results.length);

              var len = results.length,i;

              for (i = 0; i < len; i++){
              $("#TableData1").append(`<tr><td class="clientename">`+results[i].nome+`</td><td>`+
                results[i].numero+`</td><td>`+results[i].data+
              `</td><td><span style="display:inline-block; width: 10px;"></span>`+
              `<button type="button" class="btn btn-danger btn-exc" onclick="remove(`+results[i].numero+`,6);">Excluir</button>`+
              `<span style="display:inline-block; width: 10px;"></span></td><td><span style="display:inline-block; width: 10px;"></span>`+
              `<button type="button" class="btn btn-success" onclick="ficha(`+results[i].numero+`,1);">Ver ficha</button></td><tr>`);
              }


              }
              });
            connection.end();
      break;}
  //empregados----------------------------------
      case 2:{

  var sql;
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password :'sanduba',
    dateStrings:true,
    multipleStatements: true,
    database : 'aroma'


  });

  connection.connect();

          sql = 'SELECT*FROM `atividades`';
          connection.query(sql, function (error, results, fields) {
          if (error) console.log(error.code);
          else {
              //console.log(results);
              //console.log('len: '+ results.length);

              var len = results.length,i;

              for (i = 0; i < len; i++){
              $("#TableData2").append("<tr><td>"+results[i].nome_ati+"</td><td>"+results[i].valor+"</td><td>"+results[i].data+"</td><td>"+'<button type="button" class="btn btn-danger btn-exc" onclick="remove('+results[i].cod_atividade+',3);">Excluir</button><span style="display:inline-block; width: 10px;"></span><button type="button" class="btn btn-info btn-ati " onclick="update(`2018-12-13`,'+results[i].cod_atividade+',3);">Editar</button></td></tr>');
              }

          }
          });
          connection.end();



    break; }
  //produtos
      case 3:{

      var sql;
      var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password :'sanduba',
        dateStrings:true,
        multipleStatements: true,
        database : 'aroma'


      });

      connection.connect();

      sql = 'SELECT*FROM `despesas`';
      connection.query(sql, function (error, results, fields) {
      if (error) console.log(error.code);
      else {
          //console.log(results);
          //console.log('len: '+ results.length);

          var len = results.length,i;

          for (i = 0; i < len; i++){
          $("#TableData3").append("<tr><td>"+results[i].descricao+"</td><td>R$"+results[i].valor+"</td><td>"+results[i].data+"</td><td>"+results[i].prazo+"</td><td>"+'<button type="button" class="btn btn-danger btn-exc" onclick="remove('+results[i].cod_despesa+',4);">Excluir</button></td></tr>');
          }

      }
      });
      connection.end();


      break;}
  //reservas
      case 4:{

      var sql;
      var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password :'sanduba',
        dateStrings:true,
        multipleStatements: true,
        database : 'aroma'


      });

      var connection2 = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password :'sanduba',
        dateStrings:true,
        multipleStatements: true,
        database : 'aroma'


      });


                  connection.connect();
                sql='SELECT cliente.`nome`,cliente.numero, ficha_cliente.descricao,ficha_cliente.data FROM `cliente`,ficha_cliente WHERE cliente.`numero`=ficha_cliente.numero_cliente';
                //  console.log(form[i].numero_cliente);
                  //var na=form[i].numero_cliente;
                  connection.query(sql,function (error, results, fields) {
                    if (error) console.log(error.code);
                    else {
                        console.log(results);


                        var len = results.length;

                        for (i = 0; i < len; i++){

                $("#TableData4").append("<tr><td>"+results[i].nome+"</td><td>"+results[i].data+"</td><td>"+results[i].descricao+"</td><td>"+'<button type="button" class="btn btn-danger btn-exc" onclick="remove('+results[i].ficha_a+',5);">Excluir</button><span style="display:inline-block; width: 10px;"></span><button type="button" class="btn btn-info " onclick="update('+results[i].ficha_a+',5);"><span class="glyphicon ">✎</span></button></td></tr>');
                }

              }
                });
                connection.end();


      break;}
      case 14:{
                var sql;
                var connection = mysql.createConnection({
                  host     : 'localhost',
                  user     : 'root',
                  password :'sanduba',
                  dateStrings:true,
                  multipleStatements: true,
                  database : 'aroma'


                });

                connection.connect();

                sql = 'SELECT cliente.nome,cliente.numero FROM `cliente` WHERE CONCAT(cliente.`state_cadastro`)=?';
                connection.query(sql,[0],function (error, results, fields) {
                if (error) console.log(error.code);
                else {
                    //console.log(results);
                    //console.log('len: '+ results.length);

                    var len = results.length,i;

                    for (i = 0; i < len; i++){
                    $("#TableData14").append("<tr><td>"+results[i].nome+
                `</td><td><button type="button" class="btn btn-danger btn-exc" onclick="remove(`+results[i].numero+`,6);">Excluir</button>`+
                `</td><td><button type="button" class="btn btn-success" onclick="ficha(`+results[i].numero+`,1);">Ver ficha</button></td><tr>`);
              }
            }
                });
                connection.end();


      break;}
      case 15:{

                var sql;
                var connection = mysql.createConnection({
                  host     : 'localhost',
                  user     : 'root',
                  password :'sanduba',
                  dateStrings:true,
                  multipleStatements: true,
                  database : 'aroma'


                });

                connection.connect();

                sql = 'SELECT cliente.nome,cliente.numero,cliente.indicacao FROM `cliente` WHERE CONCAT(cliente.`indicacao`)>=? ORDER BY cliente.indicacao DESC';
                connection.query(sql,[1],function (error, results, fields) {//NUMERO DE INDICAÇÃO INDICACAO
                if (error) console.log(error.code);
                else {
                    //console.log(results);
                    //console.log('len: '+ results.length);

                    var len = results.length,i;

                    for (i = 0; i < len; i++){
                    $("#TableData15").append("<tr><td>"+results[i].nome+
                `</td><td>`+results[i].numero+`</td><td>`+results[i].indicacao+`</td><td><button type="button" class="btn btn-danger btn-ada" onclick="setindica(`+results[i].numero+`,0);">Zerar</button>`);
                  }
            }
                });
                connection.end();


      break;}
      case 20:{


        var sql;
        var connection = mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password :'sanduba',
          dateStrings:true,
          multipleStatements: true,
          database : 'aroma'


        });

        connection.connect();

        sql = 'SELECT atendimento.nome,atendimento.numero,atendimento.valor,atendimento.data,atendimento.horario FROM `atendimento` WHERE CONCAT(atendimento.`data`)>= ORDER BY cliente.indicacao DESC';
        connection.query(sql,[1],function (error, results, fields) {//NUMERO DE INDICAÇÃO INDICACAO
        if (error) console.log(error.code);
        else {
            console.log(results);
            //console.log('len: '+ results.length);

            var len = results.length,i;

            for (i = 0; i < len; i++){
            $("#TableDataAtendimento").append("<tr><td>"+results[i].horario+
        `</td><td>`+results[i].nome+`</td><td>`+results[i].valor+`</td><td><button type="button" class="btn btn-danger btn-ada" onclick="delAtendi();"></button>`);
          }
    }
        });
        connection.end();









        break;
      }

  }

//console.log("ASD");

return;
}
async function add(op){

//console.log("ASD");


switch (op) {
  case 1:



      const {value: formValues} = await swal({
        title: 'Adicionar ',
        html:
          '<input id="procedimento" class="swal2-input" placeholder="Procedimento">'+
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
        host     : 'localhost',
        user     : 'root',
        password :'sanduba',
        dateStrings:true,
        multipleStatements: true,
        database : 'aroma'


      });

      connection.connect();


      var sql = "INSERT INTO atividades(nome_ati, valor, data) VALUES ?";
      var x=document.getElementById("procedimento").value,x2=document.getElementById("valor").value,x10=new Date();
      x10=moment(x10).format("YYYY-MM-D HH:mm:ss");
      //console.log(x10);
        var values =[[x,x2,x10]];
      connection.query(sql,[values] , function (err, result) {
        if (err) throw err;
        //console.log("Number of records inserted: " + result.affectedRows);
      });

      connection.end();
      stwo();
    }

    break;
  case 2:

  const {value: formValues2} = await swal({
    title: 'Adicionar Cliente',
    html:
      '<input id="nome" class="swal2-input" placeholder="Nome">'+
      '<input id="numero" class="swal2-input" placeholder="Número(celular/telefone) COM DDD">',

        focusConfirm: false,
    preConfirm: () => {
      return [

        document.getElementById('numero').value,
        document.getElementById('nome').value,


      ]
    }
  })
  if (formValues2) {

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password :'sanduba',
    dateStrings:true,
    multipleStatements: true,
    database : 'aroma'


  });

  connection.connect();


  var sql = "INSERT INTO cliente(numero,nome,data) VALUES ?";
  var x=document.getElementById("numero").value,x2=document.getElementById("nome").value,x10=new Date();
  x10=moment(x10).format("YYYY-MM-D HH:mm:ss");
  //console.log(x10);

  var values =[[x,x2,x10]];

  connection.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });


            sql = 'INSERT INTO ficha_cliente(`numero_cliente`,`descricao`)  SELECT  ?,?    WHERE   NOT EXISTS  (   SELECT  1 FROM    ficha_cliente    WHERE   `numero_cliente` = ? )';


            var tf=" ";

            //values = [[x,tf],[x]];
            connection.query(sql, [x,tf,x], function (err, result) {
              if (err) throw err;
              //console.log("AWEEEE2");
              //console.log("Number of records inserted: " + result.affectedRows);
            });

  connection.end();
  stwo();
}
      break;
  case 3:

              const {value: formValues3} = await swal({
                title: 'Adicionar ',
                html:
                  '<input id="descricao" class="swal2-input" placeholder="Descrição da despesa">'+
                  '<input id="valor" class="swal2-input" placeholder="Valor">'+
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
                host     : 'localhost',
                user     : 'root',
                password :'sanduba',
                dateStrings:true,
                multipleStatements: true,
                database : 'aroma'


              });

              connection.connect();


              var sql = "INSERT INTO despesas(descricao, valor,prazo,data) VALUES ?";
              var x=document.getElementById("descricao").value,x2=document.getElementById("valor").value,x3=document.getElementById("prazo").value,x10=new Date();
              x10=moment(x10).format("YYYY-MM-D HH:mm:ss");
              //console.log(x10);
              x3=x3.concat(" ","00:00");
                var values =[[x,x2,x3,x10]];
              connection.query(sql,[values] , function (err, result) {
                if (err) throw err;
                //console.log("Number of records inserted: " + result.affectedRows);
              });

              connection.end();
                  stwo();
            }

        break;
  case 4:



                      const {value: na} = await swal({
                    title: 'Digite o Nome do Cliente',
                    input: 'text',
                    //inputValue: inputValue,
                    showCancelButton: true,
                    inputValidator: (value) => {
                    return !value && 'You need to write something!'
                    }
                  })
                  if(na){

                  var connection = mysql.createConnection({
                    host     : 'localhost',
                    user     : 'root',
                    password :'sanduba',
                    dateStrings:true,
                    multipleStatements: true,
                    database : 'aroma'


                  });

                  connection.connect();

                  sql = 'SELECT `numero`,`nome` FROM `cliente` WHERE CONCAT(cliente.`nome`) LIKE ? ';
                  var na2=na.concat("%");
                  connection.query(sql,[na2],async function (error, results, fields) {
                   if (error) console.log(error.code);
                   else {

                      // console.log(results[0].nome);
                       //console.log('len: '+ results.length);
                       var i=0;
                       function formt(nome,numero) {

                              this.nome = nome;
                              this.numero = numero;

                          }
                        var form= [],inputop=[];
                      for(i=0;i<results.length;i++){
                        form.push({nome:results[i].nome, numero:results[i].numero});
                        inputop.push(results[i].nome);

                     }
                      //console.log(inputop);



                       const {value: number} = await swal({
                          title: 'Selecione o cliente',
                          input: 'select',
                          inputOptions:inputop,
                          inputPlaceholder: 'Nome completo',
                          showCancelButton: true,
                          inputValidator: (value) => {
                            return new Promise((resolve) => {
                              if (value) {
                                //console.log("TESTAND: "+inputop.findIndex(item => item.name === value));
                                  //value=inputop.findIndex(item => item.name === value);
                                resolve()
                              } else {
                                resolve('Voce precisa selecionar um nome:)')
                              }
                            })
                          }
                        })



                        var nc=form[number].numero;
                          //console.log("FI: "+nc);
                const {value: formValues4} = await swal({
                  title: 'Adicionar Ficha',
                  html:


                    '<input id="descricao" class="swal2-input" placeholder="Descrição">',
                      focusConfirm: false,
                  preConfirm: () => {
                    return [



                      document.getElementById('descricao').value


                    ]
                  }
                })
                if (formValues4) {

                var connection = mysql.createConnection({
                  host     : 'localhost',
                  user     : 'root',
                  password :'sanduba',
                  dateStrings:true,
                  multipleStatements: true,
                  database : 'aroma'


                });

                connection.connect();


                var sql = "INSERT INTO ficha_cliente(numero_cliente,descricao,data) VALUES ?";
                var x=document.getElementById("descricao").value,x10=new Date();
                x10=moment(x10).format("YYYY-MM-D HH:mm:ss");
              //  console.log(x10);

                  var values =[[nc,x,x10]];
                connection.query(sql,[values] , function (err, result) {
                  if (err) throw err;
                  console.log("Number of records inserted: " + result.affectedRows);
                });

                connection.end();
                  stwo();
              }

          }
        });
      }
        break;
    case 5:


              break;

    case 6:



          break;



}



return;
}

async function update(da,st,op){



  //console.log("baa: "+op);

  switch (op) {
    //EVENTS
    case 1:

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password :'sanduba',
    dateStrings:true,
    multipleStatements: true,
    database : 'aroma'


  });

  connection.connect();
   var form=[];
   var tit="";
  sql = 'SELECT `title`,`description` FROM `events` WHERE CONCAT(events.`id`)=? ';
  connection.query(sql,[st],async function (error, results, fields) {
   if (error) console.log(error.code);
   else {

       console.log(results[0].title);
       console.log('len: '+ results.length);
       var va="",i=0;


         while(results[0].title.charAt(i)!=" " && i<results[0].title.length){
         tit=tit.concat(results[0].title.charAt(i));
         i++;
         }
         while(i<results[0].title.length){
           va=va.concat(results[0].title.charAt(i));
           i++;
         }
         console.log("ti: "+tit+" va: "+va);
        form={title:tit, description:results[0].description, color:results[0].color,valor:va,
        starth:moment(results[0].start).format("HH:mm:ss"), endh:moment(results[0].end).format("HH:mm:ss")};
        //var ti,d,c,s,e;
}
});
    const {value: ti} = await swal({
      title: 'Editar Nome',
      input:'text',
      inputValue:tit,





    })
    const {value: d} = await swal({
      title: 'Editar Procedimento',
      input:'text',
      inputValue:form.description,




    })
    const {value: v} = await swal({
      title: 'Editar Valor',
      input:'text',
      inputValue:form.valor,




    })


const {value: c} = await swal({
  title: 'Responsável:',
  html:
  '<input type="radio" name="res" id="resp" value="#60BDFF">Ronaldo <input type="radio" id="resp" name="res" value="pink"> Andreia<br>',
  focusConfirm: false,
  preConfirm: () => {
    return [
      $('input[name="res"]:checked').val(),
      //document.getElementById('resp').value,


    ]
  }
})

const {value: s} = await swal({
  title: 'Horário de inicio',
  html:
    '<input type="time" id="horarioi" class="swal2-input" placeholder="horário de inicio">',
    focusConfirm: false,
  preConfirm: () => {
    return [

      document.getElementById('horarioi').value,


    ]
  }
})


const {value: e} = await swal({
  title: 'Horário de término:',
  html:
    '<input type="time" id="horariot" class="swal2-input" placeholder="horário de término">',
    focusConfirm: false,
  preConfirm: () => {
    return [

      document.getElementById('horariot').value,


    ]
  }
})
    form.title=ti;
    form.description=d;
    form.valor=v;

    form.color=c;
    console.log(c+"TTT: "+form.color);
    form.starth=s;
    form.endh=e;
    if (form) {




    var x5="green",x=form.title,x11=form.valor,x2=form.description,x3=form.starth,x4=form.endh;
    var date=new Date(da);
    var day = date.getDate(); //Date of the month: 2 in our example
    var month = date.getMonth()+1; //Month of the Year: 0-based index, so 1 in our example
    var year = date.getFullYear(); //Year: 2013
    year=year.toString();
    month=month.toString();
    day=day.toString();
    console.log("month: "+month);

    var x6=year.concat("-",month,"-",day," ",x3);
    var x7=year.concat("-",month,"-",day," ",x4);
    x5=form.color;
    x=x.concat("   R$:",x11," ");
    console.log(x6+" x7: "+x7);

      console.log("Connected! resp: "+ x5 +" da: "+x6);
      var sql =  'UPDATE `events` SET `title`=?,`start`=?,`end`=?,`color`=?,`description`=? WHERE CONCAT(events.`id`)=?';
      var values = [[x,x6,x7,x5,x2,st]];
      connection.query(sql,[x,x6,x7,x5,x2,st], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });





     }




connection.end();
//stwo();
   break;
//atividades
     case 3:

     var connection = mysql.createConnection({
       host     : 'localhost',
       user     : 'root',
       password :'sanduba',
       dateStrings:true,
       multipleStatements: true,
       database : 'aroma'


     });


     const {value: formValues2} = await swal({
       title: 'Editar Atividade',

       html:
         '<input id="nome" class="swal2-input" placeholder="Nome">' +
         '<input id="preco" class="swal2-input" placeholder="Preço">'+
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


       var x=document.getElementById('nome').value,x2=document.getElementById("preco").value,x3=convertDigitIn(document.getElementById("data").value);

         var sql = 'UPDATE `atividades` SET `nome_ati`=?,`valor`=?,`data`=? WHERE CONCAT(atividades.`cod_atividade`)=?';
         x3=x3.concat(" ","00:00");
         console.log("upati");
     connection.query(sql,[x,x2,x3,st], function (err, result) {
           if (err) throw err;
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
       host     : 'localhost',
       user     : 'root',
       password :'sanduba',
       dateStrings:true,
       multipleStatements: true,
       database : 'aroma'


     });


     const {value: formValues4} = await swal({
       title: 'Editar Cliente',
       html:
         '<input id="nome" class="swal2-input" placeholder="Nome">' +
         '<input id="numero" class="swal2-input" placeholder="Número celular/telefone COM DDD">'+
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


       var x=document.getElementById('nome').value,x2=document.getElementById("numero").value,x3=document.getElementById("data").value;

         var sql = 'UPDATE `cliente` SET `nome`=?,`numero`=?,`data`=? WHERE CONCAT(cliente.`numero`)=?';
         x3=x3.concat(" ","00:00");
         console.log("upcli");
     connection.query(sql,[x,x2,x3,st], function (err, result) {
           if (err) throw err;
           console.log("Number of records updated: " + result.affectedRows);
         });



         connection.end();
         stwo();
   //$("#TableData1  tr").remove();
   console.log("bla");
   mostrar(1);



     break;


 }

}
  return;
}

function remove(st,op){



  switch (op) {
    case 1:

            var sql;
            var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password :'sanduba',
              dateStrings:true,
              multipleStatements: true,
              database : 'aroma'


            });



          sql=`DELETE FROM events WHERE CONCAT(events.id) = ?`;

        connection.connect();
        connection.query(sql,[st], function (err, result) {
          if (err) throw err;
          console.log("Number of records deleted: " + result.affectedRows + " d "+ st);
        });
        connection.end();
        //stwo();
        break;

    case 3:

                  var sql;
                  var connection = mysql.createConnection({
                    host     : 'localhost',
                    user     : 'root',
                    password :'sanduba',
                    dateStrings:true,
                    multipleStatements: true,
                    database : 'aroma'


                  });



                sql=`DELETE FROM atividades WHERE CONCAT(atividades.cod_atividade) = ?`;

              connection.connect();
              connection.query(sql,[st], function (err, result) {
                if (err) throw err;
                console.log("Number of records deleted: " + result.affectedRows + " d "+ st);
              });
              connection.end();
              stwo();

    break;

        case 4:
                var sql;
                var connection = mysql.createConnection({
                  host     : 'localhost',
                  user     : 'root',
                  password :'sanduba',
                  dateStrings:true,
                  multipleStatements: true,
                  database : 'aroma'


                      });



                    sql=`DELETE FROM despesas WHERE CONCAT(despesas.cod_despesa) = ?`;

                    connection.connect();
                    connection.query(sql,[st], function (err, result) {
                    if (err) throw err;
                    console.log("Number of records deleted: " + result.affectedRows + " d "+ st);
                    });
                    connection.end();
                    stwo();
                  //  $("#TableData3 tr").html("");
                    //mostrar(3);


        break;
        case 5:
                var sql;
                var connection = mysql.createConnection({
                  host     : 'localhost',
                  user     : 'root',
                  password :'sanduba',
                  dateStrings:true,
                  multipleStatements: true,
                  database : 'aroma'


                      });

                    sql=`DELETE FROM ficha_cliente WHERE CONCAT(ficha_cliente.ficha_a) = ?`;

                    connection.connect();
                    connection.query(sql,[st], function (err, result) {
                    if (err) throw err;
                    console.log("Number of records deleted: " + result.affectedRows + " d "+ st);
                    });
                    connection.end();
                    stwo();
        break;

        case 6:
                var sql;
                var connection = mysql.createConnection({
                  host     : 'localhost',
                  user     : 'root',
                  password :'sanduba',
                  dateStrings:true,
                  multipleStatements: true,
                  database : 'aroma'


                      });

                    sql=`DELETE FROM cliente WHERE CONCAT(cliente.numero) = ?`;

                    connection.connect();
                    connection.query(sql,[st], function (err, result) {
                    if (err) throw err;
                    console.log("Number of records deleted: " + result.affectedRows + " d "+ st);

                    });

                    sql=`DELETE FROM events WHERE CONCAT(events.num)=? `;
                    connection.query(sql,[st], function (err, result) {
                    if (err) throw err;
                    console.log("Number of records deleted: " + result.affectedRows + " d "+ st);

                    });

                    sql=`DELETE FROM ficha_cliente WHERE CONCAT(ficha_cliente.numero_cliente)=?`;


                    connection.query(sql,[st], function (err, result) {
                    if (err) throw err;
                    console.log("Number of records deleted: " + result.affectedRows + " d "+ st);

                    });


                    connection.end();
                    stwo();
        break;

  }

  return;
}
