# Catalog TT16

`tt16-symbols.json` tách riêng khỏi player để có thể bổ sung ký hiệu mà không phải sửa lõi biên tập.

Các trường chính:

- `id`: tên phân lớp.
- `label`: tên chức năng/đối tượng.
- `category`: nhóm theo mục/tỷ lệ.
- `geometry`: point / line / polygon dùng cho kiểm tra khi biên tập.
- `aci`: chỉ số màu CAD được giữ trong metadata.
- `scales`: các tỷ lệ mà player hiển thị lớp đó.

Màu CSS trong player chỉ là màu preview; ACI mới là dữ liệu được giữ để nối tiếp pipeline CAD/QGIS.
