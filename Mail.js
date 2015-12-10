var mail = {
  LABELS: [],
  MAILS:[],
  TOTALMAIL:[],

  loadGmailApi:function() 
  {
    gapi.client.load('gmail', 'v1', mail.getLabels);
  },
  
  //Gets the labels from the useraccount
  getLabels:function() 
  {
    var request = gapi.client.gmail.users.labels.list({
      'userId': 'me'
    });
    //We have done a request now to print the data and get a mail where the label string contains "Location:".
    request.execute(function(resp) 
    {
      if (resp.labels && resp.labels.length > 0) 
      {
        for (var i = 0; i < resp.labels.length; i++) 
        {
            if(resp.labels[i].name.indexOf("Location:") > -1)
            {
              //Takes the label and sends it to getcurrentmail, this gets information about the mail matching the label.
              mail.getcurrentmail(resp.labels[i].id,resp.labels[i].name);
            }
        }
      }
      //Waits 2 sec. before starting to geocode adress, this allows us to finish the array before moving on.
      setTimeout(function() {gmaps.geocodeAddress(mail.TOTALMAIL);}, 2000);
    });
  },
  
  //Gets mailinformation that we send to listcurrentmail after 0.7 seconds..
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
  
  //Lists information about the mail , gets the snippet, the subject, the entire mail even..
  listcurrentmail:function(labelname,message)
  {
      var request = gapi.client.gmail.users.messages.get
      ({
          'userId': 'me',
          'id': message
      });
      request.execute(function(resp)
      {
        var entiremail = resp.payload.parts[1].body.data;
        
        if(entiremail === undefined)
        {
          entiremail = resp.payload.parts[0].parts[1].body.data;
        }
        var decodedmail = atob( entiremail.replace(/-/g, '+').replace(/_/g, '/'));
            var item = {
              label: labelname,
              subject: resp.payload.headers[16].value,
              snippet: resp.snippet,
              fullmail:decodedmail,
            };
            //Adds the finished mail object to an array.
              mail.TOTALMAIL.push(item);
      });
  },
};