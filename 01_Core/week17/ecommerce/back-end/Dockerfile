# Start from the latest golang base image
FROM golang

# create a working directory "go-file"
RUN mkdir -p /user/src/go-file

# Set the Current Working Directory inside the container to "go-file"
WORKDIR /user/src/go-file

# Copy the source from the current directory to the "go-file" working directory
COPY . .

# getting the sq0l driver 

RUN go get -u github.com/go-sql-driver/mysql

# Build the Go app
RUN go build main.go

# Expose port 8020 to the outside world
EXPOSE 8020

# Command to run the executable
CMD ["./main"]