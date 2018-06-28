<?php

// escape strings in input data
$firstName = pg_escape_string($_POST['firstName']);
$lastName = pg_escape_string($_POST['lastName']);
$occupation = pg_escape_string($_POST['occupation']);
$id = pg_escape_string($_POST['id']);

// open connection and execute query
$db = pg_connect('host=localhost dbname=vhost63610p0 user=vhost63610p0 password=WebWarePostgreSQL');
$query = "UPDATE applications SET first_name = '$firstName', last_name = '$lastName', occupation = '$occupation' WHERE id = '$id' RETURNING  *";
$result = pg_query($db, $query);

// fetch a row as an associative array and create a valid json object
print json_encode(pg_fetch_assoc($result));

// close connection
pg_close($dbh);

?>
