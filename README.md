# Jakubs News API and setUp
Hello,  

You will have to create 2 .env files one with the name of .env.test and the other as .env.development.  

After that you will have to insert into the test env:  

PGDATABASE=nc_news_test  

and in the development .env:  

PGDATABASE=nc_news  

but this could change so u might want to go into db/setup.sql to see the two data base names and put them into there corresponding .envs  