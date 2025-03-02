# Django-проект MyShop

## Настройка виртуального окружения

В этом проекте используется виртуальное окружение Python для изоляции зависимостей.

### Активация виртуального окружения

В PowerShell выполните:
```powershell
.\activate_venv.ps1
```

Либо вручную добавьте путь к интерпретатору Python из виртуального окружения:
```powershell
$env:Path = "D:\myshop2\venv\Scripts;" + $env:Path
```

### Основные команды

1. Запуск сервера разработки:
```
venv\Scripts\python.exe manage.py runserver
```

2. Создание миграций базы данных:
```
venv\Scripts\python.exe manage.py makemigrations
```

3. Применение миграций:
```
venv\Scripts\python.exe manage.py migrate
```

4. Создание суперпользователя:
```
venv\Scripts\python.exe manage.py createsuperuser
```

### Установка дополнительных пакетов

```
venv\Scripts\python.exe -m pip install имя_пакета
```

После установки новых пакетов обновите файл requirements.txt:
```
venv\Scripts\python.exe -m pip freeze > requirements.txt
```

### Установка зависимостей из requirements.txt

```
venv\Scripts\python.exe -m pip install -r requirements.txt
``` 