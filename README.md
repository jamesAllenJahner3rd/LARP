# 🏰 Eldarlands LARP - Interactive Fantasy Storytelling

**Eldarlands LARP** is a Live-Action Role-Playing community based in **Cherokee Village, Arkansas**, focused on collaborative storytelling, immersive character development, and padded-weapon combat. This website serves as a central hub for players to explore the fantasy world of **Ur**, learn the rules, and stay informed about weekly gatherings and special events.

---

## ⚔️ What is Eldarlands LARP?

Eldarlands offers an interactive fantasy experience where participants physically act out the roles of their characters. It’s a game of **make-believe and storytelling**, distinct from any real-world rituals, and centered on **fun, safe, and structured combat**.

Players wear costumes, create rich character backstories, and contribute to an evolving shared narrative set in a magical world of myth and heroic deeds.

---

## ✨ Features

### For Players & Prospective Players

- **World Lore and Storyline**  
  Dive into the history of Ur, its chaotic magical realms, and the ongoing narrative shaped by player actions. Stay updated on major plot points like the destruction of the Outpost.

- **Game Rules**  
  Access comprehensive rules for combat, character creation, and role-playing to ensure a safe and enjoyable experience.

- **Character Building**  
  Create unique characters with detailed backstories, skills, morals, and relationships. The game encourages deep immersion and personal growth through role-play.

- **Event Information**  
  Get details on upcoming special events, including dates, locations (e.g., Hardy, AR), and camping options.

- **Regular Gathering Details**  
  Learn about weekly meetups at **Cedar Valley Park** in Cherokee Village, AR.

- **Community Building**  
  Discover a welcoming atmosphere for new players. The site addresses common misconceptions about LARP and encourages participation from all age groups.

- **Contact and Information**  
  Reach out to the founder, **Levi Samuel**, via the provided email address for questions or more info.

---

### For the Community

- **Founder's Message**  
  A personal welcome from Levi Samuel, emphasizing the spirit of interactive storytelling and the inclusive nature of LARPing.

- **Clarification of Misconceptions**  
  Addresses stereotypes about LARPers, explaining that Eldarlands is a form of creative play governed by safety and structure.

- **Event Site Information**  
  Includes the physical address of the **Eldarlands LARP Event Site**, a key location for major events.

---

## 📬 Get Involved

Whether you're a seasoned adventurer or a curious newcomer, Eldarlands invites you to step into the world of Ur and help shape its story. Explore, create, and connect.

---

## 🧪 Tech Stack Overview

This site is built as a **full-stack application** using:

- **Frontend**: Next.js `15.5.0` with React `19.1.0`, TypeScript `5`, Tailwind CSS `4.1.12`, and DaisyUI `5.0.52`
- **Backend**: Node.js `24.6.0` with Prisma `6.15.0` and Next.js API routes
- **Authentication**: NextAuth `4.24.11`
- **Media Handling**: next-cloudinary `6.16.0`
- **Validation**: Zod `4.1.5`
- **Mobile Deployment**: Capacitor `7.4.3` (iOS and Android support)
- **Linting & Formatting**: ESLint `9`, TypeScript strict mode, and modular code organization

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js 20+**
- **npm** or **yarn**
- **Git**
- **MongoDB or Prisma-compatible database** (depending on deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd frontend
   ```

The backend will run on `http://localhost:3001`

2. **Start the frontend (in a new terminal):**

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

#### Option 3: Using npm scripts

```bash
# Start both servers simultaneously
npm run dev:both

# Or start them individually
npm run dev:frontend  # Frontend only
npm run dev:backend   # Backend only
```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Troubleshooting

### Common Issues and Solutions

#### MongoDB Connection Issues

**Error: `MongooseServerSelectionError: connect ECONNREFUSED ::1:27017`**

- **Cause:** MongoDB is not running
- **Solution:** Start MongoDB service:
  ```bash
  brew services start mongodb/brew/mongodb-community
  ```

**Error: `mongod not found`**

- **Cause:** MongoDB is not installed
- **Solution:** Install MongoDB:
  ```bash
  brew install mongodb-community
  ```

**Error: `Error: listen EADDRINUSE: address already in use :::3001`**

- **Cause:** Port 3001 is already in use
- **Solution:** Kill existing processes or change port in `.env` file

#### Verification Steps

1. **Check MongoDB status:**

   ```bash
   brew services list | grep mongodb
   ```

2. **Test MongoDB connection:**

   ```bash
   mongosh larp --eval "db.runCommand('ping')" --quiet
   ```

3. **Test backend API:**

   ```bash
   curl http://localhost:3001/health
   ```

4. **Check frontend:**
   Navigate to `http://localhost:3000` in your browser

#### Environment Variables Issues

**Error: `MONGODB_URI is not defined in environment variables`**

- **Cause:** `.env` file is missing or incorrectly formatted
- **Solution:** Ensure `.env` file exists in `backend/` directory with correct format

**Error: `JWT_SECRET is not defined`**

- **Cause:** JWT configuration is missing
- **Solution:** Add JWT configuration to `.env` file

## 🔧 Development Scripts

### Root Level (Frontend + Backend)

- `npm run dev` - Start frontend on port 3000
- `npm run dev:frontend` - Start frontend on port 3000
- `npm run dev:backend` - Start backend on port 3001
- `npm run dev:both` - Start both servers simultaneously (requires `concurrently`)

### Frontend Only

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend Only

- `npm run dev` - Start development server with nodemon on port 3001
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server on port 3001

### Startup Scripts

- `./start-dev.sh` - Start both servers (macOS/Linux)
- `start-dev.bat` - Start both servers (Windows)

## 🌐 API Endpoints

The backend provides RESTful API endpoints with comprehensive security and validation:

### Authentication & Users

- **Authentication**: `/api/auth/*` - User registration, login, profile management
- **Users**: `/api/users/*` - User CRUD operations and role management with admin controls

### Security Features

- **Rate Limiting**: Protection against abuse with configurable limits
- **Input Validation**: Comprehensive Zod schema validation for all endpoints
- **Error Handling**: Typed error responses with proper logging
- **Authentication**: Next-auth.js security with role-based access control
- **Performance**: Optimized database queries with lean operations and parallel processing

## 📱 Mobile Development Strategy

**Current Status**: LARP is built as a modern web application using Next.js 14 with responsive design for optimal cross-device compatibility.

**Future Plans**: The responsive web design serves as a foundation for future mobile app development, ensuring consistent user experience across all platforms.

## 🎨 Design System

- **Color Scheme**: Purple-based theme with white text for primary actions
- **Typography**: Modern, readable fonts optimized for mobile and desktop
- **Components**: Consistent UI patterns using shadcn/ui component library
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Component Architecture**: Modular, reusable components for maintainable code
- **Performance**: Optimized rendering with proper memoization and code splitting
- **Accessibility**: WCAG compliant components with proper ARIA labels
- **Theme Consistency**: Enforced purple button styling for all non-navigation actions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please open an issue in the GitHub repository or contact the development team.
