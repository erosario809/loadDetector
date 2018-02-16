# loadDetector
A JavaScript function that makes sure nothing is loading to make a callback. 
-This is needed when you can't rely on the onload event listener for website that does asynchronous loading

The Test folder contains a sample page build.
-The script will output console.logs so you can view whats happening.
-In the index.html there are 2 different ajax. One is in jQuery and the other is in Vanilla js. You will see that this script should work on any page no matter which library it uses for ajax.
