document.addEventListener('DOMContentLoaded', function(){
	var submitButton = document.getElementById("submit_button");
	submitButton.addEventListener('click', function(){
		var nameOfOwner = document.getElementById("key_id").value;
		var publicKeyAddress = document.getElementById("p_key").value;
		
    chrome.storage.sync.get(function(all_keys) {
	    if (Object.keys(all_keys).length > 0 && all_keys.data) {
	      all_keys.data.push({"Owner": nameOfOwner, "Address": publicKeyAddress});
	    }else {
	      all_keys.data = [{"Owner": nameOfOwner, "Address": publicKeyAddress}];
	    }

	    chrome.storage.sync.set(all_keys, function() {
	      console.log('Data successfully saved to the storage!');
	      document.getElementById("key_id").value = '';
	      document.getElementById("p_key").value = '';
	      publicKeyAddress = "";
	      chrome.storage.sync.get(all_keys, function(){
	      	var listOfKeys = "";
	      	for(key=0; key<all_keys.data.length; key++){
	      		listOfKeys += '<li>';
	      	 	listOfKeys +="Owner: "+all_keys.data[key]["Owner"]+"\nAddress: "+all_keys.data[key]["Address"];
	      		listOfKeys += '</li>';
	      		listOfKeys += '<p>=====</p>'
	      	 }
	      	public_keys_list.innerHTML = listOfKeys;
	      });
	    });
		});
	});
});

document.addEventListener('DOMContentLoaded', function(){
	var showButton = document.getElementById('show_keys');
	showButton.addEventListener('click', function(){
		chrome.storage.sync.get(function(all_keys) {
      chrome.storage.sync.get(all_keys, function(){
      	var listOfKeys = "";
      	for(key=0; key<all_keys.data.length; key++){
      		console.log(key);
      	 	listOfKeys += '<li>';
      	 	listOfKeys +="Owner: "+all_keys.data[key]["Owner"]+"\nAddress: "+all_keys.data[key]["Address"];
      		listOfKeys += '</li>';
      		listOfKeys += '<p>=====</p>'
      	 }
      	public_keys_list.innerHTML = listOfKeys;
      });
		});
	});
});