# 🛡️ Firebase User Role Manager

> Easily manage Firebase user roles through a sleek, modern dashboard. Perfect for developers who want to handle user permissions without touching code.

![Beautiful Dark Mode Interface](/public/img/preview.png)

Ever struggled with managing Firebase user roles? This tool makes it a breeze! With our intuitive dashboard, you can assign admin and moderator roles to your users with just a few clicks.

## ✨ What's Inside

- Beautiful dark mode interface for those late-night coding sessions
- Real-time user stats at your fingertips
- Super simple role management - just point and click
- Secure and reliable - built on Firebase Admin SDK
- Fast and responsive - because nobody likes waiting

## 🚀 Quick Start

Got 5 minutes? Let's get you up and running!

### 1. First Things First

Make sure you've got these installed:
- Node.js - the newer the better!
- npm (comes with Node.js)
- A Firebase project with Authentication turned on

### 2. Let's Get Started!

```bash
# Clone this bad boy
git clone https://github.com/ShashiLab/firebase-role-manager.git

# Jump into the project
cd firebase-role-manager

# Install the goodies
npm install
```

### 3. The Important Part - Your Firebase Keys 🔑

1. Head over to your [Firebase Console](https://console.firebase.google.com)
2. Pick your project
3. Find Project Settings > Service Accounts
4. Click that "Generate New Private Key" button
5. Save it as `serviceAccountKey.json` in your project folder

> 🚨 Keep this key secret! Add it to your `.gitignore` to avoid accidentally sharing it.

### 4. Fire It Up! 🔥

```bash
# Start the magic
npm start

# Look at it go at http://localhost:3000
```

## 📁 What's Where

```
your-awesome-project/
├── public/           # The pretty stuff
├── server.js         # The brain
└── serviceAccountKey.json  # Your secret key (you'll create this)
```

## 🛠️ Need to Stop or Restart?

```bash
# To stop: Just hit Ctrl+C

# To start again:
npm start

# Want a different port?
PORT=4000 npm start
```

## 🤔 Running Into Trouble?

Don't worry, we've got your back! Here are some common hiccups:

### "Firebase Won't Initialize!"
- Double-check that `serviceAccountKey.json` is in the right spot
- Make sure your key has the right permissions
- Check if the JSON is valid (no extra spaces or missing quotes!)

### "Port Already in Use!"
Someone's already using port 3000. Either:
- Stop what's using it
- Use a different port (see above)

## 💡 Pro Tips

1. Always keep your `serviceAccountKey.json` private
2. Back up your key somewhere safe
3. Consider adding extra security in production
4. Keep an eye on those user roles!

## 🤝 Want to Help?

Awesome! We love contributions! Here's how:

1. Fork it
2. Create your feature branch
3. Make your changes
4. Send a pull request

## 📝 License

MIT License - do pretty much whatever you want with it!

## 🙋‍♂️ Need Help?

- Create an issue - we'll look into it
- Star the repo if you like it!
- Share it with others who might find it useful

---

Made with ❤️ by [ShashiLab](https://github.com/ShashiLab), for developers. Happy coding! 

#firebase #nodejs #webdev #opensource #javascript