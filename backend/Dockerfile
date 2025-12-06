FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Копируем файлы Maven Wrapper с правильными правами
COPY mvnw .
COPY .mvn .mvn
RUN chmod +x mvnw  # ДАВАЕМ ПРАВА НА ВЫПОЛНЕНИЕ!

# Копируем pom.xml для кэширования зависимостей
COPY pom.xml .

# Скачиваем зависимости
RUN ./mvnw dependency:go-offline -B

# Копируем исходный код
COPY src ./src

# Собираем приложение
RUN ./mvnw clean package -DskipTests

# Копируем собранный JAR
RUN cp target/*.jar app.jar

# Запускаем приложение
ENTRYPOINT ["java", "-jar", "app.jar"]