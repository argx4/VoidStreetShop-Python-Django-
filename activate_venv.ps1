# Script for activating the virtual environment and running Django server
# Run this script with: .\activate_venv.ps1

# Check if the virtual environment exists
if (-not (Test-Path "venv\Scripts\python.exe")) {
    Write-Host "Virtual environment not found. Creating..." -ForegroundColor Yellow
    virtualenv venv
    venv\Scripts\python.exe -m pip install -r requirements.txt
}

Write-Host "Activating virtual environment..." -ForegroundColor Green
$env:Path = "D:\myshop2\venv\Scripts;" + $env:Path
Write-Host "Virtual environment activated!" -ForegroundColor Green
Write-Host ""
Write-Host "Available commands:" -ForegroundColor Cyan
Write-Host "1. venv\Scripts\python.exe manage.py runserver - start Django server" -ForegroundColor Yellow
Write-Host "2. venv\Scripts\python.exe manage.py makemigrations - create migrations" -ForegroundColor Yellow
Write-Host "3. venv\Scripts\python.exe manage.py migrate - apply migrations" -ForegroundColor Yellow
Write-Host "4. venv\Scripts\python.exe manage.py createsuperuser - create superuser" -ForegroundColor Yellow
Write-Host ""
Write-Host "To install additional packages:" -ForegroundColor Cyan
Write-Host "venv\Scripts\python.exe -m pip install package_name" -ForegroundColor Yellow
Write-Host ""
Write-Host "Installed packages:" -ForegroundColor Cyan
venv\Scripts\python.exe -m pip list
Write-Host "" 