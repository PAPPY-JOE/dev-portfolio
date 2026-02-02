# Portfolio Admin Panel - Usage Guide

## 🚀 Quick Start

### Demo Mode (No Firebase)
The admin panel works out of the box with localStorage for testing:
- **URL**: `/admin` or click "Admin" in navigation when logged in
- **Demo Credentials**: 
  - Email: `fatoyejoseph@gmail.com`
  - Password: `admin123`

### Production Mode (Firebase)
For live deployment with real-time sync across devices:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** (Email/Password provider)
3. Enable **Firestore Database**
4. Add your config to environment variables (see Firebase Setup below)

---

## 🔥 Firebase Setup

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project" and follow the wizard
3. Once created, click the web icon (`</>`) to add a web app
4. Copy the configuration object

### Step 2: Enable Authentication
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Go to **Users** tab and add your admin user:
   - Email: `fatoyejoseph@gmail.com` (or your email)
   - Password: Your secure password

### Step 3: Enable Firestore
1. Go to **Firestore Database** → **Create database**
2. Start in **production mode**
3. Choose a location close to your users

### Step 4: Set Firestore Rules
In Firestore → Rules, use these security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access to portfolio content
    match /portfolio/content {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Step 5: Configure Environment Variables
Create a `.env` file in your project root:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 📬 Messages Management

The Messages section allows you to manage contact form submissions from your portfolio visitors.

### Viewing Messages
- Messages are displayed in reverse chronological order (newest first)
- Each message shows:
  - Sender's name and email
  - Message preview
  - Timestamp (relative time like "2h ago")
  - Status badge (New, Read, Responded)

### Message Statuses
- **New** (green): Unread message, just received
- **Read** (yellow): You've viewed the message
- **Responded** (blue): You've replied to this message

### Actions
- **Reply via Email**: Opens your default email client with a pre-filled reply
- **Mark Responded**: Update status after you've replied
- **Mark as New**: Reset status if needed
- **Delete**: Permanently remove the message

### Admin Notes
- Click on the notes area to add private notes about a message
- Notes are only visible in the admin panel
- Use for tracking follow-ups, reminders, or context

### Firebase Setup for Messages
Add this Firestore rule to allow message submissions:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Portfolio content
    match /portfolio/content {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Contact messages
    match /messages/{messageId} {
      allow create: if true;  // Anyone can submit
      allow read, update, delete: if request.auth != null;  // Only admin can manage
    }
  }
}
```

---

## 📝 Admin Panel Sections

### 1. Hero Section
Edit the main landing area:
- **Name**: Your full name (displayed prominently)
- **Title**: Your job title (e.g., "Frontend Engineer")
- **Subtitle**: A tagline or brief description
- **Location**: Where you're based
- **Short Bio**: Brief intro shown in terminal animation
- **Profile Image**: URL to your headshot photo

### 2. About Section
Edit your detailed profile:
- **Full Bio**: Comprehensive professional summary
- **About Image**: Secondary photo for the about section
- **Education**: School, degree, GPA, and achievements

### 3. Projects
Manage your portfolio projects:
- **Add/Edit/Delete** projects
- **Title & Filename**: Project name and display filename
- **Descriptions**: Short and full descriptions
- **Project Image**: Screenshot or landing page image URL
- **Tech Stack**: Comma-separated technologies
- **Features**: One feature per line
- **Links**: Demo and repository URLs
- **Published**: Toggle visibility on the public site

### 4. Experience
Manage work history:
- **Company & Role**: Where you worked and your position
- **Period**: Date range (e.g., "Jan 2024 – Apr 2024")
- **Location**: Office location or "Remote"
- **Description**: Brief role summary
- **Achievements**: One achievement per line

### 5. Skills
Manage skill categories:
- **Category Name**: Group name (e.g., "Frontend", "Languages")
- **Skills**: Add individual skills with proficiency levels (1-5)
- Proficiency is displayed as progress bars: █████ (5) to █░░░░ (1)

### 6. Social Links
Update contact information:
- **Email**: Your contact email
- **Phone**: Your phone number
- **GitHub**: Full URL to your GitHub profile
- **LinkedIn**: Full URL to your LinkedIn profile

---

## 🖼️ Image URLs Guide

The admin panel accepts any direct image URL. Here are recommended sources:

### Cloudinary (Recommended)
1. Upload to [cloudinary.com](https://cloudinary.com)
2. Copy the delivery URL


### Imgur
1. Upload to [imgur.com](https://imgur.com)
2. Right-click image → "Copy image address"
3. Use the direct link (ends in .jpg, .png, etc.)

### GitHub
1. Add image to a public repository
2. Click "Raw" and copy the URL

### Tips for Images
- **Profile photos**: Square aspect ratio, at least 400x400px
- **Project screenshots**: 16:9 or similar, at least 1200x675px
- **File size**: Keep under 2MB for fast loading
- **Format**: JPEG for photos, PNG for screenshots with text

---

## 🔄 Real-Time Updates

When Firebase is configured:
- Changes save instantly to Firestore
- Multiple devices see updates in real-time
- No page refresh needed
- Offline changes sync when back online

Without Firebase (demo mode):
- Changes save to browser localStorage
- Data persists in that browser only
- Clearing browser data will reset to defaults

---

## 🛡️ Security Best Practices

1. **Use strong passwords** for Firebase Authentication
2. **Never commit** `.env` files to version control
3. **Review Firestore rules** before deploying
4. **Enable 2FA** on your Firebase account
5. **Monitor usage** in Firebase Console

---

## 🐛 Troubleshooting

### "Access Denied" on login
- Check email/password are correct
- In demo mode: use `fatoyejoseph@gmail.com` / `admin123`
- In Firebase mode: ensure user exists in Authentication

### Images not loading
- Verify URL is a direct image link (not a webpage)
- Check image is publicly accessible
- For Google Drive, ensure sharing is set to "Anyone with the link"

### Changes not saving
- Check browser console for errors
- Verify Firebase config is correct
- Check Firestore rules allow writes

### Content reset unexpectedly
- In demo mode, clearing browser data resets content
- Use Firebase for persistent storage

---

## 📞 Support

For issues or questions:
- Email: fatoyejoseph@gmail.com
- GitHub: [PAPPY-JOE](https://github.com/PAPPY-JOE)