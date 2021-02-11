console.log('script works');
document.querySelector('#write'). addEventListener('click', e =>{
  e.preventDefault();
  console.log('click works');
  document.querySelector('#Table').innerHTML = 'Table changes';
  document.querySelector('#Temperature').innerHTML = 'Temperature change';
  document.querySelector('#Humidity').innerHTML = 'Humidity changes';
});


      google.charts.load('current', {'packages':['corechart']});

      google.charts.setOnLoadCallback(drawChart);

    var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
    };


      function drawChart() 
  {
    getJSON('https://func-weather.azurewebsites.net/api/HttpTriggerCSharp2?code=03Hf14xSawGyeGtfxZTCLJ5mGLx0GGusap2f3zssPqg6n3KriqizHg==&deviceId=2d003b001847393035313137&amount=10', function(err, data){
      let dataTable =  '<Table border=3><tr><td>Pvm</td><td>Temperature</td><td>Humidity</td></tr>';

       var dataTemp = new google.visualization.DataTable();
        dataTemp.addColumn('string', 'Pvm');
        dataTemp.addColumn('number', 'celsius');

         var dataHum = new google.visualization.DataTable();
        dataHum.addColumn('string', 'Pvm');
        dataHum.addColumn('number', 'precipitate');

      const dataVoid = data.map(function(measurement){
        dataTable = dataTable + `<tr><td>${(measurement.Timestamp).split('T')[1].split('.')[0]}</td><td>${measurement.Temp}</td><td>${measurement.Hum}</td></tr>`;

        dataTemp.addRows([
          [(measurement.Timestamp).split('T')[1].split('.')[0], parseInt(measurement.Temp)]
        ]);
         dataHum.addRows
        ([
          [(measurement.Timestamp).split('T')[1].split('.')[0], parseInt(measurement.Hum)]
        ]);
        
        //datatable
      document.querySelector('#Table').innerHTML = '<Table><tr><td>Temperature</td><td>Humidity</td></tr><tr><td>24</td><td>19</td></tr><Table>';

      });

      dataTable = dataTable + '</Table>';
      document.querySelector('#Table').innerHTML = dataTable;

      var options = {'title':'Temperature',
      'width':1200,
      'height':200};

      var chart = new google.visualization.LineChart(document.getElementById('Temperature'));
        chart.draw(dataTemp, options);

      var options_dity = {'title':'Humidity',
                       'width':1200,
                       'height':200};

        var chart_dity = new google.visualization.ColumnChart(document.getElementById('Humidity'));
        chart_dity.draw(dataHum, options_dity);

    });
   
  }