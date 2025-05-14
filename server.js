import express from 'express';
import cors from 'cors';
import { generateRegistrationOptions } from '@simplewebauthn/server';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth/webauthn/register-options', async (req, res) => {
  try {
    console.log('Received POST /api/auth/webauthn/register-options');
    const user = {
      id: Buffer.from('user-id-123'),
      name: 'user@example.com',
      displayName: 'User Example',
    };

    const options = await generateRegistrationOptions({
      rpName: 'StellarPay',
      rpID: 'localhost',
      userID: user.id,
      userName: user.name,
      userDisplayName: user.displayName,
      attestationType: 'none',
      authenticatorSelection: {
        userVerification: 'preferred',
      },
    });

    console.log('Options:', options);
    res.json(options);
  } catch (err) {
    console.error('Error in /register-options:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(8080, '0.0.0.0', () => console.log('Server running on http://0.0.0.0:8080')); 