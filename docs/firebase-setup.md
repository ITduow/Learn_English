# Firebase setup for IELTS Daily Vocabulary

## 1. Create a Firebase project

1. Open Firebase Console.
2. Create a new project.
3. Add a Web App to the project.

## 2. Enable Google Sign-In

1. Go to Authentication.
2. Open Sign-in method.
3. Enable Google.
4. Add authorized domains:
   - `localhost`
   - `ITduow.github.io`

## 3. Create Cloud Firestore

1. Go to Firestore Database.
2. Create database.
3. Choose production mode.
4. Select a region near your users.

## 4. Add Firestore rules

Paste the rules from `firestore.rules`:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## 5. Create local environment file

Copy `.env.example` to `.env` and fill in your Firebase web config:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Do not commit `.env` to GitHub. Commit only `.env.example`.

## 6. Run locally

```bash
npm install
npm run dev
```

Open the local URL and test Google login.

## 7. Deploy to GitHub Pages

This project already uses:

- `base: "/Learn_English/"` in `vite.config.js`
- `HashRouter` for GitHub Pages refresh safety

Deploy:

```bash
npm run build
npm run deploy
```

The expected URL is:

```txt
https://ITduow.github.io/Learn_English/
```
