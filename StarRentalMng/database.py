from databases import Database

# Connection String
# DATABASE_URL = "mysql+aiomysql://username:password@host:port/databaseName"
USERNAME = "root"
PASSWORD = "password"

DATABASE_URL = f"mysql+aiomysql://{USERNAME}:{PASSWORD}@localhost:3306/Star_Rentals"
database = Database(DATABASE_URL, min_size=1, max_size=20)