# 🚀 ShareHub - Secure File Sharing Platform

[![Node.js](https://img.shields.io/badge/Node.js-16.x+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.x-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Storage-3448C5?style=flat&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

> A full-stack, secure file-sharing application with password protection, expiration controls, and real-time analytics. Built to demonstrate modern backend development practices.

---

## 🌐 Live Demo

**🔗 [View Live Application](https://sharehub-6gj8.onrender.com/)**

> **Note:** First load may take 30-60 seconds due to Render's free tier cold start.

---

## 📸 Screenshots

### Upload Interface

![Upload Page](screenshots/upload-page.png)
_Clean, intuitive file upload interface with security options_

### Success Page with Shareable Link

![Success Page](screenshots/success-page.png)
_Shareable link with QR code for easy mobile access_

### Password Protection

![Password Page](screenshots/password-page.png)
_Secure password verification before file access_

### Download Page

![Download Page](screenshots/download-page.png)
_File information and download interface_

### Dashboard

![Dashboard](screenshots/dashboard.png)
_Manage all your uploaded files in one place_

---

## ✨ Key Features

### 🔐 Security First

- **Password Protection** - Bcrypt-hashed passwords for optional file security
- **Rate Limiting** - Prevents abuse with upload throttling (5 uploads/15min)
- **File Validation** - Server-side type and size checks (10MB limit)
- **Session Management** - Secure session handling with MongoDB store

### ⏰ Smart File Management

- **Automatic Expiration** - Files auto-delete after 24/48/72 hours
- **Download Limits** - Set maximum download counts per file
- **Hourly Cleanup** - Cron job removes expired files automatically
- **Manual Deletion** - Users can delete files anytime from dashboard

### 🎯 User Experience

- **Unique Shareable Links** - Short, memorable URLs using nanoid
- **QR Code Generation** - Instant QR codes for mobile sharing
- **Real-time Analytics** - Track download counts per file
- **Responsive Design** - Works seamlessly on all devices

---

## 🛠️ Tech Stack

### Backend

| Technology     | Purpose             | Why Chosen                               |
| -------------- | ------------------- | ---------------------------------------- |
| **Node.js**    | Runtime Environment | Asynchronous, event-driven architecture  |
| **Express.js** | Web Framework       | Minimal, flexible routing and middleware |
| **MongoDB**    | Database            | Document-based storage for file metadata |
| **Mongoose**   | ODM                 | Schema validation and query building     |

### Cloud Services

| Service           | Purpose             | Benefits                                |
| ----------------- | ------------------- | --------------------------------------- |
| **Cloudinary**    | File Storage        | CDN, image optimization, 25GB free tier |
| **MongoDB Atlas** | Database Hosting    | Managed service, 512MB free tier        |
| **Render**        | Application Hosting | Easy deployment, auto-scaling           |

### Key Libraries

- **Multer** - Multipart form data handling for file uploads
- **Bcrypt** - Industry-standard password hashing (10 rounds)
- **Nanoid** - Collision-resistant unique ID generation
- **QRCode** - QR code generation for mobile sharing
- **Node-cron** - Scheduled cleanup tasks
- **Express-session** - Session persistence across requests
- **Express-rate-limit** - API rate limiting middleware

---

## 📊 System Architecture

```
┌─────────────┐
│   Client    │
│  (Browser)  │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│   Express Server    │
│  ┌───────────────┐  │
│  │  Rate Limiter │  │
│  └───────┬───────┘  │
│          │          │
│  ┌───────▼───────┐  │
│  │    Multer     │  │
│  │  Middleware   │  │
│  └───────┬───────┘  │
│          │          │
│  ┌───────▼───────┐  │
│  │ Controllers   │  │
│  └───────┬───────┘  │
└──────────┼──────────┘
           │
     ┌─────┴─────┐
     │           │
┌────▼───┐  ┌───▼──────┐
│MongoDB │  │Cloudinary│
│ Atlas  │  │   CDN    │
└────────┘  └──────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- MongoDB installed locally OR MongoDB Atlas account
- Cloudinary account (free tier)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/KshitizMainaly/ShareHub.git
   cd ShareHub
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   PORT=4000
   NODE_ENV=development

   # MongoDB (Local or Atlas)
   MONGODB_URI=mongodb://localhost:27017/ShareHub
   # OR: mongodb+srv://username:password@cluster.mongodb.net/ShareHub

   # Cloudinary (Get from https://cloudinary.com/console)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Session
   SESSION_SECRET=your_super_secret_random_string_change_this

   # Base URL (change for production)
   BASE_URL=http://localhost:4000
   ```

4. **Get your Cloudinary credentials**
   - Sign up at [cloudinary.com](https://cloudinary.com/)
   - Go to Dashboard
   - Copy Cloud Name, API Key, and API Secret

5. **Set up MongoDB**

   **Option A - Local MongoDB:**

   ```bash
   # Make sure MongoDB is running
   mongod
   ```

   **Option B - MongoDB Atlas (Recommended):**
   - Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create free M0 cluster (512MB)
   - Whitelist IP: `0.0.0.0/0` (for development)
   - Get connection string

6. **Run the application**

   ```bash
   # Development mode (with auto-restart)
   npm run dev

   # Production mode
   npm start
   ```

7. **Access the application**
   ```
   http://localhost:4000
   ```

---

## 📁 Project Structure

```
ShareHub/
├── app.js                      # Main application entry point
├── package.json                # Dependencies and scripts
├── .env                        # Environment variables (not in Git)
├── .gitignore                  # Git ignore rules
│
├── config/
│   ├── database.js             # MongoDB connection
│   └── cloudinary.js           # Cloudinary configuration
│
├── models/
│   └── File.js                 # Mongoose file schema
│
├── routes/
│   ├── upload.js               # Upload endpoints
│   ├── download.js             # Download endpoints
│   ├── dashboard.js            # Dashboard routes
│   └── delete.js               # Delete operations
│
├── controllers/
│   ├── uploadController.js     # Upload business logic
│   ├── downloadController.js   # Download logic
│   ├── dashboardController.js  # Dashboard logic
│   └── deleteController.js     # Delete operations
│
├── middleware/
│   ├── upload.js               # Multer configuration
│   ├── rateLimiter.js          # Rate limiting
│   └── errorHandler.js         # Error handling
│
├── utils/
│   └── cronJobs.js             # Scheduled cleanup tasks
│
├── public/
│   ├── css/
│   │   └── style.css           # Application styles
│   └── js/
│       └── main.js             # Client-side JavaScript
│
└── views/                      # EJS templates
    ├── partials/
    │   ├── header.ejs          # Reusable header
    │   └── footer.ejs          # Reusable footer
    ├── index.ejs               # Upload page
    ├── success.ejs             # Success page
    ├── download.ejs            # Download page
    ├── password.ejs            # Password verification
    ├── dashboard.ejs           # File management
    └── error.ejs               # Error page
```

---

## 🔌 API Endpoints

| Method   | Endpoint                   | Description                         | Rate Limit |
| -------- | -------------------------- | ----------------------------------- | ---------- |
| `GET`    | `/`                        | Homepage (upload interface)         | -          |
| `POST`   | `/upload`                  | Upload file with options            | 5/15min    |
| `GET`    | `/upload/success/:fileId`  | Upload confirmation page            | -          |
| `GET`    | `/download/:fileId`        | Download page or password prompt    | -          |
| `POST`   | `/download/:fileId/verify` | Verify password for protected files | -          |
| `GET`    | `/dashboard`               | View user's uploaded files          | -          |
| `DELETE` | `/delete/:fileId`          | Delete specific file                | -          |

---

## 💾 Database Schema

### File Collection

```javascript
{
  filename: String,              // Cloudinary filename
  originalName: String,          // Original uploaded name
  fileUrl: String,               // Cloudinary CDN URL
  fileId: String,                // Unique short ID (indexed)
  cloudinaryPublicId: String,    // For deletion from Cloudinary
  size: Number,                  // File size in bytes
  mimetype: String,              // MIME type
  password: String,              // Bcrypt hash (optional)
  downloadCount: Number,         // Download counter
  maxDownloads: Number,          // Download limit (optional)
  expiresAt: Date,               // Expiration time (indexed)
  createdAt: Date                // Upload timestamp
}
```

**Indexes:**

- `fileId` - Unique index for fast lookups
- `expiresAt` - For efficient cleanup queries

---

## 🌐 Deployment to Render

### Step-by-Step Guide

1. **Prepare Repository**

   ```bash
   # Ensure .env is in .gitignore
   git add .
   git commit -m "feat: prepare for deployment"
   git push origin main
   ```

2. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** `ShareHub` (or your preferred name)
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Instance Type:** `Free`

4. **Add Environment Variables**

   In Render dashboard, add these variables:

   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_uri
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   SESSION_SECRET=your_session_secret
   BASE_URL=https://your-app-name.onrender.com
   ```

   ⚠️ **Important:** Leave `PORT` empty - Render sets this automatically

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for initial deployment
   - Access your live app at the provided URL!

### Post-Deployment

- Update `BASE_URL` in README with your live link
- Add screenshots of the working application
- Test all features in production
- Monitor logs in Render dashboard

---

## 🧪 Testing Checklist

### Upload Functionality

- [x] Upload file without password
- [x] Upload file with password protection
- [x] Set expiration time (24/48/72 hours)
- [x] Set download limit
- [x] Verify file size limit (>10MB rejected)
- [x] Test rate limiting (6th upload blocked)

### Download Functionality

- [x] Download public file
- [x] Download password-protected file
- [x] Verify download counter increments
- [x] Expired file shows error
- [x] Download limit reached shows error

### Dashboard

- [x] View all uploaded files
- [x] Copy shareable links
- [x] Delete files manually
- [x] Empty state display

### Security

- [x] Invalid password rejected
- [x] Expired files inaccessible
- [x] Non-existent file IDs return 404
- [x] Rate limiting active

---

## 🎓 What I Learned

Building ShareHub helped me master:

### Backend Development

- RESTful API design and implementation
- File upload/download handling with streams
- Cloud storage integration (Cloudinary)
- Database modeling and optimization
- Session management and persistence

### Security

- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting strategies
- Secure environment variable management
- Session security best practices

### DevOps

- Environment configuration
- Scheduled tasks with cron jobs
- Application deployment (Render)
- Cloud database setup (MongoDB Atlas)
- Monitoring and error handling

### Architecture

- MVC pattern implementation
- Middleware design
- Error handling strategies
- Separation of concerns
- Scalable folder structure

---

## 🔒 Security Features

| Feature                | Implementation                    | Benefit                    |
| ---------------------- | --------------------------------- | -------------------------- |
| **Password Hashing**   | Bcrypt with 10 rounds             | Secure password storage    |
| **File Validation**    | Type and size checks              | Prevents malicious uploads |
| **Rate Limiting**      | 5 uploads per 15 minutes          | Prevents spam/abuse        |
| **Session Security**   | MongoDB store with secure cookies | Safe session handling      |
| **Auto Expiration**    | Cron job cleanup                  | Automatic data lifecycle   |
| **Input Sanitization** | Express built-in parsers          | XSS prevention             |

---

## 📈 Performance Optimizations

- **CDN Delivery** - Cloudinary automatically serves files via CDN
- **Database Indexing** - Indexed queries on `fileId` and `expiresAt`
- **Session Store** - MongoDB session persistence for scalability
- **Efficient Cleanup** - Hourly cron job removes expired files
- **Rate Limiting** - Prevents server overload

---

## 🚧 Known Limitations

- **Free Tier Constraints:**
  - Render: App sleeps after 15 min inactivity (30-60s cold start)
  - MongoDB Atlas: 512MB storage (~50,000 file records)
  - Cloudinary: 25GB storage + 25GB bandwidth/month
- **File Size:** 10MB maximum per file
- **No User Authentication:** Uses session-based file tracking
- **No Email Notifications:** Would require email service integration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Development Notes

**Built with guidance from AI-assisted tools (Cursor)** while maintaining full understanding and control of the codebase. All architectural decisions, feature implementations, and code organization were directed by me.

### Commit Conventions

Following conventional commits:

```
feat: new feature
fix: bug fix
refactor: code refactoring
docs: documentation updates
style: formatting changes
test: adding tests
chore: maintenance tasks
```

## 👤 Author

- 💼 LinkedIn: [linkedin.com/in/kshitiz-mainaly](https://www.linkedin.com/in/kshitiz-mainali/)
- 🐙 GitHub: [@KshitizMainaly](https://github.com/KshitizMainaly/)
- 📧 Email: kshitizmainaly3334@gmail.com

---

## 🙏 Acknowledgments

- [Express.js Documentation](https://expressjs.com/) - Web framework guidance
- [Cloudinary Node SDK](https://cloudinary.com/documentation/node_integration) - Cloud storage implementation
- [MongoDB Docs](https://docs.mongodb.com/) - Database best practices
- [Render Documentation](https://render.com/docs) - Deployment guidance

---

## 📞 Support

If you find any issues or have questions:

1. Check the [Issues](https://github.com/KshitizMainaly/ShareHub/issues) page
2. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)

<div align="center">

**Built with ❤️ for learning and demonstrating full-stack development skills**

[⬆ Back to Top](#-ShareHub---secure-file-sharing-platform)

</div>
