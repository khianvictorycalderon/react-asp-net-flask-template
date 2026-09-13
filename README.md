# React + ASP NET + Flask (AI) Template
Designed for full-stack architecture with machine learning.

### Previews
![Output Preview](preview1.png)
![IDE Preview](preview2.png)

### Tech Stacks:
- **Vite React (Typescript)**
- **Tailwind CSS**
- **ASP.NET Core Web API**
- **SQLite**
- **Flask**
- **Python Machine Learning Framework (TensorFlow, PyTorch, etc...) (Choose only one)**

---

### Prerequisites
- NodeJS
- .NET Core
- Python *(Recommended version: 3.12)*

**NOTE**: It is recommended that setup is `ai-service` -> `backend` -> `frontend` sequentially.

---

### Setup inside `ai-service` folder:
**NOTE**: Use `py -3.12` command as a replacement for `python` if you have multiple versions of python installed on your device.

1. Create your virtual environment by running `python -m venv venv`.
2. Activate your virtual environment with `.\venv\Scripts\activate` (for Windows).
3. Install all the necessary dependencies with `python -m pip install -r requirements.txt` or simply `pip install -r requirements.txt`.
4. Run `python -m flask --app api.index run --debug`.

**NOTE**: Always run `python -m pip freeze > requirements.txt` or simply `pip freeze > requirements.txt` whenever installing a new package or library.

### Setup inside `backend` folder:
1. Create `appsettings.Development.json` *(or `appsettings.json` for production)* file that contains:
    ```json
    {
        "Logging": {
            "LogLevel": {
                "Default": "Information",
                "Microsoft.AspNetCore": "Warning"
            }
        },
        "AllowedHosts": "*",
        "Cors": {
            "AllowedOrigins": [
            	"...",
            	"..."
            ]
        },
        "Services": {
            "AI": {
                "Url": "..."
            }
        }
    }
    ```
    **NOTE**: *Update all the `"..."` into actual credentials. The URL of AI service is where the flask ai service is running.*
2. Run this if you haven't installed entity framework before:
    ```cmd
    dotnet tool install --global dotnet-ef --version 8.0.4
    ```
    *NOTE: Latest version is unstable with the current setup so I use 8.0.4*
3. Run the following CMD comamnds:
    *To actually create tables in the database:*
    ```
    dotnet ef database update
    ```
4. Run `dotnet watch run` to run your backend.

### Setup inside `frontend` folder:
1.  Create an `.env` file that contains:
    ```env
    VITE_API_URL=...
    ```
    **NOTE**: *Change `VITE_API_URL` into the actual backend host without trailing slash.*
2. Run `npm install` to install necessary packages.
3. Run `npm run dev` to test your development frontend.

---

### Misc Notes:
- React should never directly request to the flask server, as it is dedicated for machine learning services only.