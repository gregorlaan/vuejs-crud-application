<?php

// escape strings in input data
$firstName = pg_escape_string($_POST['firstName']);
$lastName = pg_escape_string($_POST['lastName']);
$occupation = pg_escape_string($_POST['occupation']);
$application = pg_escape_string($_POST['application']);

// open connection and execute query
$db = pg_connect('host=localhost dbname=vhost63610p0 user=vhost63610p0 password=WebWarePostgreSQL');
$query = "INSERT INTO applications (first_name, last_name, occupation, application) VALUES ('$firstName', '$lastName', '$occupation', '$application') RETURNING *";
$result = pg_query($db, $query);

// fetch a row as an associative array and create a valid json object
print json_encode(pg_fetch_assoc($result));

// close connection
pg_close($dbh);

?>
