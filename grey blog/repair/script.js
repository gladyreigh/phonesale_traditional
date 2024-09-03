document.getElementById('repairForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneModel = document.getElementById('phoneModel').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const address = document.getElementById('address').value;
    const message = document.getElementById('message').value;

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
        const response = await sendEmail(email, emailMessage, phoneModel);
        if (response.ok) {
            alert('Request sent successfully!');
        } else {
            alert('Failed to send requst.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred.');
    }
});

async function sendEmail(to, message, phoneModel) {
    const smtpEndpoint = 'https://api.smtp2go.com/v3/email/send';
    const apiKey = 'api-AF4BE98C43FF422EAC600E6C9CF3C5C8';
    const fromName = 'PhoneSale';
    const fromEmail = 'support@phonesale.org';

    const body = JSON.stringify({
        api_key: apiKey,
        to: [to, 'grey@phonesale.org'],
        sender: `${fromName} <${fromEmail}>`,
        subject: 'Contact Request: ' + phoneModel,
        html_body: message,
    });

    const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
    };

    const response = await fetch(smtpEndpoint, init);
    return response;
}


document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = '../';  // Redirect to the parent directory
});