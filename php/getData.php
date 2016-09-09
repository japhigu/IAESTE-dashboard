<?php
/**
 * Created by PhpStorm.
 * User: dnl
 * Date: 04/09/2016
 * Time: 23:51
 */

$dbh = new PDO('mysql:host=localhost;dbname=d3test;charset=utf8', 'root', '');
$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

// use the connection here
$sth = $dbh->query('SELECT unis, anzahl FROM dashdata');
$results = $sth->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($results);
//$raw_results = json_encode($results);
//echo htmlspecialchars_decode($raw_results);

// close conn
$sth = null;
$dbh = null;
?>