(function() {
	"use strict";
	function startDownload(){
		if(document.getSelection().focusNode == null)return;
		var clickedEl = document.getSelection().focusNode.parentElement;
		var table = clickedEl.closest("table");		
		if(table === null){
			alert("No HTML table was found");
			return;
		}
		table = table.cloneNode(true);
		var csv = [];
		var rows = table.rows;				
		for (var i = 0; i < rows.length; i++) {
			var row = [], cols = rows[i].querySelectorAll("td, th");	
			for (var j = 0; j < cols.length; j++) {
				var columnItem = cols[j].innerText.replace(/"/g, "\"\""); //as per rfc4180
				columnItem = columnItem.replace(/(\r\n\t|\n|\r\t)/gm," ").trim(); //New lines are nothing but trouble										
				cols[j].querySelectorAll("img").forEach(function(ele){ columnItem = columnItem + (columnItem.length > 0 ? " " : "") + ele.src; });
				cols[j].querySelectorAll("input, textarea").forEach(function(ele){ columnItem = columnItem + (columnItem.length > 0 ? " " : "") + ele.value + " (i)"; });
				row.push("\"" + columnItem + "\"");
				for(var a = 1; a < cols[j].colSpan; a++){
					row.push("\"\""); //keep alignment by adding empty cells for colSpan
				}
				for(var a = 1; a < cols[j].rowSpan; a++){
					rows[i+a].insertBefore(document.createElement("td"), rows[i+a].children[j]); //keep alignment by adding empty cells for rowSpan
				}
			}
			csv.push(row.join(","));  				
		}  
		var downloadLink = document.createElement("a");
		var fileName = prompt("File name: ", (table.id || table.id.length > 0) ? table.id : "table");
		if(fileName == null) return;			
		downloadLink.download = fileName != "" ? fileName + ".csv" : "table.csv"
		downloadLink.href = window.URL.createObjectURL(new Blob([csv.join("\r\n")], {type: "text/csv"}));
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
		downloadLink.click();	
	}
	
	if(typeof dltcsvRightClick !== "undefined" && dltcsvRightClick){
		document.addEventListener("mousemove", function(event){ //This is a dirty hack as Firefox currently doesn't seem to set the selection on right click
			window.getSelection().collapse(document.elementFromPoint(event.clientX, event.clientY-280), 0);
			dltcsvRightClick = false;
			startDownload();
		}, {once:true});		
	}else{
		var originalCursor = document.body.style.cursor;
		document.addEventListener("click", function(event){
			document.body.style.cursor = originalCursor;
			startDownload();			
		}, {once:true});
		document.body.style.cursor = "crosshair";		
	}
})();
