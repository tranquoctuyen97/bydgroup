## Context

- Payload hiện lưu trữ media bằng collection `media`, tạo bản ghi và viết file ra thư mục `media/`.
- Các ảnh upload giữ nguyên dung lượng/kích thước nên tốn băng thông và dung lượng.
- Dự án Next.js dùng SQLite + filesystem, chưa có CDN nên tối ưu ảnh ở backend rất quan trọng.

## Goals / Non-Goals

**Goals:**
- Thêm pipeline nén ảnh bằng `sharp` cho mọi upload hợp lệ.
- Cho phép cấu hình size/quality trong `payload.config.ts` và đọc từ 1 chỗ.
- Lưu metadata variant để REST/GraphQL trả về.
- Cài đặt `sharp` và đảm bảo pnpm install không cần approve thủ công.

**Non-Goals:**
- Không xây UI cấu hình phức tạp trong admin (chỉ sửa file config).
- Không thay đổi cách upload non-image.
- Không dựng CDN/thư viện front-end chọn ảnh (chỉ trả metadata).

## Decisions

1. **Dùng `sharp` trong hook `beforeChange` của collection `media`**
   - Hooks cho phép can thiệp trước khi Payload ghi file.
   - `sharp` hỗ trợ resize/nén nhanh, quen thuộc.
   - Alternatives: Cloudinary/S3 (quá nặng, cần dịch vụ ngoài).

2. **Định nghĩa cấu hình `imageSizes` trong payload.config**
   - Dùng object `media.imageSizes = [{name, width, height, quality}]` tương tự docs Payload.
   - Cho phép thêm/bớt size mà không sửa code hook.

3. **Lưu metadata vào trường `variants`**
   - Định nghĩa field JSON/array trong collection `media` để lưu name/width/height/url/filesize.
   - Frontend có thể đọc `media.variants` mà không parse string.

4. **Quy trình lỗi**
   - Nếu `sharp` fail cho một size, log + bỏ qua size đó.
   - Nếu toàn bộ size fail, fallback lưu bản gốc chưa nén.

5. **Pre-approve `sharp` build**
   - Cập nhật `.npmrc` hoặc `pnpm-workspace` để thêm `onlyBuiltDependencies[]=sharp` (đã có pattern). Điều này tránh prompt.

## Risks / Trade-offs

- `sharp` là native module → build failure trên môi trường không hỗ trợ. Mitigate: lock version, document Node version.
- Pipeline tốn CPU → upload chậm hơn. Mitigate: giới hạn số size, log thời gian.
- Không tạo thumbnail cho file không phải ảnh → user có thể kỳ vọng nén PDF; out-of-scope.
- Metadata mismatch nếu rename file thủ công → rely on Payload flows (không edit thủ công).

## Migration Plan

1. Cài `sharp`, cập nhật `.npmrc` cho pre-approve.
2. Sửa `payload.config.ts` để khai báo imageSizes và hook xử lý.
3. Thêm field `variants` trong collection `media` (migrating data optional: old entries sẽ không có variants).
4. Deploy và kiểm tra upload -> metadata.
5. Nếu cần rollback: bỏ hook/cấu hình, `sharp` dependency vẫn an toàn.

## Open Questions

- Có cần hỗ trợ chuyển đổi ảnh WebP/AVIF tự động? (chưa yêu cầu)
- Có cần limit dung lượng tối đa trước khi nén? (hiện chưa)
