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
      //console.log(resp);
      if (resp.labels && resp.labels.length > 0) 
      {
        for (var i = 0; i < resp.labels.length; i++) 
        {
            if(resp.labels[i].name.indexOf("Location:") > -1)//sort out any label that isnt nested in the "Location"-label
            {
              mail.getcurrentmail(resp.labels[i].id,resp.labels[i].name);
            }
        }
      }
      setTimeout(function() {gmaps.geocodeAddress(mail.TOTALMAIL);}, 3000);
    });
  },
  
  getcurrentmail:function(labelid,labelname)
  {
    var request = gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'labelIds': labelid
    });
    
    request.execute(function(resp)
    {
      if (resp.messages && resp.messages.length > 0) 
      {
        setTimeout(function() {mail.listcurrentmail(labelname,resp.messages[0].id);}, 700);
      }
    });
  },
  
  listcurrentmail:function(labelname,message)
  {
      var request = gapi.client.gmail.users.messages.get
      ({
          'userId': 'me',
          'id': message
      });
      request.execute(function(resp)
      {
        //console.log(resp);
        var entiremail = resp.payload.parts[1].body.data;
        
        if(entiremail === undefined)
        {
          entiremail = resp.payload.parts[0].parts[1].body.data;
        }
        var decodedmail = atob( entiremail.replace(/-/g, '+').replace(/_/g, '/') );
        
        //console.log(decodedmail);
            var item = {
              label: labelname,
              subject: resp.payload.headers[16].value,
              snippet: resp.snippet,
              fullmail:decodedmail,
            };
              mail.TOTALMAIL.push(item);
      });
  },
};