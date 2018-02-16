/*
	Here we re-wire the XMLHttpRequest object to make all ajax calls log their status in a custom variable 'loadingLog'
	upon any XMLHttpRequest being fired we want to activate 'loadingLog' to true to indicate there is an ajax process happening
	once the request has finished we want to set that 'loadingLog' variable back to false to indicate no current request are happening
*/
var loadingLog = false;
XMLHttpRequest.prototype.logSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body) {
	window.loadingLog = true;
    this.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       window.loadingLog = false;
	    }
	};
    this.logSend(body);
};

/*
	This function is a hook that performs the loading check to determin if something is loading on the page.
	-if something is loading on the page, this function will wait until what ever is loading to finish then makes the call
	to callback function

	We do this by making this function recursive if it has determin that there is something still loading
*/
function checkLoad(callback){	
	if (window.loadingLog) { 
        console.log("Something is still loading. Running this function again.");
        //using a setTimout for buffering space
        setTimeout(function(){ 
			checkLoad(callback);
		}, 100);
    }else{
    	//nothing is loading ok to fire the callback
    	console.log("Nothing is loading. Fire the callback");
        callback();
    }
}

/*
	This is the callback function that will perform what ever is needed after checkLoad has determin there is nothing loading

*/
function callback(){
	console.log("callback was fired WhooHoo!");
}

