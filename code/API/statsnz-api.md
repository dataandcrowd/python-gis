# Using Stats NZ APIs with a secret token

This guide shows how to keep your Stats NZ API token out of source control and use it to
request data from the API in Python.

## 1) Store the token securely (recommended)

**Option A: Environment variable (most common)**

```bash
# macOS/Linux
export STATSNZ_API_TOKEN="<your-token>"

# Windows (PowerShell)
$env:STATSNZ_API_TOKEN = "<your-token>"
```

**Option B: `.env` file (local dev)**

Create a `.env` file that is *not* committed to git:

```
STATSNZ_API_TOKEN=<your-token>
```

Add `.env` to `.gitignore` to avoid committing it.

## 2) Read the token in Python and call the API

Use `os.environ` to read the token and send it in the request headers. The header name
depends on the specific Stats NZ endpoint—use the header required by the API documentation
(e.g., an API subscription key header or a bearer token header).

```python
import os
import requests

api_token = os.environ["STATSNZ_API_TOKEN"]

url = "https://api.stats.govt.nz/<your-endpoint>"
headers = {
    # Replace this header name/value with what the Stats NZ API requires.
    "Ocp-Apim-Subscription-Key": api_token,
    # Or, for bearer token APIs:
    # "Authorization": f"Bearer {api_token}",
}

response = requests.get(url, headers=headers, timeout=30)
response.raise_for_status()

data = response.json()
print(data)
```

## 3) Tips for keeping it secret

- Never hardcode tokens in scripts or notebooks.
- Keep `.env` files and local config out of git.
- Use a secret manager (e.g., GitHub Actions Secrets, Azure Key Vault, AWS Secrets Manager)
  in production environments.
- Rotate tokens if they are ever exposed.
