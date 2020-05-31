browser.runtime.onInstalled.addListener(function() {
	browser.contextMenus.create({ id: "DLCSV", title: "Download table as CSV", type: "normal", contexts: ["page"]});	
});
browser.contextMenus.onClicked.addListener(function(item, tab) {
		"use strict";
		if(item.menuItemId == "DLCSV"){	
			browser.tabs.executeScript(tab.id, {code: "dltcsvRightClick = true;", allFrames:true}, function() { browser.tabs.executeScript(tab.id, {file: "downloadcsv.js", allFrames:true});});			
		}	
});
