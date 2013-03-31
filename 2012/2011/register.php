<?php 
function check_email_address($email) {
  // First, we check that there's one @ symbol, 
  // and that the lengths are right.
  if (!ereg("^[^@]{1,64}@[^@]{1,255}$", $email)) {
    // Email invalid because wrong number of characters 
    // in one section or wrong number of @ symbols.
    return false;
  }
  // Split it into sections to make life easier
  $email_array = explode("@", $email);
  $local_array = explode(".", $email_array[0]);
  for ($i = 0; $i < sizeof($local_array); $i++) {
    if
(!ereg("^(([A-Za-z0-9!#$%&'*+/=?^_`{|}~-][A-Za-z0-9!#$%&'*+/=?^_`{|}~\.-]{0,63})|(\"[^(\\|\")]{0,62}\"))$",$local_array[$i])) {
      return false;
    }
  }
  // Check if domain is IP. If not, 
  // it should be valid domain name
  if (!ereg("^\[?[0-9\.]+\]?$", $email_array[1])) {
    $domain_array = explode(".", $email_array[1]);
    if (sizeof($domain_array) < 2) {
        return false; // Not enough parts to domain
    }
    for ($i = 0; $i < sizeof($domain_array); $i++) {
      if
(!ereg("^(([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])|([A-Za-z0-9]+))$",$domain_array[$i])) {
        return false;
      }
    }
  }
  return true;
}

$nick2 = htmlspecialchars($_REQUEST["nick"]);
$email = $_REQUEST["email"];

if (!check_email_address($email)) {
echo '<p>Please enter a valid e-mail address.<br/><a href="http://demojs.ogr">demojs.org</a></p>';
die();
}


$file = fopen("../liste_mails","a");
fwrite($file,$nick2);
fwrite($file," ");
fwrite($file,$email);
fwrite($file,"\n");

$file = fopen("../liste_nicks","a");
fwrite($file,"<li>");
fwrite($file,$nick2);
fwrite($file,"</li>");
fwrite($file,"\n");




$message2  = '';
$message2 .= "Test." . "\n";

$to2 = $email;
$cc2 = '';
$cc2 .= '';
$subject2 = "Test";
$header2 = "From: test@test";


if (mail($to2,$subject2, $message2, $header2)) {
  echo '<p>Thanks! A confirmation e-mail has been sent.<br/><a href="http://demojs.org">back demojs.org</a></p>';
} else {
   echo '<p>Oops, an error occured. Please contact us directly: <a href="mailto:contact@demojs.org">contact@demojs.org</a>.';
}


$message  = '';
$message .= "Nouvel inscrit" . "\n";     
$message .= "E-mail: " . $email . "\n";
$to = "jc@gatuingt.com";
$cc = '';
$cc .= '';
$subject = "Nouvel inscrit !";
$header = "From: contact@demojs.org";
mail($to,$subject, $message, $header);
        
        // DON'T BOTHER CONTINUING TO THE HTML...
        die();
    
    
    
?>
