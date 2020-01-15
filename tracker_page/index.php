<!DOCTYPE html>
<html>
<head>
    <title>Tracker - Test Collection</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Abel|">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/main.css">
    <link rel="stylesheet" type="text/css" href="tracker.css">
    <script src="../assets/scripts/jquery.js"></script>
</head>
<body>
    <div id="cover"></div>
    <div style="widht:0px;height:0px;">
        <button id="header_button" onclick="moveNav()"><i class="fa fa-bars"></i></button>
    </div>
    <header id="header_collapse">
        <div id="header_logo">
            <h1>The Test Collection</h1>
            <img src="../assets/img/avatar.png" width="40" height="60" id="header_logo_img">
        </div> 
    </header>
    <div id="header_shadow"></div>
    <nav id="main_nav">
        <ul>
            <li><a href="https://gustavtrolle.github.io/index.html">Home</a></li>
        </ul>
    </nav>
    <div class="body_stuff">
        <h3>Time Tracker</h3>
        <p>Coming Soon!</p>
        <div id="timeline">
            <div class="l1">
            </div>
        </div>
        <div class="spacing" style="height:275px"></div>
        <p id="urlLabel"></p>
    </div>
    
    <?php
    date_default_timezone_set('America/New_York');
    $d = date("Y-m-d");
    $dlw = date("Y-m-d", time()-60*60*24*7);
    
    $servername = "localhost:3307";
    $username = "root";
    $password = "gustavBatman20";
    $dbname = "tracker";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);
    
    $sql = "DELETE FROM activities WHERE date<'".$dlw."'";
    if ($conn->query($sql) === FALSE) alert("Error: " . $sql . "<br>" . $conn->error);
    
    $sql = "DELETE FROM todayact";
    if ($conn->query($sql) === FALSE) alert("Error: " . $sql . "<br>" . $conn->error);
    
    $sql = "INSERT INTO todayact SELECT * FROM activities WHERE date='".$d."'";
    if ($conn->query($sql) === FALSE) alert("Error: " . $sql . "<br>" . $conn->error);
    
    $url = array();
    $time = array();
    $count = 0;
    
    $sql = "SELECT * FROM todayact";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $url[$count] = $row["url"];
            $time[$count] = $row["time"];
            $count++;
        }
    } else {
        //alert("0 results");
    }
    
    $conn->close();
    
    function alert($msg) {
        echo "<script type='text/javascript'>alert('$msg');</script>";
    }
    ?>
    
    <script>
        var urlArray = <?php echo json_encode($url); ?>;
        var timeArray = <?php echo json_encode($time); ?>;
    </script>
    <script src="../index.js" type="text/javascript"></script>
    <script src="index.js" type="text/javascript"></script>
</body>
</html>