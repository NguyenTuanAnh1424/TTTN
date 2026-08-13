@echo off
color 0A
echo ========================================================
echo   KHOI DONG DYS AN WEBSITE BAN HANG DO GIA DUNG (NODEJS + REACT)
echo ========================================================
echo.

echo [1/2] Dang bat Server Backend (NodeJS + Express + MySQL)...
start "Backend NodeJS Express (PORT 5000)" cmd /k "cd backend && npm run dev"

:: Doi 3 giay de Backend khoi dong va ket noi MySQL
timeout /t 3 /nobreak > NUL

echo [2/2] Dang bat Giao dien Frontend (ReactJS + Vite)...
start "Frontend ReactJS Vite (PORT 3000)" cmd /k "cd frontend && npm run dev"

echo.
echo Hoan Tat! 
echo 2 cua so Terminal da duoc mo de chay ngam ca Backend va Frontend.
echo Vui long truy cap vao: http://localhost:3000 
echo ========================================================
pause
