
var gmaps = 
{
  ConvertedCoordinates:[],
  
  map:{},
  initMap:function() 
  {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:15,lng:0},//{lat: -34.397, lng: 150.644},
      zoom: 3
    });
  },
  
 geocodeAddress:function(mails) {
    var geocoder = new google.maps.Geocoder();
    console.log(mails);
      for(var i=0; i < mails.length; i++)
      {
          gmaps.startgeocoding(mails[i],geocoder);
      }
  },
  
  startgeocoding:function(currentmail,geocoder)
  {
    //console.log(currentmail);
      var currentlabel = currentmail.label;
      var currentsubject = currentmail.subject;
      var currentsnippet = currentmail.snippet;
      var adress = currentlabel;
      
      var newadress = adress.replace("Location:","");
      geocoder.geocode({'address': newadress},
      function(results, status) 
      {
          if (status === google.maps.GeocoderStatus.OK)
          {
            var currentloc = results[0].geometry.location;
            gmaps.createmarker(currentloc,currentsnippet,currentsubject,currentlabel)
          } 
          if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) 
          {
            setTimeout(function(){
                    gmaps.startgeocoding(currentmail,geocoder);
                }, 300);
            console.log('Geocode was not successful for the following reason: ' + status);
          }
      });
  },
  createmarker:function(currentloc,currentsnippet,currentsubject,currentlabel)
  {
    var marker = new google.maps.Marker
    ({
      position: currentloc,
      map: map,
      title: currentlabel
    });
    
    var infowindow = new google.maps.InfoWindow
    ({
      content: '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+currentlabel+'</h1>'+
      '<div id="bodyContent">'+
      '<p>'+currentsnippet+'</p>'+
      '<br>'+
      '<p>'+currentsubject+'</p>'+
      '</div>'
    });
        
    marker.addListener('mouseover', function() 
    {
      infowindow.open(map, marker);
    });
    
    marker.addListener('mouseout', function() 
    {
      infowindow.close(map, marker);
    });
  }
        //https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
}