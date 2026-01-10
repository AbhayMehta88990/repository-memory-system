const mockAnalysisData = {
  success: true,
  summary: {
    projectName: "ecommerce-api",
    projectPath: "../test-repo",
    totalFiles: 17,
    totalLines: 843,
    languages: {
      javascript: 14,
      config: 3
    },
    fileTypes: {
      ".js": 14,
      ".json": 2,
      ".md": 1
    },
    functionsCount: 28,
    classesCount: 0,
    analyzedAt: new Date().toISOString(),
    analysisTime: "0.45s"
  },
  structure: {
    name: "test-repo",
    type: "directory",
    children: [
      {
        name: "src",
        type: "directory",
        children: [
          { name: "server.js", type: "file", extension: ".js" },
          { name: "models", type: "directory" },
          { name: "controllers", type: "directory" },
          { name: "routes", type: "directory" },
          { name: "middleware", type: "directory" }
        ]
      },
      { name: "package.json", type: "file", extension: ".json" },
      { name: "README.md", type: "file", extension: ".md" }
    ]
  },
  metadata: {
    functions: [
      { name: "connectDB", file: "src/config/database.js" },
      { name: "generateToken", file: "src/controllers/authController.js" },
      { name: "register", file: "src/controllers/authController.js" },
      { name: "login", file: "src/controllers/authController.js" },
      { name: "getMe", file: "src/controllers/authController.js" },
      { name: "getAllProducts", file: "src/controllers/productController.js" },
      { name: "getProductById", file: "src/controllers/productController.js" },
      { name: "createProduct", file: "src/controllers/productController.js" },
      { name: "updateProduct", file: "src/controllers/productController.js" },
      { name: "deleteProduct", file: "src/controllers/productController.js" },
      { name: "createOrder", file: "src/controllers/orderController.js" },
      { name: "getMyOrders", file: "src/controllers/orderController.js" },
      { name: "getOrderById", file: "src/controllers/orderController.js" },
      { name: "updateOrderStatus", file: "src/controllers/orderController.js" },
      { name: "protect", file: "src/middleware/auth.js" },
      { name: "authorize", file: "src/middleware/auth.js" }
    ],
    classes: [],
    imports: [
      { source: "express", specifiers: ["express"] },
      { source: "mongoose", specifiers: ["mongoose"] },
      { source: "jsonwebtoken", specifiers: ["jwt"] },
      { source: "bcryptjs", specifiers: ["bcrypt"] }
    ],
    languages: {
      javascript: 14,
      config: 3
    },
    fileTypes: {
      ".js": 14,
      ".json": 2,
      ".md": 1
    },
    totalLines: 843
  },
  keyFiles: {
    entryPoints: [
      { name: "server.js", path: "src/server.js", language: "javascript" }
    ],
    configs: [
      { name: "package.json", path: "package.json" },
      { name: ".env.example", path: ".env.example" }
    ],
    readme: { name: "README.md", path: "README.md" },
    packageJson: { name: "package.json", path: "package.json" }
  }
};

