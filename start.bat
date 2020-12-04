@echo off
title Xware running
echo Do you agree to everything said on the Xware github repository? yes or no
set /p Agree=
if %Agree%== yes goto Yes
if %Agree%== no goto Exit
:Exit
Exit
:Yes
cls
node index.js
PAUSE
goto Yes