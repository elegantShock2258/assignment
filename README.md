# Nextjs + TSC + SASS + Tailwind template

This project is a monorepo containing a Next.js frontend, Express.js backend, and MySQL database setup.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js
- Yarn (recommended for managing dependencies)
- Docker (for running MySQL with Docker Compose)

## Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone <repository_url>
cd <project_directory>
\`\`\`

### 2. Start MySQL Server

Ensure Docker is installed and running. Navigate to the directory containing your \`docker-compose.yml\` file and run:

\`\`\`bash
docker-compose up db
\`\`\`

This command starts the MySQL database container named \`db\`.

### 3. Start Express.js Server

Navigate to the directory containing your Express.js server (\`app/src/server/express\`):

\`\`\`bash
cd app/src/server/express
yarn install
yarn start
\`\`\`

This command installs dependencies and starts the Express.js server.

### 4. Start Next.js Frontend

Navigate to the directory containing your Next.js frontend (\`app/src/client\`):

\`\`\`bash
cd app/src/client
yarn install
yarn dev
\`\`\`

This command installs dependencies and starts the Next.js development server.

### 5. Access the Application

Open your web browser and go to \`http://localhost:3000\` to view the Next.js application.

## Project Structure

\`\`\`
project-root/
├── app/
│ ├── src/
│ │ ├── client/ # Next.js frontend
│ │ ├── server/
│ │ │ └── express/ # Express.js backend
│ └── docker-compose.yml # MySQL Docker Compose configuration
├── README.md # This README file
└── .gitignore
\`\`\`

- **\`app/src/client/\`**: Contains the Next.js frontend.
- **\`app/src/server/express/\`**: Contains the Express.js backend.
- **\`app/docker-compose.yml\`**: Docker Compose configuration file for MySQL.

## Configuration

- **CORS**: Ensure CORS is configured in Express.js (\`app/src/server/express\`) to allow requests from \`http://localhost:3000\` (Next.js frontend) during development.

- **Database Connection**: Configure your Express.js server (\`app/src/server/express\`) to connect to MySQL. Use environment variables or a configuration file to manage database connection details securely.

## Additional Notes

- Replace \`<repository_url>\` and \`<project_directory>\` with actual values when cloning the repository.
- Modify configurations (\`cors\`, database connections, etc.) as per your project requirements and security best practices.
