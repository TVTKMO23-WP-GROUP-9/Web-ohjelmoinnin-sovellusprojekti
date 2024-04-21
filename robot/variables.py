import random

LOGIN_URL = "http://localhost:5173/login"
BROWSER = "Chrome"
BASE_URL = "http://localhost:3001"
headers = "Content-Type=application/json"
MOVIE_ID = "945961"
REVIEW_RATING = "4"
REVIEW_TEXT = "Robotti testaa"
review_data = {'mediatype': '0', 'rating': 4, 'review': 'Todella hyvä elokuva! Suosittelen kaikille.', 'revieweditem': '${MOVIE_ID}'}
my_session = {BASE_URL}
PYTHON = "python"
GROUPNAME = "TestGroup" + str(random.randint(1, 1000))
