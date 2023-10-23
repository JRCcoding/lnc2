const nodemailer = require('nodemailer')

export default async function POST(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, number, message } = req.body

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'lncsstreats@gmail.com',
          pass: 'hlqx xanf azdt lsfh',
        },
      })

      const mailOptions = {
        from: 'lnctreats.com',
        to: 'lncsstreats@gmail.com',
        subject: 'Contact Form from: ' + name,
        text: `
          Number: ${number}
          Message: ${message}
        `,
      }

      await transporter.sendMail(mailOptions)
      res.status(200).json({ message: 'Email sent successfully' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Email sending failed' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
