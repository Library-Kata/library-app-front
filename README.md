
# Library App Frontend

Library App Frontend is an Angular-based web application designed to provide an intuitive interface for managing library operations. It connects seamlessly with the Library App Backend.

## **Features**
- User-friendly UI for managing library users and books.
- Borrow and return books.
- View borrowing history and current borrowed books.
- Integrated Docker for easy deployment.

---

## **Setup Instructions**

### **Prerequisites**
1. Node.js 20+.
2. Angular CLI (installed globally).
3. Docker (if running with containers).

### **Commands to Initialize the Project**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Library-Kata/library-app-front.git
   cd library-app-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application locally:**
   ```bash
   ng serve
   ```

4. Access the application at:
  - **URL:** `http://localhost:4200`

---

## **Docker Integration**

### **Build and Run with Docker**

1. **Run the application with Docker Compose:**
   ```bash
   ./start.sh
   ```

2. Alternatively, run these commands manually:
   ```bash
   npm install
   docker-compose build
   docker-compose up
   ```

3. Access the application at:
  - **Frontend URL:** `http://localhost:3000`

---

## **Superadmin Credentials**

For testing purposes, a predefined superadmin user is included:

- **Username:** `admin`
- **Password:** `admin123`

---

## **Application Functionalities**

### **User Management**
- View users (requires backend connection).

### **Book Management**
- View books available for borrowing.

### **Borrowing Operations**
- Borrow and return books.
- View borrowing history.

---

## **Development Notes**

### **Run the application in development mode:**
```bash
ng serve
```

### **Build the application for production:**
```bash
ng build --prod
```

---

## **Contributing**

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

