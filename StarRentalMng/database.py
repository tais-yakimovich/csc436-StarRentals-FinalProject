from databases import Database

# Connection String
# DATABASE_URL = "mysql+aiomysql://username:password@host:port/databaseName"

DATABASE_URL = "mysql+aiomysql://root:@localhost:3306/Star_Rentals"
database = Database(DATABASE_URL)
