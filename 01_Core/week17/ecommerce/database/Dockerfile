# Derived from official mysql image (our base image)
FROM mysql
#
ENV MYSQL_DATABASE products

# Expose port 3306 to the outside world
EXPOSE 3306

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically executed during container startup
COPY  . /docker-entrypoint-initdb.d
