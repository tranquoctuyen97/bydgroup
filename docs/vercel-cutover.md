# Cutover Production sang Vercel + Postgres + R2

Tài liệu này dùng cho lần cutover production thật của `bydgroup.vn`. Repo hiện đã được chuyển sang kiến trúc `Vercel + Postgres + Cloudflare R2`, nhưng phần hạ tầng và dữ liệu vẫn cần chạy theo checklist dưới đây.

## 1. Chuẩn bị hạ tầng đích

Tạo trước các tài nguyên production:

- 1 project trên Vercel
- 1 database Postgres production
- 1 bucket R2 production, ví dụ `bydgroup-media`
- 1 custom domain public cho bucket, ví dụ `media.bydgroup.vn`

Khuyến nghị:

- App domain: `bydgroup.vn`
- Media domain: `media.bydgroup.vn`
- DB: ưu tiên `Vercel Postgres` hoặc `Neon Postgres`

## 2. Biến môi trường production

Set đủ các biến sau trên Vercel:

```bash
DATABASE_URL=
PAYLOAD_SECRET=
NEXT_PUBLIC_SERVER_URL=https://bydgroup.vn
S3_BUCKET=
S3_REGION=auto
S3_ENDPOINT=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
R2_PUBLIC_BASE_URL=https://media.bydgroup.vn
```

Ghi chú:

- `S3_ENDPOINT` của R2 có dạng `https://<account-id>.r2.cloudflarestorage.com`
- `R2_PUBLIC_BASE_URL` phải là domain public thật, không nên dùng `r2.dev` cho production

## 3. Export dữ liệu từ Cloudflare D1 cũ

Theo docs Cloudflare D1, export database remote bằng `wrangler d1 export`.

Export toàn bộ schema + data:

```bash
npx wrangler d1 export <d1-database-name> --remote --output=./tmp/bydgroup-d1.sql
```

Nếu cần export từng bảng để xử lý riêng:

```bash
npx wrangler d1 export <d1-database-name> --remote --table=jobs --output=./tmp/jobs.sql
npx wrangler d1 export <d1-database-name> --remote --table=posts --output=./tmp/posts.sql
npx wrangler d1 export <d1-database-name> --remote --table=media --output=./tmp/media.sql
npx wrangler d1 export <d1-database-name> --remote --table=payload_locked_documents_rels --output=./tmp/payload_locked_documents_rels.sql
```

Ưu tiên lấy ít nhất các bảng nghiệp vụ sau:

- `users`
- `jobs`
- `posts`
- `applications`
- `media`
- các bảng `_rels` tương ứng do Payload sinh ra

## 4. Khởi tạo schema Postgres mới

Chạy migration baseline của repo này vào database Postgres đích:

```bash
npm install
npm run generate:types
npm run migrate
```

Chạy các lệnh trên với `DATABASE_URL` đang trỏ vào Postgres production hoặc staging tương ứng.

## 5. Chuẩn bị bucket R2

Trên Cloudflare R2:

1. Tạo bucket production
2. Tạo API token/key cho S3 API
3. Gắn custom domain `media.bydgroup.vn`
4. Bật public access qua custom domain
5. Thêm CORS cho client upload từ app domain

Mẫu CORS tối thiểu:

```json
[
  {
    "id": "bydgroup-web",
    "allowed": {
      "origins": ["https://bydgroup.vn", "https://www.bydgroup.vn"],
      "methods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
      "headers": ["*"]
    },
    "exposeHeaders": ["ETag"],
    "maxAgeSeconds": 3600
  }
]
```

Nếu test preview Vercel có upload media, thêm origin preview tương ứng.

## 6. Di chuyển media cũ lên R2

Repo này hiện dùng Payload `s3Storage` cho collection `media`, nên file upload runtime phải nằm trên R2.

Checklist:

1. Xác định nguồn ảnh/file cũ đang nằm ở đâu
2. Copy toàn bộ object sang bucket R2
3. Giữ nguyên key/path nếu muốn tránh phải remap dữ liệu
4. Kiểm tra URL public mới trả về được qua `https://media.bydgroup.vn/...`

Nếu media cũ chưa nằm trên object storage mà đang nằm local hoặc path tạm, nên export danh sách file từ bảng `media` trước khi copy để tránh sót file.

## 7. Import dữ liệu nghiệp vụ sang Postgres

Phần này cần xử lý cẩn thận vì D1 là SQLite còn đích là Postgres.

Trình tự an toàn:

1. Import schema bằng migration của Payload trước
2. Chuyển data từ file `.sql` export sang format phù hợp Postgres
3. Import lần lượt từng bảng nghiệp vụ
4. Kiểm tra lại khóa ngoại và bảng quan hệ `_rels`
5. Reset sequence nếu import bằng `INSERT` thủ công và bảng có cột tăng tự động

Khuyến nghị thao tác:

- làm ở staging trước
- validate số lượng record từng bảng sau import
- kiểm tra đặc biệt các field JSON, rich text cũ và upload metadata

## 8. Deploy staging trước production

Trước khi cutover domain thật:

1. Deploy project lên Vercel bằng domain preview
2. Login `/admin`
3. Tạo thử 1 bài tuyển dụng
4. Upload thử 1 ảnh vào `media`
5. Mở trang public để xác nhận ảnh ra từ `media.bydgroup.vn`
6. Test nộp form ứng tuyển
7. Test trang tin tức và tuyển dụng

## 9. Cutover domain production

Khi staging ổn:

1. Trỏ `bydgroup.vn` sang Vercel project
2. Giữ `media.bydgroup.vn` trên Cloudflare R2 custom domain
3. Redeploy production với env chuẩn
4. Theo dõi log Vercel và Payload admin ngay sau khi cutover

## 10. Checklist xác nhận sau cutover

- `/` mở bình thường
- `/admin` login được
- tạo/sửa/xóa bài viết được
- upload media mới được
- ảnh cũ và ảnh mới đều tải được
- `/tuyen-dung` và `/tuyen-dung/[slug]` hiển thị đúng
- form ứng tuyển ghi dữ liệu vào DB mới
- không còn request runtime nào phụ thuộc D1 hoặc Worker binding cũ

## Nguồn tham khảo chính thức

- Vercel project config: https://vercel.com/docs/projects/project-configuration
- Vercel build command: https://vercel.com/docs/deployments/configure-a-build
- Cloudflare D1 export: https://developers.cloudflare.com/d1/wrangler-commands/
- Cloudflare D1 import/export guide: https://developers.cloudflare.com/d1/best-practices/import-export-data/
- Cloudflare R2 public buckets/custom domain: https://developers.cloudflare.com/r2/data-access/public-buckets/
- Cloudflare R2 S3 API: https://developers.cloudflare.com/r2/api/s3/api/
- Cloudflare R2 CORS API: https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/cors/
