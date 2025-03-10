<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form fields
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $subject = $_POST["subject"];

    // Set email details
    $to = "contact@" . $_SERVER['HTTP_HOST'];
    $email_subject = "New Contact Form Submission";
    
    // Build email body
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Subject: $subject\n";

    // Set headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    mail($to, $email_subject, $body, $headers);

    // Also handle newsletter subscription if checked
    if(isset($_POST["newsletter-consent"]) && $_POST["newsletter-consent"] == "on") {
        // Add subscriber logic here
        $subscriber_body = "New newsletter subscriber:\n";
        $subscriber_body .= "Email: $email\n";
        $subscriber_body .= "Name: $name\n";
        mail($to, "New Newsletter Subscriber", $subscriber_body, $headers);
    }

    // Redirect to thank you page
    header("Location: thanks.html");
    exit();
}
?>