// Role-based onboarding tours
const roleBasedTours = {
  frontend: [
    {
      step: 1,
      title: "Frontend Developer Welcome",
      description: "As a frontend developer, you'll be integrating with this REST API. This tour focuses on understanding the API endpoints, request/response formats, and how to consume these services from your React, Vue, or Angular application.",
      files: ["README.md", "package.json"],
      highlight: "API Integration Focus"
    },
    {
      step: 2,
      title: "Authentication Flow for UI",
      description: "The auth endpoints return JWT tokens that you'll store in localStorage or cookies. After login, include the token in Authorization headers for protected routes. Consider implementing token refresh logic and handling 401 errors gracefully in your UI.",
      files: ["src/routes/authRoutes.js"],
      highlight: "Token Management",
      codeSnippet: "Authorization: Bearer <your-jwt-token>"
    },
    {
      step: 3,
      title: "Product Catalog Endpoints",
      description: "The product API supports filtering, pagination, and search. Use query parameters like ?page=1&limit=10&category=electronics to fetch paginated results. Display loading states while fetching and implement infinite scroll or traditional pagination in your UI.",
      files: ["src/routes/productRoutes.js", "src/controllers/productController.js"],
      highlight: "Pagination & Filtering"
    },
    {
      step: 4,
      title: "Order Management for Checkout",
      description: "The order endpoints handle cart checkout. Send product IDs with quantities, and the API calculates totals. Implement a smooth checkout flow with order confirmation, real-time status updates, and order history views.",
      files: ["src/routes/orderRoutes.js", "src/controllers/orderController.js"],
      highlight: "Checkout Flow"
    },
    {
      step: 5,
      title: "Error Handling in UI",
      description: "All API errors follow a consistent format with success: false and message fields. Build reusable error handling utilities, display user-friendly error messages, and implement retry logic for network failures. Handle validation errors distinctly from server errors.",
      files: ["src/middleware/errorHandler.js"],
      highlight: "UX Error States"
    },
    {
      step: 6,
      title: "State Management Recommendations",
      description: "Consider using Redux, Zustand, or React Context for managing user auth state, cart items, and product cache. Normalize API responses for efficient updates. Cache product data to reduce API calls, but invalidate after mutations.",
      files: [],
      highlight: "Frontend Architecture"
    }
  ],
  backend: [
    {
      step: 1,
      title: "Backend Developer Welcome",
      description: "Welcome to the codebase. This Node.js API follows MVC architecture with Express.js and MongoDB. You'll learn about the data models, business logic in controllers, and how routes connect everything. Perfect for understanding enterprise-grade API design.",
      files: ["src/server.js", "package.json"],
      highlight: "Architecture Overview"
    },
    {
      step: 2,
      title: "Database Layer & Models",
      description: "Mongoose models define the data schema with validation rules. User model handles password hashing with bcrypt pre-save hooks. Product model manages inventory with stock tracking. Order model calculates totals using virtuals and references other collections.",
      files: ["src/models/User.js", "src/models/Product.js", "src/models/Order.js"],
      highlight: "Data Modeling",
      codeSnippet: "userSchema.pre('save', async function(next) { ... })"
    },
    {
      step: 3,
      title: "Authentication & Security",
      description: "JWT-based authentication with configurable expiry. The protect middleware verifies tokens and attaches user to requests. The authorize middleware handles role-based access control. Consider adding rate limiting and request signing for production.",
      files: ["src/middleware/auth.js", "src/controllers/authController.js"],
      highlight: "Security Layer"
    },
    {
      step: 4,
      title: "API Design Patterns",
      description: "Controllers follow single-responsibility principle. Each handles one resource type. Use async/await with try-catch for clean error handling. Responses follow consistent structure. Add query builders for flexible filtering.",
      files: ["src/controllers/productController.js", "src/controllers/orderController.js"],
      highlight: "Clean Code"
    },
    {
      step: 5,
      title: "Database Queries & Optimization",
      description: "Use lean() for read-only queries to improve performance. Add indexes on frequently queried fields. Implement pagination with skip/limit or cursor-based for large datasets. Use populate() wisely and select only needed fields.",
      files: ["src/config/database.js"],
      highlight: "Performance"
    },
    {
      step: 6,
      title: "Extending the API",
      description: "To add new features: 1) Create the Mongoose model, 2) Add controller functions, 3) Define routes, 4) Register in server.js. Follow existing patterns for consistency. Add unit tests for controllers and integration tests for routes.",
      files: ["src/routes/", "src/controllers/"],
      highlight: "Extensibility"
    }
  ],
  devops: [
    {
      step: 1,
      title: "DevOps Engineer Welcome",
      description: "This tour covers deployment, CI/CD, monitoring, and infrastructure considerations. You'll understand the build process, environment configuration, and how to containerize and deploy this Node.js application to production.",
      files: ["package.json", ".env.example"],
      highlight: "Infrastructure Focus"
    },
    {
      step: 2,
      title: "Environment Configuration",
      description: "The app uses dotenv for environment variables. Key configs: PORT, MONGODB_URI, JWT_SECRET, NODE_ENV. Never commit .env files. Use secrets management (AWS Secrets Manager, Vault) in production. Different configs for dev, staging, prod.",
      files: [".env.example", "src/config/database.js"],
      highlight: "Config Management",
      codeSnippet: "process.env.MONGODB_URI || 'mongodb://localhost/ecommerce'"
    },
    {
      step: 3,
      title: "Build & Start Scripts",
      description: "npm start runs production server. npm run dev uses nodemon for hot reload. Consider adding: npm run build for TypeScript compilation, npm run lint for code quality, npm run test for automated tests. Add pre-commit hooks with husky.",
      files: ["package.json"],
      highlight: "NPM Scripts"
    },
    {
      step: 4,
      title: "Containerization Strategy",
      description: "Create a multi-stage Dockerfile: build stage installs dependencies, production stage copies only needed files. Use .dockerignore to exclude node_modules, tests, docs. Set NODE_ENV=production and use non-root user for security.",
      files: ["Dockerfile"],
      highlight: "Docker",
      codeSnippet: "FROM node:18-alpine AS builder"
    },
    {
      step: 5,
      title: "CI/CD Pipeline Design",
      description: "Recommended stages: 1) Install & lint, 2) Run tests, 3) Build Docker image, 4) Push to registry, 5) Deploy to staging, 6) Run E2E tests, 7) Deploy to production. Use GitHub Actions, GitLab CI, or Jenkins. Implement rollback strategies.",
      files: [".github/workflows/"],
      highlight: "Automation"
    },
    {
      step: 6,
      title: "Monitoring & Logging",
      description: "Add structured logging with Winston or Pino. Implement health check endpoints (/health, /ready). Use APM tools (DataDog, New Relic) for performance monitoring. Set up alerts for error rates, response times, and resource usage.",
      files: ["src/server.js"],
      highlight: "Observability"
    }
  ]
};

