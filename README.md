# Django and Next.js Simple Blog with Tailwind CSS

This project is a **simple blog** built using **Django** for the backend and **Next.js** for the frontend, styled with **Tailwind CSS**. It serves as a basic template for creating a full-stack blog application.

> **Note:** This is a **demo project** and is not production-ready.

## Features

- **Backend**: Django REST Framework to manage the blog’s API.
- **Frontend**: Next.js for server-side rendering and optimized React components.
- **Styling**: Tailwind CSS for responsive and customizable styling.
- **Blog Post Management**: Create, read, update, and delete blog posts.

## Project Structure

- **Backend**:  
  - Django handles authentication, post creation, and API endpoints.
  - Django REST Framework is used to expose blog data through APIs.

- **Frontend**:  
  - Next.js is used to create a fast, server-side rendered blog interface.
  - React components for individual posts and listing pages.

- **Styling**:  
  - Tailwind CSS is used to style the blog with responsive design out of the box.

## Prerequisites

- Python 3.x
- Node.js and npm
- Django
- Next.js
- Tailwind CSS

## Installation

### Backend (Django)

1. Clone this repository:
    ```bash
    git clone https://github.com/your-username/django-nextjs-blog.git
    ```

2. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

3. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use 'venv\Scripts\activate'
    ```

4. Install the necessary Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```

5. Apply database migrations:
    ```bash
    python manage.py migrate
    ```

6. Run the Django server:
    ```bash
    python manage.py runserver
    ```

### Frontend (Next.js)

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the Next.js development server:
    ```bash
    npm run dev
    ```

4. Open `http://localhost:3000` in your browser to view the blog.

## Development Setup

- The backend runs on Django's default port (`8000`), and the frontend runs on Next.js's default port (`3000`).
- Ensure your Django API is running and accessible at the correct endpoint to serve data to the Next.js frontend.

## Future Improvements

- Implement user authentication and profile management.
- Add pagination for blog post listing.
- Enhance styling and responsiveness for mobile devices.

## License

This project is open source and available under the [MIT License](LICENSE).
