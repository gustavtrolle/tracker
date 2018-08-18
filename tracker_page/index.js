function loadTimeline() {
    var time = 360;
    for (var i=0;i<217;i++) {
        var div = document.createElement("div");
        div.style.width = "10px";
        div.style.height = "3px";
        div.style.background="black";
        div.style.position="absolute";
        div.style.left="115px";
        div.style.top=i*300+108+'px';
        document.getElementById("timeline").appendChild(div);
        
        var label = document.createElement("p");
        if (time<780) {
            if (time%60<10) label.innerHTML=Math.floor(time/60)+":0"+time%60+" am";
            else label.innerHTML=Math.floor(time/60)+":"+time%60+" am";
        }
        else {
            if (time%60<10) label.innerHTML=Math.floor((time-720)/60)+":0"+time%60+" pm";
            else label.innerHTML=Math.floor((time-720)/60)+":"+time%60+" pm";
        }
        label.style.fontSize="18px";
        label.style.fontWeight="bold";
        label.style.position="absolute";
        label.style.left="40px";
        label.style.top=i*300+78+'px';
        document.getElementById("timeline").appendChild(label);
        
        time+=5;
    }
}
loadTimeline();

var smallCount=0;
var bigCount=0;
var small = [25,25,25,50,50,50];
var big = [1,87,155,2,136,209];

var activity = {
    url: "not in use",
    start: 0,
    end: 1,
    display: function(r, g, b) {
        var d = new Date();
        var currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        var startTime = currentDate.getTime()+21600000;
        var div = document.createElement("div");
        div.style.position="absolute";
        div.style.width="50px";
        div.style.left="145px";
        div.style.background = "rgb("+r+","+g+","+b+")";
        div.style.height=Math.floor((this.end-this.start)/1000)+'px';
        div.style.top=110+Math.floor((this.start-startTime)/1000)+'px';
        if (this.url!="not in use") document.getElementById("timeline").appendChild(div);
    },
    length: function() {
        return this.end-this.start;
    }
};

function loadActivities() {
    for (var i=0;i<urlArray.length-1;i++) {
        activity.url = urlArray[i];
        activity.start = timeArray[i];
        activity.end = timeArray[i+1];
        if (activity.length()<30000) {
            activity.display(small[smallCount],small[smallCount+1],small[smallCount+2]);
            smallCount=(smallCount+3)%6;
        }
        else {
            activity.display(big[bigCount],big[bigCount+1],big[bigCount+2]);
            bigCount=(bigCount+3)%6;
        }
    }
}
loadActivities();
