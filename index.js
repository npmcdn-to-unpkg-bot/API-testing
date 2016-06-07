function getCredentials(){
	var data = {
		'grant_type': 'client_credentials',
		'client_id': CLIENT_ID,
		'client_secret': CLIENT_SECRET
	};
	var url = 'https://api.clarifai.com/v1/token';

	return axios.post(url,data, {
		'tranformRequest': [function() {
			return transformDataToParams(data);
		}]
	}).then(function(r) {
		localStorage.setItem('accessToken',r.data.access_token);
		localStorage.setItem('tokenTimestamp', Math.floor(Date.now() / 1000));
	}, function(err) {
		console.log(err);
	});
}

function transformDataToParams(data) {
  var str = [];
  for (var p in data) {
    if (data.hasOwnProperty(p) && data[p]) {
      if (typeof data[p] === 'string'){
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
      }
      if (typeof data[p] === 'object'){
        for (var i in data[p]) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p][i]));
        }
      }
    }
  }
  return str.join('&');
}