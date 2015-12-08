
var gmaps = 
{
  ConvertedCoordinates:[],
  
  map:{},
  initMap:function() 
  {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:40,lng:0},
      zoom: 3
    });
  },
  
 geocodeAddress:function(mails) {
    var geocoder = new google.maps.Geocoder();
      for(var i=0; i < mails.length; i++)
      {
          gmaps.startgeocoding(mails[i],geocoder);
      }
  },
  
  startgeocoding:function(currentmail,geocoder)
  {
      var currentlabel = currentmail.label;
      var currentsubject = currentmail.subject;
      var currentsnippet = currentmail.snippet;
      var currenttotalmail = currentmail.fullmail;
      
      var currentcutmail = currenttotalmail.substr(0,700) +"...";
      var adress = currentlabel;
      
      var newadress = adress.replace("Location:","");
      geocoder.geocode({'address': newadress},
      function(results, status) 
      {
          if (status === google.maps.GeocoderStatus.OK)
          {
            var currentloc = results[0].geometry.location;
            gmaps.createmarker(currentloc,currentsnippet,currentsubject,currentlabel,currentcutmail)
          } 
          if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) 
          {
            setTimeout(function(){
                    gmaps.startgeocoding(currentmail,geocoder);
                }, 300);
          }
          if(status === google.maps.GeocoderStatus.ZERO_RESULTS)
          {
            console.log(newadress);
          }
      });
  },
  createmarker:function(currentloc,currentsnippet,currentsubject,currentlabel,currenttotalmail)
  {
    var marker = new google.maps.Marker
    ({
      position: currentloc,
      map: map,
      title: currentlabel
    });
    
    var infowindow = new google.maps.InfoWindow
    ({
      content: '<div id="infocontent">'+
      '<h1 id="firstHeading" class="firstHeading">'+currentlabel+'</h1>'+
      '<div id="bodyContent">'+
      '<p>'+currentsnippet+'</p>'+
      '<br>'+
      '<p>'+currentsubject+'</p>'+
      '<br>'+
      '<p>'+currenttotalmail+'</p>'+
      '</div>'
    });
        
    marker.addListener('mouseover', function() 
    {
      infowindow.open(map, marker);
      disableAutoPan:true;
    });
  }
}