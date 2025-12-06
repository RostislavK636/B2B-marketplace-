FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Копируем только pom.xml для кэширования зависимостей
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Скачиваем зависимости
RUN ./mvnw dependency:go-offline -B

# Копируем исходный код
COPY src ./src

# Собираем приложение
RUN ./mvnw clean package -DskipTests

# Запускаем
ENTRYPOINT ["java", "-jar", "target/backend.jar"]