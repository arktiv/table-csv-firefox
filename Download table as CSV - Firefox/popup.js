(function() {
	"use strict";
	document.getElementById("downloadTableAsCSVButton").addEventListener("click", function(){
		browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
			browser.tabs.executeScript(tabs[0].id, {file: "downloadcsv.js", allFrames:true});
		});
	}, true);
})(); 

