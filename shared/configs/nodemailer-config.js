import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS  
    },
    tls: {
        rejectUnauthorized: false 
    }
});

export const sendEmail = async ({ email, subject, url, message }) => {
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: subject,
    html: `<p>${message} <a href="${url}">${url}</a></p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Письмо отправлено на ${email}`);
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
  }
};

