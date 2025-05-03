# RSS Webscraper

An RSS feed server that allows users to follow certain types of feeds of their interest, fetches the latest updates at a prespecified time interval, and saves those updates into the user's PostgreSQL database.


## Setup Instructions

### 1. Setup PostgreSQL
- Install and configure **pgAdmin**.
- Create a database in pgAdmin and obtain its connection URL.
- Put the **DB_URL** in the `.env` file. Also add PORT number.

### 2. Clone the Project
Clone the repository to your local machine:
```bash
git clone https://github.com/baelthebard42/RSS-Webscraper.git
cd RSS-Webscraper 
```
### UI

![image](https://github.com/user-attachments/assets/129bf2e8-29b1-48f5-9257-6440f824df7e)


1.  **Navigate to the UI directory:**
    ```bash
    cd UI
    ```

2.  **Install the necessary dependencies:**
    ```bash
    npm install
    ```

3.  **Start the UI:**
    ```bash
    npm start
    ```
    This will start the frontend application. The UI will now be available on your local server, typically `http://localhost:3000` or the default port configured.

### Server

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install Go dependencies:**
    ```bash
    go mod tidy
    ```

3.  **Build the server:**
    ```bash
    go build
    ```

4.  **Run the server:**
    ```bash
    ./RSS-Webscraper.exe
    ```
    The server will now run and start fetching updates from the RSS feeds based on the configuration.
