## Why

Payload hiện lưu nguyên vẹn mọi file tải lên. Với ảnh từ người dùng, dung lượng lớn gây tốn dung lượng lưu trữ, tải chậm và không nhất quán chất lượng hiển thị. Cần cơ chế tự động nén/resize ảnh khi upload để kiểm soát kích thước, tối ưu hiệu năng và tránh phải xử lý thủ công từng ảnh.

## What Changes

- Thêm pipeline xử lý ảnh khi upload vào collection `media`, tự động nén/resize và tạo phiên bản chuẩn (ví dụ 1920px, 1280px, thumbnail) bằng thư viện `sharp`.
- Cho phép cấu hình mức nén/chất lượng trong Payload (qua file config) để dễ điều chỉnh mà không sửa code.
- Lưu thông tin phiên bản ảnh nén trong trường metadata để frontend chọn đúng biến thể.
- Đảm bảo API upload/các hook Payload vẫn hoạt động trong khi thêm xử lý nén (cần xử lý async, lỗi, quyền truy cập).

## Capabilities

### New Capabilities
- `payload-image-compression`: Cơ chế tự động nén và tạo nhiều kích thước ảnh khi upload vào Payload, cấu hình được qua payload.config, kèm metadata mô tả các biến thể để frontend tiêu thụ.

### Modified Capabilities
- _None_

## Impact

- Ảnh lưu trong SQLite + filesystem (media folder) sẽ có thêm các phiên bản nén; logic tương tác với collection `media` thay đổi.
- Cần thêm dependency `sharp` và cấu hình build (phải được allow trong pnpm approve-builds).
- Các route `/api/media` và bất kỳ hook upload sẽ chạy thêm bước xử lý, có thể tăng thời gian upload (cần theo dõi hiệu năng).
- Frontend cần đọc metadata mới nếu muốn chọn thumbnail/size cụ thể (optional nhưng cần tài liệu).