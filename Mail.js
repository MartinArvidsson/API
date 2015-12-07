var mail = {
  LABELS: [],
  MAILS:[],
  TOTALMAIL:[],

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
      gmaps.geocodeAddress(mail.LABELS);
      mail.getallmails();
    });
  },
  
  getallmails:function()
  {
    var request = gapi.client.gmail.users.messages.list({
      'userId': 'me'
    });
    
    request.execute(function(resp)
    {
      //console.log(resp);
      if (resp.messages && resp.messages.length > 0) 
      {
        for(var i = 0; i < resp.messages.length; i++)
        {
          mail.MAILS.push(resp.messages[i]);
        }
        mail.listallmails();
      }
    });
  },
  
  listallmails:function()
  {
    for (var i = 0; i < mail.MAILS.length; i++) 
    {
      var request = gapi.client.gmail.users.messages.get
      ({
          'userId': 'me',
          'id': mail.MAILS[i].id
      });
      
      request.execute(function(resp) 
      {
        if (resp.snippet != null) 
        {
            var item = {
              subject:resp.payload.headers[16].value,
              snippet:resp.snippet,
            };
            mail.TOTALMAIL.push(item);
            //console.log(mail.TOTALMAIL);
        }
      });
    }
    console.log(mail.TOTALMAIL);
  },
};