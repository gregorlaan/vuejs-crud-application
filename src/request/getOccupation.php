<?php   

// open connection and execute query
$db = pg_connect('host=localhost dbname=vhost63610p0 user=vhost63610p0 password=WebWarePostgreSQL');
$query = "SELECT * FROM occupation";
$result = pg_query($db, $query);

// fetch a row as an associative array and create a valid json object
while($row=pg_fetch_assoc($result)){
    $rows[] = $row;
}
print json_encode($rows);

// close connection
pg_close($dbh);

?>
