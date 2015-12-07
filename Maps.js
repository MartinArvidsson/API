
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
  
 geocodeAddress:function(labels) {
    var geocoder = new google.maps.Geocoder();
    //console.log(mails);
    //console.log(labels);
      for(var i=0; i < labels.length; i++)
      {
          gmaps.startgeocoding(labels[i],geocoder);
      }
  },
  
  startgeocoding:function(currentlabel,geocoder)
  {
    //console.log(currentmail);
      var adress = currentlabel.name;
      var newadress = adress.replace("Location:","");
      geocoder.geocode({'address': newadress},
      function(results, status) 
      {
          if (status === google.maps.GeocoderStatus.OK)
          {
            var currentloc = results[0].geometry.location;
            gmaps.createmarker(currentloc,newadress)
          } 
          if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) 
          {
            setTimeout(function(){
                    gmaps.startgeocoding(currentlabel, geocoder);
                }, 300)
            console.log('Geocode was not successful for the following reason: ' + status);
          }
      });
  },
  createmarker:function(currentloc,newadress)
  {
    var marker = new google.maps.Marker
    ({
      position: currentloc,
      map: map,
      title: newadress
    });
    // var infowindow = new google.maps.InfoWindow
    // ({
    //     content: '<div id="content">'+
    //   '<div id="siteNotice">'+
    //   '</div>'+
    //   '<h1 id="firstHeading" class="firstHeading">'+newadress+'</h1>'+
    //   '<div id="bodyContent">'+
    //   '<p>'+currentmail.snippet+'</p>'+
    //   '<br>'+
    //   '<br>'+
    //   '<p>'+currentmail.subject+'</p>'+
    //   '</div>'
    // });
        
    marker.addListener('click', function() 
    {
      infowindow.open(map, marker);
    });
  }
        //https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
}