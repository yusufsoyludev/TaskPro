# TaskPro
# TaskPro Backend

TaskPro Backend, kullanıcıların kişisel çalışma panoları oluşturabildiği, bu panolar içinde kolonlar ve görev kartları yönetebildiği RESTful bir API projesidir.

Bu backend; authentication, kullanıcıya özel board yönetimi, column/card işlemleri, task taşıma mantığı, validation ve Swagger dokümantasyonu gibi temel bir task management uygulamasının ihtiyaç duyduğu ana yapıları içerir.

---

## Projenin Amacı

Bu projenin temel amacı, frontend tarafında kullanılabilecek sağlam ve düzenli bir API katmanı oluşturmaktır.

TaskPro; Trello/Kanban mantığına benzeyen bir yapı sunar:

- Kullanıcı kayıt olur ve giriş yapar
- Kendi boardlarını oluşturur
- Board içine column ekler
- Column içine card/task oluşturur
- Card’ları farklı column’lara taşıyabilir
- Tüm işlemler kullanıcıya özel ve token korumalıdır

---

## Kullanılan Teknolojiler

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- Joi
- Swagger UI
- Pino HTTP
- CORS
- dotenv
- Nodemon

---

## Mimari Yapı

Proje katmanlı bir backend mimarisiyle hazırlanmıştır.

Temel akış:

```txt
Routes → Controllers → Services → Models → MongoDB
Routes

Endpointlerin tanımlandığı katmandır.
Gelen HTTP istekleri ilgili controller’a yönlendirilir.

Controllers

Request ve response yönetimini yapar.
İş mantığını doğrudan içermez, gerekli işlemler için service katmanını çağırır.

Services

Projenin ana iş kuralları burada yer alır.
Örneğin kullanıcı kontrolü, board ownership kontrolü, card taşıma işlemi gibi kurallar service katmanında yönetilir.

Models

MongoDB koleksiyonlarının Mongoose şemalarıdır.
User, Board, Column ve Card modelleri bu katmanda tanımlanmıştır.

Middlewares

Kimlik doğrulama, hata yakalama, body validation gibi ara işlemler burada tutulur.

Proje Yapısı
src/
  app.js
  server.js
  swagger.js

  controllers/
    auth.js
    boards.js
    columns.js
    cards.js

  db/
    initMongoConnection.js
    models/
      user.js
      board.js
      column.js
      card.js

  routes/
    auth.js
    boards.js
    columns.js
    cards.js
    test.js

  services/
    auth.js
    boards.js
    columns.js
    cards.js

  middlewares/
    authenticate.js
    errorHandler.js
    notFoundHandler.js
    validateBody.js

  validation/
    auth.js
    boards.js
    columns.js
    cards.js

  utils/
    ctrlWrapper.js
    createHttpError.js

  docs/
    auth.docs.js
    boards.docs.js
    columns.docs.js
    cards.docs.js
Özellikler
Authentication
Kullanıcı kaydı
Kullanıcı girişi
JWT token üretimi
Current user endpointi
Logout endpointi
Protected route yapısı
Boards
Board oluşturma
Kullanıcının boardlarını listeleme
Tek board getirme
Board güncelleme
Board silme

Her board bir kullanıcıya bağlıdır. Kullanıcı sadece kendi board verilerine erişebilir.

Columns
Board içine column oluşturma
Board’a ait column listesini getirme
Column güncelleme
Column silme

Column işlemlerinde önce ilgili board’un kullanıcıya ait olup olmadığı kontrol edilir.

Cards
Column içine card oluşturma
Column’a ait cardları listeleme
Card güncelleme
Card silme
Card’ı başka column’a taşıma

Card taşıma işlemi backend tarafında columnId güncellenerek yapılır.

Validation

Joi ile request body doğrulaması yapılır.
Eksik veya hatalı veri gönderildiğinde API düzenli 400 Validation error cevabı döndürür.

Swagger

API endpointleri Swagger UI ile dokümante edilmiştir.

Swagger paneli:

/api-docs
Environment Variables

Projeyi çalıştırmak için kök dizinde .env dosyası oluşturulmalıdır.

PORT=3000
MONGODB_USER=your_mongodb_user
MONGODB_PASSWORD=your_mongodb_password
MONGODB_URL=your_cluster_url
MONGODB_DB=taskpro_db
JWT_SECRET=your_secret_key
Kurulum

Projeyi klonladıktan sonra bağımlılıkları yükleyin:

npm install

Geliştirme modunda çalıştırmak için:

npm run dev

Production modunda çalıştırmak için:

npm start
API Endpointleri
Auth
POST   /auth/register
POST   /auth/login
GET    /auth/current
POST   /auth/logout
Boards
POST   /boards
GET    /boards
GET    /boards/:boardId
PATCH  /boards/:boardId
DELETE /boards/:boardId
Columns
POST   /columns
GET    /columns/:boardId
PATCH  /columns/:columnId
DELETE /columns/:columnId
Cards
POST   /cards
GET    /cards/:columnId
PATCH  /cards/:cardId
PATCH  /cards/:cardId/move
DELETE /cards/:cardId
Örnek Card Move İşlemi
PATCH /cards/:cardId/move

Body:

{
  "targetColumnId": "target_column_id"
}

Bu işlem, ilgili card’ın columnId değerini hedef column ID’si ile günceller.

Güvenlik Yaklaşımı

Bu projede kullanıcı verileri birbirinden izole edilmiştir.

Örneğin bir kullanıcı:

başka kullanıcının board’unu göremez
başka kullanıcının column’unu değiştiremez
başka kullanıcıya ait card’ı taşıyamaz veya silemez

Bu kontroller service katmanında yapılır.

Geliştirmeye Açık Alanlar

Bu backend ileride şu özelliklerle genişletilebilir:

Cloudinary ile avatar upload
Board background upload
Need Help mail sistemi
Refresh token yapısı
Role-based authorization
Team/workspace sistemi
Real-time card updates
Activity log
Notification sistemi
Genel Değerlendirme

TaskPro Backend, klasik bir CRUD API’den daha fazlasını hedefleyen, katmanlı mimariyle hazırlanmış bir task management API projesidir.

Backend tarafında temel amaç; frontend’in güvenilir, düzenli ve genişletilebilir bir API ile çalışmasını sağlamaktır.
