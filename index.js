
$(document).ready(function(){
  const Url = 'https://api.webadvantage.online/api/history/get/';
  const Store = require('electron-store');
  const store = new Store({name : 'config', encryptionKey: 'advantagecontrols'});

  $('#Username').val(store.get('username'));
  $('#Password').val(store.get('password'));
  $('#RememberMe').prop("checked", store.get('rememberMe'));

  $('#FormSubmitButton').click(function(){

    var username = $('#Username').val();
    var password = $('#Password').val();
    var serial = $('#Serial').val();
    var historyType = $('#HistoryType').val();
    var startDate = $('#StartYear').val() + "-" + $('#StartMonth').val() + "-" + $('#StartDay').val() + " 00:00:00";
    var endDate = $('#EndYear').val() + "-" + $('#EndMonth').val() + "-" + $('#EndDay').val() + " 23:59:59";

    if ($('#RememberMe').prop('checked') == true) {
      store.set('username', username);
      store.set('password', password);
      store.set('rememberMe', true);
    } else {
      store.delete('username');
      store.delete('password');
      store.delete('rememberMe');
    }


    var Data = {
      "username": username,
      "password": password,
      "serial_number": serial,
      "history_types":[
        historyType
      ],
      "date_range": {
        "start": startDate,
        "end": endDate
      }
    };


    console.log(JSON.stringify(Data));

    $.post(Url, JSON.stringify(Data), function(data, status){
      var results = JSON.stringify(data, null, "\t");
      $('#ResultsTextArea').val(results);


      console.log("here");
    })



  })
})
