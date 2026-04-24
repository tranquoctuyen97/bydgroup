# BYD Group Website

## Stack production

- App runtime: Vercel
- Database: Postgres
- Media upload: Cloudflare R2 qua S3 API
- Payload CMS: chạy cùng app Next.js
- `sharp`: dùng trực tiếp trên Vercel Node.js runtime

## Biến môi trường cần có

Tạo file `.env.local` từ `.env.example` khi chạy local.

```bash
cp .env.example .env.local
```

Các biến quan trọng:

- `DATABASE_URL`: chuỗi kết nối Postgres
- `PAYLOAD_SECRET`: secret cho Payload
- `NEXT_PUBLIC_SERVER_URL`: URL app, local là `http://localhost:3000`
- `APPLICATION_NOTIFICATION_TO`: mailbox nhận email khi có CV mới
- `SMTP_HOST`: host SMTP
- `SMTP_PORT`: cổng SMTP
- `SMTP_SECURE`: `true/false` theo cấu hình SSL/TLS của SMTP
- `SMTP_USER`: tài khoản SMTP
- `SMTP_PASS`: mật khẩu hoặc app password SMTP
- `SMTP_FROM_ADDRESS`: địa chỉ gửi mail mặc định
- `SMTP_FROM_NAME`: tên hiển thị người gửi mail
- `S3_BUCKET`: tên bucket R2
- `S3_REGION`: để `auto` khi dùng R2
- `S3_ENDPOINT`: endpoint S3 của Cloudflare R2
- `S3_ACCESS_KEY_ID`: access key của R2
- `S3_SECRET_ACCESS_KEY`: secret key của R2
- `R2_PUBLIC_BASE_URL`: domain public để serve media, ví dụ `https://media.bydgroup.vn`

Checklist env chi tiết cho Vercel nằm ở [docs/vercel-env-setup.md](/Users/tuyen.tq/Documents/freelancer/bydgroup/docs/vercel-env-setup.md).

## Chạy local

```bash
npm install
npm run dev
```

Mở:

```text
http://localhost:3000
http://localhost:3000/admin
```

## Tạo schema và migration Postgres

Generate schema/types sau khi sửa Payload config:

```bash
npm run generate:db-schema
npm run generate:types
```

Tạo migration mới:

```bash
npm run migrate:create init_postgres -- --forceAcceptWarning
```

Chạy migration:

```bash
npm run migrate
```

## Deploy lên Vercel

### 1. Tạo project trên Vercel

Import repo này vào Vercel và set toàn bộ env production:

- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SERVER_URL`
- `APPLICATION_NOTIFICATION_TO`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM_ADDRESS`
- `SMTP_FROM_NAME`
- `S3_BUCKET`
- `S3_REGION`
- `S3_ENDPOINT`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`
- `R2_PUBLIC_BASE_URL`

### 2. Build command

```bash
npm run build
```

### 2.1 Ghi chú về `sharp`

- Repo này đã giữ `sharp` trong dependencies.
- Với Vercel deploy, `sharp` dùng được trên Node.js runtime.
- `next/image` trên Vercel không cần workaround riêng kiểu Cloudflare Workers.

### 2.2 Ghi chú về email thông báo CV mới

- Khi có `application` mới, hệ thống sẽ gửi 1 email thông báo nội bộ qua SMTP.
- Recipient ưu tiên lấy từ `APPLICATION_NOTIFICATION_TO`.
- Nếu biến này để trống, hệ thống fallback về `jobs.contactEmail`, rồi fallback cuối về `SMTP_FROM_ADDRESS` hoặc `hr@bydgroup.vn`.
- Email này chỉ dùng để báo nội bộ, chưa gửi mail xác nhận cho ứng viên.

### 2.3 Test local luồng email CV

1. Cấu hình đủ `SMTP_*` và `APPLICATION_NOTIFICATION_TO` trong `.env.local`
2. Chạy app local:

```bash
npm run dev
```

3. Nộp thử CV từ:

```text
http://localhost:3000/tuyen-dung/ung-tuyen
```

hoặc một trang chi tiết job `/tuyen-dung/[slug]`

4. Kiểm tra:

- record mới xuất hiện trong Payload admin
- inbox nhận được email subject dạng `[BYD] CV mới: {Vị trí} - {Họ tên}`
- email có `Reply-To` là email của ứng viên
- email chứa link admin tới đơn ứng tuyển

### 3. Cài domain app

Trỏ domain chính, ví dụ `bydgroup.vn`, vào Vercel project.

### 4. Cài domain media

Trên Cloudflare R2:

- tạo bucket media
- gắn custom domain, ví dụ `media.bydgroup.vn`
- cấu hình CORS cho client upload nếu upload trực tiếp từ browser

## Ghi chú migration từ Cloudflare D1

Repo này đã bỏ flow deploy bằng Cloudflare Workers/D1. Dữ liệu production cũ trên D1 cần migrate riêng sang Postgres trước khi cutover production.

Checklist cutover chi tiết nằm ở [docs/vercel-cutover.md](/Users/tuyen.tq/Documents/freelancer/bydgroup/docs/vercel-cutover.md).
