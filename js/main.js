
      const accountSid = "ACa15c3f0b94e0133a2c3fa37a215028c3";
  const authToken = "9400722d2d05b9cf164b41443328d43c";
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: "Your appointment is coming up on July 21 at 3PM",
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5215524194434",
    })
    .then((message) => console.log(message.sid));
