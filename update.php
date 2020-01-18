<?php
$servername = "localhost:3307";
$username = "root";
$password = "";
$dbname = "tracker";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
alert("Connected successfully");

$u = $_POST['tabURL'];

$d = $_POST['date'];
$t = $_POST['time'];

//$d = date("Y-m-d");
//$t = time();



$sql = "INSERT INTO activities VALUES ('".$d."','".$u."',".$t.")";

if ($conn->query($sql) === TRUE) {
    alert("New record created successfully");
} else {
    alert("Error: " . $sql . "<br>" . $conn>error);
}

$conn->close();

function alert($msg) {
    echo "<script type='text/javascript'>alert('$msg');</script>";
}
?>