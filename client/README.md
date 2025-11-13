# Client

## Установка зависимостей

```bash
npm install grpc-web google-protobuf
npm install --save-dev @types/google-protobuf ts-proto
```

## Создайть структуру папок

```bash
mkdir -p src/app/generated
```

## Добавьте папку сгенерированных файлов в .gitignore

```text
src/app/generated/
```

## Добавить скрипты в package.json клиента:

```json
{
  "scripts": {
    "ng": "ng",
    ...
    "proto:generate": "protoc -I=../api/src --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./src/app/generated --ts_proto_opt=outputServices=grpc-web --ts_proto_opt=env=browser --ts_proto_opt=oneof=unions --ts_proto_opt=esModuleInterop=true ../api/src/items/items.proto",
    "proto:watch": "npm run proto:generate -- --watch"
  }
}
```

Разберу все части скрипта построчно:

## Команда `protoc` - основной компилятор Protocol Buffers

```bash
protoc
  -I=../api/src
  --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto
  --ts_proto_out=./src/app/generated
  --ts_proto_opt=outputServices=grpc-web
  --ts_proto_opt=env=browser
  --ts_proto_opt=oneof=unions
  --ts_proto_opt=esModuleInterop=true
  ../api/src/items/items.proto
```

## Детальное описание каждой части:

### 1. **`-I=../api/src`** (Include path)

- **Назначение**: Указывает корневой путь для поиска proto-файлов и их импортов
- **Аналогия**: Как `includePath` в компиляторах
- **Пример**: Если в `items.proto` есть `import "common.proto"`, protoc будет искать его в `../api/src/common.proto`

### 2. **`--plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto`**

- **Назначение**: Подключает плагин для генерации TypeScript кода
- **Формат**: `--plugin=имя_плагина=путь_к_исполняемому_файлу`
- **ts_proto**: Плагин, который преобразует .proto в TypeScript

### 3. **`--ts_proto_out=./src/app/generated`**

- **Назначение**: Указывает выходную директорию для сгенерированных файлов
- **Формат**: `--{plugin_name}_out=путь`
- **Результат**: Файлы создадутся в `./src/app/generated/`

### 4. **Опции плагина (`--ts_proto_opt=`)**

#### **`outputServices=grpc-web`**

- **Назначение**: Генерировать клиентские сервисы для gRPC-Web
- **Альтернативы**:
  - `grpc-web` - для браузерных клиентов
  - `grpc-js` - для Node.js серверов
  - `true` - базовые gRPC сервисы

#### **`env=browser`**

- **Назначение**: Оптимизация для браузерной среды
- **Особенности**:
  - Использует `grpc-web` вместо Node.js gRPC
  - Генерирует код, совместимый с браузером

#### **`oneof=unions`**

- **Назначение**: Как обрабатывать `oneof` поля в TypeScript
- **oneof**: Поля, где может быть установлено только одно из нескольких значений
- **unions**: Создает TypeScript union types (`field: string | number`)

#### **`esModuleInterop=true`**

- **Назначение**: Улучшает совместимость с ES модулями
- **Результат**: Позволяет импортировать CommonJS модули как ES модули

### 5. **`../api/src/items/items.proto`**

- **Назначение**: Конкретный proto-файл для компиляции
- **Путь**: Относительный путь от текущей директории (clint/)

## Что будет сгенерировано:

В папке `./src/app/generated/` появятся файлы:

- `items.ts` - gRPC сервисы и клиенты, TypeScript классы для сообщений

## Дополнительные полезные опции:

```bash
# Для Observable вместо Promise (RxJS)
--ts_proto_opt=returnObservable=true

# Для генерации геттеров/сеттеров
--ts_proto_opt=useOptionals=true

# Для работы с датами как Date объектами
--ts_proto_opt=useDate=false
```

Этот скрипт создаст полноценный gRPC-Web клиент, готовый к использованию в Angular приложении.

## Запустить генерацию

```bash
npm run proto:generate
```

В папке `src/app/generated` должны появиться сгенерированные файлы.