// Legacy support - default tour
const mockOnboardingTour = roleBasedTours.backend;

const mockChatResponses = {
  "what is the main purpose of this project": "This is an e-commerce REST API that provides backend functionality for an online store. It handles user authentication, product catalog management, shopping cart operations, and order processing. The API uses Express.js for the server, MongoDB for data storage, and JWT for authentication.",

  "where should i start reading the code": "Start with src/server.js - it's the entry point that shows how everything connects. Then look at the models (User, Product, Order) to understand the data structure. After that, check out the auth controller to see how login works, and finally explore the product and order controllers to see the main business logic.",

  "what are the key components or modules": "The key components are: 1) Models (User, Product, Order) - define data structure, 2) Controllers (auth, products, orders) - handle business logic, 3) Routes - define API endpoints, 4) Middleware (auth) - handle security and validation, 5) Config (database.js) - database connection setup.",

  "how is authentication handled": "Authentication uses JWT (JSON Web Tokens). When a user registers or logs in, the server generates a token signed with a secret key. This token is sent back to the client. For protected routes, the client includes this token in the Authorization header. The 'protect' middleware verifies the token and attaches the user to the request object.",

  "what database is used in this project": "The project uses MongoDB with Mongoose as the ODM (Object Document Mapper). Mongoose provides schema validation, relationship management, and helpful query methods. You can see the connection setup in src/config/database.js and the schemas in the models folder.",

  "default": "Based on the codebase structure, this is a Node.js e-commerce API with Express, MongoDB, and JWT authentication. It follows MVC architecture with models, controllers, and routes organized in separate folders. The main features include user authentication, product management, and order processing. Feel free to ask more specific questions about any part of the code!"
};

const mockStarterTasks = [
  {
    title: "Add input validation to registration",
    description: "Currently, the register function has basic validation. Add more checks: verify password strength (min 8 chars, uppercase, number), validate email format, ensure name doesn't contain numbers. This will improve data quality and security.",
    difficulty: "easy",
    files: ["src/controllers/authController.js"]
  },
  {
    title: "Implement password reset functionality",
    description: "Add a 'forgot password' feature. Create new endpoints for requesting a reset token (send via email) and resetting the password with that token. You'll need to add fields to the User model and create new controller methods.",
    difficulty: "medium",
    files: ["src/models/User.js", "src/controllers/authController.js", "src/routes/authRoutes.js"]
  },
  {
    title: "Add product image upload",
    description: "Currently, product images are just URLs. Implement actual file upload using multer middleware. Store files in an 'uploads' folder and save the file paths to the database. This is a great way to learn file handling in Node.js.",
    difficulty: "medium",
    files: ["src/controllers/productController.js", "src/routes/productRoutes.js"]
  },
  {
    title: "Create user profile update endpoint",
    description: "Add a PUT endpoint at /api/users/profile that allows users to update their name, phone, and address. Make sure users can only update their own profile (not others). This teaches you about authorization and data updates.",
    difficulty: "easy",
    files: ["src/routes/userRoutes.js", "src/controllers/authController.js"]
  },
  {
    title: "Add product review system",
    description: "Let users leave reviews on products. Add a reviews array to the Product model with rating, comment, and user fields. Create endpoints to add a review and calculate average ratings. This involves working with nested documents in MongoDB.",
    difficulty: "hard",
    files: ["src/models/Product.js", "src/controllers/productController.js", "src/routes/productRoutes.js"]
  }
];

function getRandomResponse(question) {
  const lowerQuestion = question.toLowerCase();

  for (const [key, response] of Object.entries(mockChatResponses)) {
    if (lowerQuestion.includes(key)) {
      return response;
    }
  }

  return mockChatResponses.default;
}

function getTourByRole(role) {
  const validRoles = ['frontend', 'backend', 'devops'];
  const selectedRole = validRoles.includes(role) ? role : 'backend';
  return roleBasedTours[selectedRole];
}

module.exports = {
  mockAnalysisData,
  mockOnboardingTour,
  roleBasedTours,
  mockStarterTasks,
  getRandomResponse,
  getTourByRole
};
