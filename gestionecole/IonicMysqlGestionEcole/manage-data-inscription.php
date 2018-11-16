<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin");
   // Define database connection parameters
   $hn      = 'localhost';
   $un      = 'root';
   $pwd     = '';
   $db      = 'gestionecole';
   $cs      = 'utf8';

   // Set up the PDO parameters
   $dsn 	= "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
   $opt 	= array(
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                       );
   // Create a PDO instance (connect to the database)
   $pdo 	= new PDO($dsn, $un, $pwd, $opt);


   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);
   $key     =  strip_tags($obj->key);


   // Determine which mode is being requested
   switch($key)
   {

      // Add a new record to the eleve table
      case "create":

         // Sanitise URL supplied values
         $nomEl 		     = filter_var($obj->nomEl, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $prenomEl	  = filter_var($obj->prenomEl, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $dateNaisEl     = filter_var($obj->dateNaisEl, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

         // Attempt to run PDO prepared statement
         try {
            $sql 	= "INSERT INTO inscription(inscription,eleve,classe ) VALUES(:inscription, :eleve,:classe)";
            $stmt 	= $pdo->prepare($sql);
            $stmt->bindParam(':inscription', $nomEl, PDO::PARAM_STR);
            $stmt->bindParam(':eleve', $prenomEl, PDO::PARAM_STR);
            $stmt->bindParam(':classe', $dateNaisEl, PDO::PARAM_STR);

            $stmt->execute();

            echo json_encode(array('message' => 'Congratulations the record ' . $inscription . ' was added to the database'));
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;



      // Update an existing record in the eleve table
      case "update":

         // Sanitise URL supplied values
         $inscription 		     = filter_var($obj->inscription, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $eleve	  = filter_var($obj->eleve, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $dateNaisEl     = filter_var($obj->classe, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $recordID	     = filter_var($obj->recordID, FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {
            $sql 	= "UPDATE inscription SET inscription = :inscription, eleve = :eleve, classe=:classe WHERE id = :recordID";
            $stmt 	=	$pdo->prepare($sql);
            $stmt->bindParam(':inscription', $inscription, PDO::PARAM_STR);
            $stmt->bindParam(':eleve', $eleve, PDO::PARAM_STR);
            $stmt->bindParam(':classe', $classe, PDO::PARAM_STR);
            $stmt->bindParam(':recordID', $recordID, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode('Congratulations the record ' . $inscription . ' was updated');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;



      // Remove an existing record in the eleve table
      case "delete":

         // Sanitise supplied record ID for matching to table record
         $recordID	=	filter_var($obj->recordID, FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {
            $pdo 	= new PDO($dsn, $un, $pwd);
            $sql 	= "DELETE FROM inscription WHERE id = :recordID";
            $stmt 	= $pdo->prepare($sql);
            $stmt->bindParam(':recordID', $recordID, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode('Congratulations the record ' . $inscription . ' was removed');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;
   }

?>