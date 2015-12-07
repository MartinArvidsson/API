var mail = {
  SORTLABEL:"Location/",
  
  LABELS: [],

  loadGmailApi:function() 
  {
    gapi.client.load('gmail', 'v1', mail.getLabels);
  },

  getLabels:function() 
  {
    var request = gapi.client.gmail.users.labels.list({
      'userId': 'me'
    });

    request.execute(function(resp) 
    {
      if (resp.labels && resp.labels.length > 0) 
      {
        for (var i = 0; i < resp.labels.length; i++) 
        {
            if(resp.labels[i].name.indexOf("Location:") > -1)//sort out any label that isnt nested in the "Location"-label
            {
              mail.LABELS.push(resp.labels[i]);
            }
        }
      }
      //return mail.LABELIDS;
      //mail.appendMessages(mail.LABELS);
      gmaps.geocodeAddress(mail.LABELS);
    });
  },
  
  appendMessages:function(message)
  {
    for (var i = 0; i < message.length; i++) 
        {
            var pre = document.getElementById('output');
            var textContent = document.createTextNode(message[i].name + '\n');
            pre.appendChild(textContent);
        }
  }
}