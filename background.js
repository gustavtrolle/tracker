chrome.runtime.onStartup.addListener(function() {
    
});

function updateData(user, date, url, time) {
    $.ajax({
        type:"POST",
        url:"http://localhost/tracker/update.php",
        data: {tabURL:url},
    });
}

var tabURL;
var user = "admin";
var date = '2018-08-08';

chrome.tabs.onActivated.addListener(function(tabInfo)  {
        chrome.tabs.get(tabInfo.tabId, function(activeTab) {
            tabURL = activeTab.url;
            if (tabURL.substring(0,8)==="https://") {
                tabURL = tabURL.substring(8);
            }
            else if (tabURL.substring(0,7)==="http://") {
                tabURL = tabURL.substring(7);
            }
            if (tabURL.indexOf("/")>=0) {
                tabURL = tabURL.substring(0,tabURL.indexOf("/")); 
            }
            var d = new Date();
            updateData(user, date, tabURL, d.getTime());
            //alert(tabURL + "," + d.getTime());
        })
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)  {
    if (changeInfo.status === "complete") {
        chrome.tabs.get(tabId, function(activeTab) {
            tabURL = activeTab.url;
            if (tabURL.substring(0,8)==="https://") {
                tabURL = tabURL.substring(8);
            }
            else if (tabURL.substring(0,7)==="http://") {
                tabURL = tabURL.substring(7);
            }
            if (tabURL.indexOf("/")>=0) {
                tabURL = tabURL.substring(0,tabURL.indexOf("/")); 
            }
            var d = new Date();
            updateData(user, date, tabURL, d.getTime());
            //alert(tabURL + "," + d.getTime());
        })   
    }
});

chrome.windows.onFocusChanged.addListener(function(windowId) {
    if (windowId != chrome.windows.WINDOW_ID_NONE) {
        var d = new Date();
        updateData(user, date, "not in use", d.getTime());
        //alert("undefined" + "," + d.getTime());
        
    }
});

