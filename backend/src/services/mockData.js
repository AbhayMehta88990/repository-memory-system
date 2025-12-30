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

const mockOnboardingTour = [
  {
    step: 1,
    title: "Welcome to the E-Commerce API",
    description: "This is a full-featured REST API for an e-commerce platform. The project follows a clean MVC architecture with Express.js and MongoDB. You'll find organized folders for models, controllers, routes, and middleware - making it easy to navigate and understand.",
    files: ["README.md", "package.json"]
  },
  {
    step: 2,
    title: "Application Entry Point",
    description: "The application starts at server.js, which sets up the Express server, connects to MongoDB, configures middleware (CORS, JSON parsing), and registers all API routes. This is where the application comes to life when you run 'npm start'.",
    files: ["src/server.js"]
  },
  {
    step: 3,
    title: "Database Models & Schemas",
    description: "Three main models power this application: User (for authentication), Product (for the catalog), and Order (for purchases). Each model uses Mongoose schemas with validation, relationships, and custom methods. The User model handles password hashing, Product manages inventory, and Order calculates totals automatically.",
    files: ["src/models/User.js", "src/models/Product.js", "src/models/Order.js"]
  },
  {
    step: 4,
    title: "Controllers - Business Logic",
    description: "Controllers handle the core business logic. The auth controller manages registration and login with JWT tokens. Product controller provides CRUD operations with filtering and pagination. Order controller processes purchases, validates stock, and tracks order status.",
    files: ["src/controllers/authController.js", "src/controllers/productController.js", "src/controllers/orderController.js"]
  },
  {
    step: 5,
    title: "API Routes",
    description: "Routes define the API endpoints. Auth routes (/api/auth) handle user authentication. Product routes (/api/products) manage the catalog with public and admin-only endpoints. Order routes (/api/orders) process purchases and track order history. Each route is protected with middleware where needed.",
    files: ["src/routes/authRoutes.js", "src/routes/productRoutes.js", "src/routes/orderRoutes.js"]
  },
  {
    step: 6,
    title: "Security & Authentication",
    description: "The auth middleware protects routes by verifying JWT tokens and extracting user information. The authorize function restricts access based on user roles (user vs admin). This ensures secure access control throughout the API.",
    files: ["src/middleware/auth.js"]
  },
  {
    step: 7,
    title: "Next Steps",
    description: "Now that you understand the architecture, try exploring: 1) Add new product features like reviews or ratings, 2) Implement cart functionality in cartRoutes.js, 3) Add email notifications for orders, 4) Create admin analytics endpoints. Start with smaller tasks in the user routes or helper utilities!",
    files: []
  }
];

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

module.exports = {
  mockAnalysisData,
  mockOnboardingTour,
  mockStarterTasks,
  getRandomResponse
};
