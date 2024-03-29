google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Frequency', 'Percentage'],
    ['Rarely',     35.3],
    ['Very Often',      35.3],
    ['Sometimes',  17.6],
    ['Often', 35.3],
    
  ]);

  var options = {
    title: 'How often do you travel solo?',
    titleTextStyle: {color: '#777777' , fontName: 'Open Sans'},
    pieHole: 0.4,
    colors: ["#EED2FA", "#A896C7", "#75508F", "#C099C5"],
    pieSliceTextStyle : {color: "black"},
  };

  var chart1 = new google.visualization.PieChart(document.getElementById('piechart1'));
  chart1.draw(data, options);  
  
  
  
  
          data = google.visualization.arrayToDataTable([
    ['Answer', 'Percentage'],
    ['Maybe',     12.5],
    ['Yes',      86.5],
    ['No',  1],         
    
  ]);
  
   var options = {
    title: 'Would it help to know info about travel places women should avoid?',
    titleTextStyle: {color: '#777777' , fontName: 'Open Sans'},
    pieHole: 0.4,
    colors: ["#EED2FA", "#A896C7", "#75508F", "#C099C5"],
    pieSliceTextStyle : {color: "black"},
    
  };
  
  var chart2 = new google.visualization.PieChart(document.getElementById('piechart2'));
  chart2.draw(data, options);
  
  
  
  data = google.visualization.arrayToDataTable([
    ['Answer', 'Percentage'],
    ['Maybe',     37.5],
    ['Yes',      56.3],
    ['No',  6.3],         
    
  ]);
  
   var options = {
    title: 'Do you ever wish you had a companion/buddy while traveling solo?',
    titleTextStyle: {color: '#777777' , fontName: 'Open Sans'},
    pieHole: 0.4,
    colors: ["#EED2FA", "#A896C7", "#75508F", "#C099C5"],
    pieSliceTextStyle : {color: "black"},
  };
  
  
  

          var chart3 = new google.visualization.PieChart(document.getElementById('piechart3'));
  chart3.draw(data, options);
}