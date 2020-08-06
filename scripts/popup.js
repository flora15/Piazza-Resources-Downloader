var allLinks = [];
var visibleLinks = [];
var j = 0;

//Display all visible links.
function showLinks() {
  var linksTable = document.getElementById('links');
  j = (visibleLinks.length - (visibleLinks.length/2));
  while (linksTable.children.length > 1) {
    linksTable.removeChild(linksTable.children[linksTable.children.length - 1])
  }
  for (var i = 0; i < visibleLinks.length/2; ++i) {
    var row = document.createElement('tr');
    var col0 = document.createElement('td');
    var col1 = document.createElement('td');
    var checkbox = document.createElement('input');
    checkbox.checked = false;
    checkbox.type = 'checkbox';
    checkbox.id = 'check' + i;
    col0.appendChild(checkbox);
    col1.innerText = visibleLinks[j];
    ++j;
    col1.style.whiteSpace = 'nowrap';
    col1.onclick = function() {
      checkbox.checked = !checkbox.checked;
    }
    row.appendChild(col0);
    row.appendChild(col1);
    linksTable.appendChild(row);
  }
}

// Toggle the checked state of all visible links.
function toggleAll() {
 var checked = document.getElementById('toggle_all').checked;
  for (var i = 0; i < visibleLinks.length; ++i) {
    if (document.getElementById('check' + i))
    {
    	document.getElementById('check' + i).checked = checked;
    }
  }
}

// Download all visible checked links.
function downloadCheckedLinks() {
  for (var i = 0; i < visibleLinks.length; ++i) {
    if ((document.getElementById('check' + i)) && (document.getElementById('check' + i).checked)) {
      chrome.downloads.download({url: visibleLinks[i]},
                                             function(id) {
      });
    }
  }
  window.close();
}

//send_links.js is injected into all frames of the active tab
chrome.extension.onRequest.addListener(function(links) {
  for (var index in links) 
  {
    allLinks.push(links[index]);
  }
  
  visibleLinks = allLinks;
  showLinks();
  //hide or show buttons
  if(!visibleLinks.length)
  {
	document.getElementById('pText').innerHTML = "<style:text-align: center>" + "Navigate to <u>" + "Piazza Resources" +  "</u> to download available files";		
  }
  else
  {
	document.getElementById("download0").style.display = "block";
	document.getElementById("download1").style.display = "block";
	document.getElementById("toggle_all").style.display = "block";
	document.getElementById("selectAll").style.display = "block";
  }
});

// Set up event handlers and inject send_links.js into all frames in the active
// tab.
window.onload = function() {
  document.getElementById('download0').onclick = downloadCheckedLinks;
  document.getElementById('download1').onclick = downloadCheckedLinks;
  document.getElementById('toggle_all').onchange = toggleAll;
  chrome.windows.getCurrent(function (currentWindow) {
	  chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'scripts/send_links.js', allFrames: true});    
    });
  });
};
