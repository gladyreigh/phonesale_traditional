// Event listener for form submission
document.getElementById('repairForm').addEventListener('submit', async function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Retrieve values from form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneModel = document.getElementById('phoneModel').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const address = document.getElementById('address').value;
    const message = document.getElementById('message').value;

    // Create the HTML content for the email message
    const emailMessage = `
        <h2>Repair Request</h2>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out. We have received your request. We will contact you shortly about your repair request.</p>
        <p><strong>Phone Model:</strong> ${phoneModel}</p>
        <p><strong>Mobile Number:</strong> ${mobileNumber}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Message:</strong> ${message}</p>
    `;

    try {
        // Call the sendEmail function to send the email
        const response = await sendEmail(email, emailMessage, phoneModel);
        
        // Check if the email was sent successfully
        if (response.ok) {
            alert('Request sent successfully!');
        } else {
            alert('Failed to send request.');
        }
    } catch (error) {
        // Log any errors and show an alert
        console.error('Error:', error);
        alert('An error occurred.');
    }
});

// Function to send an email using SMTP2GO
async function sendEmail(to, message, phoneModel) {
    const smtpEndpoint = 'https://api.smtp2go.com/v3/email/send';
    const apiKey = 'api-AF4BE98C43FF422EAC600E6C9CF3C5C8'; // Replace with your API key
    const fromName = 'PhoneSale';
    const fromEmail = 'support@phonesale.org';

    // Create the email body
    const body = JSON.stringify({
        api_key: apiKey,
        to: [to, 'grey@phonesale.org'], // Recipient email addresses
        sender: `${fromName} <${fromEmail}>`,
        subject: 'Contact Request: ' + phoneModel,
        html_body: message,
    });

    // Set up the fetch request options
    const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
    };

    // Send the email using fetch
    const response = await fetch(smtpEndpoint, init);
    return response;
}

// Event listener for the back button
document.getElementById('backButton').addEventListener('click', function() {
    // Redirect to the parent directory
    window.location.href = '../';  
});
