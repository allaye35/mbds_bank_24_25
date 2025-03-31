FROM eclipse-temurin:21-jdk-slim AS builder 
WORKDIR /app 
COPY build.gradle settings.gradle /app/ 
COPY gradlew /app/ 
COPY gradle /app/gradle 
RUN ./gradlew build -x test --no-daemon 
COPY src /app/src 
RUN ./gradlew build -x test --no-daemon 
FROM eclipse-temurin:21-jre-slim 
WORKDIR /app 
COPY --from=builder /app/build/libs/*.jar app.jar 
EXPOSE 8080 
ENTRYPOINT ["java", "-jar", "app.jar"] 
