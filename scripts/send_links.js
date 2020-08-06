var file_names = []; 
var sectionTitlesTable = [];
var section_titles;
var links = [].slice.apply(document.getElementsByTagName('a'));
links = links.map(function(element) {
if (window.location.href.indexOf("resource") > -1) { //only show the links from "Resources" page	
  var href = element.href;
  var hashIndex = href.indexOf('#');
  if (hashIndex >= 0) 
  {
    href = href.toLowerCase().substr(0, hashIndex);
  }
  var res = 'get_resource';
  if (res == href.substr(33, res.length)) 
  {
	 file_names.push(element.text); 
  }
  return href;
}
});

// Remove duplicates and invalid URLs.
var res = 'get_resource';
for (var i = 0; i < links.length;) {
  if (((i > 0) && (links[i] == links[i - 1])) ||
      (links[i] == '') || (links[i] == null) || (links[i] == undefined) ||
      (res != links[i].toLowerCase().substr(33, res.length))) 
  {
    links.splice(i, 1);
  } 
  else 
  {
      ++i;
  }
  
}

chrome.extension.sendRequest(links);
chrome.extension.sendRequest(file_names);



