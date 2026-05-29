import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import crypto from "crypto";

// Use an environment variable or default secure key
const JWT_SECRET = process.env.JWT_SECRET || 'usllc_online_launch_and_shield_secret_key_2026';

// Helper to sign a lightweight JWT-like token server-side using Node's native crypto module
function signToken(payload: object): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

// Predefined set of credentials mapping to roles for transparent evaluation
const PREDEFINED_USERS = [
  {
    email: 'superadmin@usllc.online',
    password: 'superadmin-secret-access',
    role: 'superadmin',
    name: 'Chief Executive Governor'
  },
  {
    email: 'admin@usllc.online',
    password: 'admin-secret-access',
    role: 'admin',
    name: 'Chief Admin Counsel'
  },
  {
    email: 'staff@usllc.online',
    password: 'staff-secret-access',
    role: 'staff',
    name: 'Senior Operations Staff'
  },
  {
    email: 'user@usllc.online',
    password: 'user-secret-access',
    role: 'user',
    name: 'Beta Corporate Founder'
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server credentials parsing route
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are both strictly required" });
    }

    const matchedUser = PREDEFINED_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!matchedUser) {
      return res.status(401).json({ error: "Invalid email address or secret password combination" });
    }

    // Sign the secure session token containing user details and access role
    const token = signToken({
      email: matchedUser.email,
      role: matchedUser.role,
      name: matchedUser.name,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 Hours expiry
    });

    return res.json({
      success: true,
      token,
      email: matchedUser.email,
      role: matchedUser.role,
      name: matchedUser.name
    });
  });

  // Secure Legal Operations state audit endpoint
  app.get("/api/admin/metrics", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Access Denied: Missing authorization session token" });
    }
    const token = authHeader.split(' ')[1];
    
    try {
      const [header, body, signature] = token.split('.');
      const expectedSignature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
      if (signature !== expectedSignature) {
        return res.status(401).json({ error: "Access Denied: Compulsory security signature match failed" });
      }
      
      const sessionData = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
      if (sessionData.role !== 'admin' && sessionData.role !== 'staff' && sessionData.role !== 'superadmin') {
        return res.status(403).json({ error: "Access Denied: Insufficient roles permissions level" });
      }

      // High fidelity mock telemetry & filing queue information
      return res.json({
        totalFilingsSubmitted: 1482,
        unreviewedInquiriesStaged: 4,
        usptoClearanceWarnings: 2,
        activeReservations: 119,
        securityStatus: "SECURE INGRESS",
        systemLoad: "0.12 - OK",
        activeFilingStates: ["DE", "WY", "TX", "CA", "FL"],
        latestFilings: [
          { company: "WebFlow Inc.", state: "DE", type: "C-Corp", date: "2026-05-22", status: "Review Complete" },
          { company: "Wanderlust LLC", state: "WY", type: "LLC", date: "2026-05-22", status: "USPTO Screen Pending" },
          { company: "SaaSSkul Devs", state: "TX", type: "LLC", date: "2026-05-21", status: "Filing Dispatched" }
        ]
      });
    } catch (e) {
      return res.status(401).json({ error: "Access Denied: Invalid authentication signature state" });
    }
  });

  // Vite development server middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
