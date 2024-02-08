import nodemailer from 'nodemailer';

console.log(process.env.SMTP_USER)

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

export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `https://inctagram-front.vercel.app/auth/password-reset?code=${token}`;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Смена пароля',
    html: `<p>Для смены пароля перейдите по ссылке: <a href="${resetUrl}">${resetUrl}</a></p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Ссылка для сброса пароля отправлена на ${email}`);
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
  }
};
