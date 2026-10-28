# --- Stage 1: Build Stage ---
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom.xml and pre-download dependencies
COPY backend/pom.xml .
RUN mvn dependency:go-offline -B

# Copy backend source code and build jar
COPY backend/src ./src
RUN mvn clean package -DskipTests -B

# --- Stage 2: Production JRE Runtime ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Set non-root execution permissions and create storage folder with write permissions
RUN addgroup -S spring && adduser -S spring -G spring \
    && mkdir -p /app/local-storage \
    && chown -R spring:spring /app

USER spring:spring

# Copy built JAR from Build Stage
COPY --from=build --chown=spring:spring /app/target/*.jar app.jar

# Render dynamically binds the port via $PORT
EXPOSE 8080

# Use dev profile by default (in-memory H2 DB + local storage, zero external DB required)
ENV SPRING_PROFILES_ACTIVE=dev

ENTRYPOINT ["java", "-jar", "app.jar"]
