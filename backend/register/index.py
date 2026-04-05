import json
import os
import hashlib
import secrets
import re
import psycopg2


def hash_password(password: str) -> str:
    """Хеширование пароля с солью"""
    salt = secrets.token_hex(16)
    hashed = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
    return f"{salt}:{hashed.hex()}"


def handler(event, context):
    """Регистрация нового пользователя на платформе Nexus Trade"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    cors = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if event.get('httpMethod') != 'POST':
        return {
            'statusCode': 405,
            'headers': cors,
            'body': json.dumps({'error': 'Method not allowed'}, ensure_ascii=False)
        }

    body = json.loads(event.get('body', '{}'))
    email = body.get('email', '').strip().lower()
    password = body.get('password', '')
    username = body.get('username', '').strip()

    if not email or not password or not username:
        return {
            'statusCode': 400,
            'headers': cors,
            'body': json.dumps({'error': 'Заполните все поля'}, ensure_ascii=False)
        }

    if not re.match(r'^[^@]+@[^@]+\.[^@]+$', email):
        return {
            'statusCode': 400,
            'headers': cors,
            'body': json.dumps({'error': 'Некорректный email'}, ensure_ascii=False)
        }

    if len(password) < 6:
        return {
            'statusCode': 400,
            'headers': cors,
            'body': json.dumps({'error': 'Пароль должен быть минимум 6 символов'}, ensure_ascii=False)
        }

    if len(username) < 2:
        return {
            'statusCode': 400,
            'headers': cors,
            'body': json.dumps({'error': 'Имя должно быть минимум 2 символа'}, ensure_ascii=False)
        }

    password_hash = hash_password(password)
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    try:
        cur = conn.cursor()
        cur.execute(
            "SELECT id FROM " + schema + ".users WHERE email = '" + email.replace("'", "''") + "'"
        )
        if cur.fetchone():
            return {
                'statusCode': 409,
                'headers': cors,
                'body': json.dumps({'error': 'Пользователь с таким email уже существует'}, ensure_ascii=False)
            }

        cur.execute(
            "INSERT INTO " + schema + ".users (email, password_hash, username) VALUES ('"
            + email.replace("'", "''") + "', '"
            + password_hash.replace("'", "''") + "', '"
            + username.replace("'", "''") + "') RETURNING id, email, username"
        )
        row = cur.fetchone()
        conn.commit()

        return {
            'statusCode': 201,
            'headers': cors,
            'body': json.dumps({
                'success': True,
                'user': {
                    'id': row[0],
                    'email': row[1],
                    'username': row[2]
                }
            }, ensure_ascii=False)
        }
    finally:
        conn.close()