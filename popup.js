var display = document.getElementById("url_label");
function updateDisplay() {
    display.innerHTML = chrome.tabs.query({active:true}, function(tabs) {
        var tabURL = tabs[0].url;
        if (tabURL.substring(0,8)==="https://") {
            tabURL = tabURL.substring(8);
        }
        else if (tabURL.substring(0,7)==="http://") {
            tabURL = tabURL.substring(7);
        }
        tabURL = tabURL.substring(0,tabURL.indexOf("/"));
        var d = new Date();
        display.innerHTML = d.getTime();
    });
}
updateDisplay();
