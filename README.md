# 🚀 Running Angular 17 Project on Windows

This guide explains how to set up your Windows machine and run an Angular 17 project.

---

## ✅ 1. Install Node.js (v18.x or newer)

Angular 17 requires Node.js version **18.x** or **20.x**.

- Download from: [https://nodejs.org](https://nodejs.org)
- Install the **LTS** version and keep the default options.
- After installation, verify:

```bash
node -v
npm -v
```

---

## ✅ 2. Install Angular CLI

Install Angular CLI globally using npm:

```bash
npm install -g @angular/cli@17
```

Check if it installed correctly:

```bash
ng version
```

---

## ✅ 3. Install Project Dependencies

Navigate to your Angular project folder:

```bash
cd path/to/your-project
```

Install all dependencies:

```bash
npm install
```

---

## ✅ 4. Run the Project

Start the development server:

```bash
ng serve
```

The app will be available at:

```
http://localhost:4200
```

---

## 📝 Notes

- Make sure you are using Node 18 or later. You can switch versions using [nvm for Windows](https://github.com/coreybutler/nvm-windows) if needed.
- The `package.json` must be correctly configured with Angular 17 dependencies.