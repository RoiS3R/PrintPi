// Email configuration settings
const imapConfig = {
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASS,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  tls: process.env.SMTP_TLS === 'true',
  tlsOptions: { rejectUnauthorized: process.env.SMTP_IGNORETLS !== 'true' },
};
console.log(imapConfig);
export default imapConfig;
