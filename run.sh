NODE_ENV=production \
DATABASE_URL=postgres://tasksadmin:tasksadmin@tasks-db.c9o41mpvtl2p.us-east-1.rds.amazonaws.com:5432/tasks_db \
forever start -al forever.log -o out.log -e err.log ./bin/www
