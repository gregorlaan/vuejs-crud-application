<?php

// escape strings in input data
$id = pg_escape_string($_POST['id']);

// open connection and execute query
$db = pg_connect('host=localhost dbname=vhost63610p0 user=vhost63610p0 password=WebWarePostgreSQL');
$query = "DELETE FROM applications WHERE id = '$id'";
$result = pg_query($db, $query);

// close connection
pg_close($dbh);

?>
