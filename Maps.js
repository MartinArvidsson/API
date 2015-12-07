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
    var i = 0;
     setTimeout(function () 
    {
      i++;                     
      if (i < labels.length) {            
        gmaps.startgeocoding(labels[i],geocoder);             
      }                        
    }, 300)
  },
  
  startgeocoding:function(currentlabel,geocoder)
  {
      var adress = currentlabel.name;
      var newadress = adress.replace("Location:","");
      console.log(newadress);
      geocoder.geocode({'address': newadress}, 
      function(results, status) 
      {
          if (status === google.maps.GeocoderStatus.OK)
          {
            console.log(results);
          } 
          else 
          {
            alert('Geocode was not successful for the following reason: ' + status);
          }
      });
  },
  createmarker:function(lat,long)
  {
          var marker = new google.maps.Marker({
          position: lat+","+long,
          map: map,
          title: 'Hello World!'
        });
  },
}