# Use AdoptOpenJDK 11 as base image
FROM adoptopenjdk/openjdk11:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged JAR file into the container at /app
COPY target/my-spring-boot-app.jar /app/my-spring-boot-app.jar

# Expose port 8080 to the outside world
EXPOSE 8080

# Define default command to run the Spring Boot application
CMD ["java", "-jar", "my-spring-boot-app.jar"]

