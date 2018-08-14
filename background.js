chrome.runtime.onStartup.addListener(function() {
    
});

function updateData(user, date, tabURL, time) {
    $.ajax({
        type:"POST",
        url:"http://localhost/tracker/update.php",
        data: {user: user, date: date, tabURL:tabURL, time: time},
    });
}

var tabURL;
var user = "admin";
var date = '2018-08-08';
var currentTab = -1;

var bgLoop = setInterval(function() {monitorActivity();},1000);

function monitorActivity() {
    chrome.tabs.query({},function(result){
        for (var i=0; i<result.length; i++) {
            if (result[i].active&&result[i].id!=currentTab) {
                var tempId = result[i].id;
                var tempURL = result[i].url;
                chrome.windows.get(result[i].windowId, {}, function(window){
                    if (window.focused) {
                            currentTab = tempId;
                            tabURL = tempURL;
                            if (tabURL.substring(0,8)==="https://") {
                                tabURL = tabURL.substring(8);
                            }
                            else if (tabURL.substring(0,7)==="http://") {
                                tabURL = tabURL.substring(7);
                            }
                            if (tabURL.indexOf("/")>=0) {
                                tabURL = tabURL.substring(0,tabURL.indexOf("/")); 
                            }
                            updateDate();
                            var d = new Date();
                            updateData(user, date, tabURL, d.getTime());
                            //alert(tabURL + "," + d.getTime());
                    }
                })   
            }
        }
    })
    chrome.windows.getAll({},function(windows){
        var winFocus=false;
        for (var i=0; i<windows.length; i++) {
            if (windows[i].focused) winFocus=true;
        }
        if (!winFocus&&currentTab!=-1) {
            currentTab = -1;
            updateDate();
            var d = new Date();
            updateData(user, date, "not in use", d.getTime());
            //alert("undefined" + "," + d.getTime());   
        }
    })
}

function updateDate() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    if (day<10) day = '0' + day;
    if (month<10) month = '0' + month;
    date = year + "-" + month + "-" + day;
}

/*chrome.tabs.onActivated.addListener(function(tabInfo)  {
        currentTab = tabInfo.tabId;
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
            
            updateDate();
            var d = new Date();
            updateData(user, date, tabURL, d.getTime());
            //alert(tabURL + "," + d.getTime());
        })
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)  {
    currentTab = tabId;
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
            
            updateDate();
            var d = new Date();
            updateData(user, date, tabURL, d.getTime());
            //alert(tabURL + "," + d.getTime());
        })   
    }
});

chrome.windows.onFocusChanged.addListener(function(windowId) {
    updateDate();
    var d = new Date();
    updateData(user, date, "event fired", d.getTime());
    if (windowId == chrome.windows.WINDOW_ID_NONE) {
        updateDate();
        var d = new Date();
        updateData(user, date, "not in use", d.getTime());
        //alert("undefined" + "," + d.getTime());
    }
    else {
        chrome.tabs.get(currentTab, function(activeTab) {
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
            
            updateDate();
            var d = new Date();
            //updateData(user, date, tabURL, d.getTime());
            updateData(user, date, "in use", d.getTime());
            //alert(tabURL + "," + d.getTime());
        })
    }
});*/

