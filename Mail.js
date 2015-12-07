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
            if(resp.labels[i].name.indexOf(mail.SORTLABEL) > -1)//sort out any label that isnt nested in the "Location"-label
            {
              mail.LABELS.push(resp.labels[i]);
            }
        }
      }
       return mail.LABELIDS;
    });
  },
}