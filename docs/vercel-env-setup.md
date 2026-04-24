# Thiết Lập Env cho Vercel + R2

Tài liệu này là checklist thao tác thực chiến để cấu hình env cho repo BYD trên Vercel.

## 1. Các biến app thực sự đang đọc

Theo code hiện tại:

- [payload.config.ts](/Users/tuyen.tq/Documents/freelancer/bydgroup/payload.config.ts:17)
- [next.config.mjs](/Users/tuyen.tq/Documents/freelancer/bydgroup/next.config.mjs:9)

App đang đọc các biến sau:

- `DATABASE_URL`
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `PAYLOAD_SECRET`
- `S3_BUCKET`
- `S3_REGION`
- `S3_ENDPOINT`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`
- `R2_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_R2_PUBLIC_BASE_URL`

## 2. Bộ env tối thiểu nên set trên Vercel

Đây là bộ env production tối thiểu, đủ để app chạy ổn định:

```bash
DATABASE_URL=
PAYLOAD_SECRET=
S3_BUCKET=
S3_REGION=auto
S3_ENDPOINT=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
R2_PUBLIC_BASE_URL=https://media.bydgroup.vn
```

Khuyến nghị set thêm:

```bash
NEXT_PUBLIC_SERVER_URL=https://bydgroup.vn
NEXT_PUBLIC_R2_PUBLIC_BASE_URL=https://media.bydgroup.vn
```

Ghi chú:

- `DATABASE_URL` là biến an toàn nhất để dùng trực tiếp. Dù provider có tự bơm `POSTGRES_URL` hay không, repo này vẫn nên set `DATABASE_URL` rõ ràng.
- `NEXT_PUBLIC_R2_PUBLIC_BASE_URL` hiện không bắt buộc, nhưng nên set cùng giá trị với `R2_PUBLIC_BASE_URL` để sau này nếu có client-side code dùng tới thì không phải đổi thêm.

## 3. Lấy từng giá trị ở đâu

### `DATABASE_URL`

Nguồn:

- Neon dashboard
- hoặc provider Postgres bạn gắn vào Vercel Marketplace

Giá trị cần lấy:

- Chuỗi connection string dạng `postgresql://...`

Khuyến nghị:

- Production dùng DB riêng
- Preview dùng DB riêng hoặc branch riêng
- Không dùng chung production DB cho preview nếu có chỉnh dữ liệu từ admin

### `PAYLOAD_SECRET`

Nguồn:

- tự tạo

Có thể tạo bằng:

```bash
openssl rand -base64 32
```

hoặc:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### `S3_BUCKET`

Nguồn:

- Cloudflare R2 dashboard

Giá trị:

- tên bucket, ví dụ `bydgroup-media`

### `S3_REGION`

Giá trị:

```bash
auto
```

Theo docs Cloudflare R2 S3 API, `auto` là region tương thích chuẩn cho R2.

### `S3_ENDPOINT`

Nguồn:

- Cloudflare R2 S3 API endpoint

Giá trị:

```bash
https://<account-id>.r2.cloudflarestorage.com
```

### `S3_ACCESS_KEY_ID`

Nguồn:

- Cloudflare R2 API token / S3 credentials

### `S3_SECRET_ACCESS_KEY`

Nguồn:

- Cloudflare R2 API token / S3 credentials

### `R2_PUBLIC_BASE_URL`

Nguồn:

- custom domain đã gắn vào bucket R2

Giá trị production:

```bash
https://media.bydgroup.vn
```

Không nên dùng `r2.dev` cho production.

### `NEXT_PUBLIC_SERVER_URL`

Khuyến nghị:

- Production: `https://bydgroup.vn`
- Preview: URL preview của Vercel nếu bạn có code cần absolute URL

Hiện tại repo này chưa đọc biến này trực tiếp trong app code, nhưng vẫn nên giữ để cấu hình đồng nhất.

## 4. Cách nhập env trên Vercel Dashboard

Vào:

`Project Settings -> Environment Variables`

Tạo từng biến theo bảng sau:

| Biến | Production | Preview | Development | Bắt buộc |
| --- | --- | --- | --- | --- |
| `DATABASE_URL` | có | có | có | có |
| `PAYLOAD_SECRET` | có | có | có | có |
| `S3_BUCKET` | có | có | có | có |
| `S3_REGION` | có | có | có | có |
| `S3_ENDPOINT` | có | có | có | có |
| `S3_ACCESS_KEY_ID` | có | có | có | có |
| `S3_SECRET_ACCESS_KEY` | có | có | có | có |
| `R2_PUBLIC_BASE_URL` | có | có | có | có |
| `NEXT_PUBLIC_SERVER_URL` | có | tùy chọn | có | không |
| `NEXT_PUBLIC_R2_PUBLIC_BASE_URL` | có | có | có | không |

Khuyến nghị setup:

- Production: dùng domain thật `bydgroup.vn`
- Preview: có thể dùng cùng bucket R2 nhưng nên dùng DB preview riêng
- Development: dùng `.env.local` hoặc `vercel env pull`

## 5. Mẫu env production hoàn chỉnh

```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DB?sslmode=require
PAYLOAD_SECRET=<random-secret>
NEXT_PUBLIC_SERVER_URL=https://bydgroup.vn

S3_BUCKET=bydgroup-media
S3_REGION=auto
S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=<r2-access-key>
S3_SECRET_ACCESS_KEY=<r2-secret-key>
R2_PUBLIC_BASE_URL=https://media.bydgroup.vn
NEXT_PUBLIC_R2_PUBLIC_BASE_URL=https://media.bydgroup.vn
```

## 6. Mẫu env preview an toàn

Nếu bạn muốn preview deploy không phá dữ liệu production:

```bash
DATABASE_URL=<preview-postgres-url>
PAYLOAD_SECRET=<same-or-separate-secret>
NEXT_PUBLIC_SERVER_URL=https://<preview-domain>.vercel.app

S3_BUCKET=bydgroup-media
S3_REGION=auto
S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=<r2-access-key>
S3_SECRET_ACCESS_KEY=<r2-secret-key>
R2_PUBLIC_BASE_URL=https://media.bydgroup.vn
NEXT_PUBLIC_R2_PUBLIC_BASE_URL=https://media.bydgroup.vn
```

Nếu preview cũng cho phép upload media, cần thêm preview origin vào CORS của bucket R2.

## 7. Đồng bộ env về máy local

Sau khi project đã link với Vercel:

```bash
vercel env pull .env.local
```

Hoặc nếu chỉ muốn chạy với env từ Vercel:

```bash
vercel env run -- npm run build
```

## 8. Checklist trước deploy production

- `DATABASE_URL` trỏ đúng DB production
- `PAYLOAD_SECRET` không còn giá trị mặc định
- `S3_ENDPOINT` đúng account R2
- `R2_PUBLIC_BASE_URL` mở được public
- bucket R2 đã có CORS cho `https://bydgroup.vn`
- `npm run build` pass với env production
- admin login và upload media hoạt động trên preview trước khi cutover

## Nguồn chính thức

- Vercel environment variables: https://vercel.com/docs/environment-variables
- Vercel `vercel env`: https://vercel.com/docs/cli/env
- Vercel Postgres / Marketplace note: https://vercel.com/docs/postgres
- Cloudflare R2 public buckets: https://developers.cloudflare.com/r2/data-access/public-buckets/
- Cloudflare R2 S3 API: https://developers.cloudflare.com/r2/api/s3/api/
