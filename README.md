# TT16 Map Editor Player

**TT16 Map Editor Player** là bộ player biên tập bản đồ chạy trực tiếp trên trình duyệt, thiết kế để nhúng nhanh vào WebGIS và chuẩn hóa metadata/layer theo Phụ lục I của Thông tư 16/2025/TT-BXD.

Mục tiêu: **chỉ cần add 1 script là có một trình biên tập bản đồ dùng được ngay**.

## Nhúng nhanh

```html
<div id="tt16-map" style="height:720px"></div>

<script src="https://cdn.jsdelivr.net/gh/xulytiengviet/TT16@main/tt16-player.js"></script>
<script>
  TT16Player.mount("#tt16-map", {
    editable: true,
    scale: 5000,
    center: [10.25, 106.38],
    zoom: 12
  });
</script>
```

Player tự tải Leaflet + Leaflet.Draw, tự nạp CSS và catalog ký hiệu từ cùng repository.

> Khi đưa vào sản phẩm thật, nên ghim theo tag/release thay vì `@main`.

## Có sẵn

- Bản đồ nền OSM.
- Vẽ/sửa/xóa **điểm, tuyến, vùng**.
- Chọn ký hiệu/layer TT16 trước hoặc sau khi vẽ.
- Các mức tỷ lệ: **1/500, 1/2.000, 1/5.000, 1/10.000**.
- Trạng thái hồ sơ: **Hiện trạng**, **Quy hoạch đợt đầu**, **Quy hoạch dài hạn**, **Tùy chỉnh**.
- Metadata TT16 được ghi trực tiếp vào `feature.properties.tt16`.
- Danh mục các lớp ranh giới, đất dân dụng, ngoài dân dụng, nông nghiệp, hạ tầng xã hội, giao thông...
- Import GeoJSON bằng kéo/thả hoặc nút Mở dữ liệu.
- Export GeoJSON giữ nguyên metadata TT16.
- Undo/Redo.
- Danh sách đối tượng, chọn đối tượng trên bản đồ, chỉnh tên/mã/ghi chú.
- Chế độ chỉ xem: `editable: false`.
- API nhỏ gọn để nhúng vào WebGIS khác.

## Data model

Mỗi feature được lưu như sau:

```json
{
  "type": "Feature",
  "properties": {
    "name": "Ô đất A1",
    "code": "A1",
    "note": "",
    "tt16": {
      "catalogId": "DAT_DD_Donvio",
      "baseLayer": "DAT_DD_Donvio",
      "layer": "QHDD_DAT_DD_Donvio",
      "label": "Đơn vị ở",
      "aci": 30,
      "geometry": "polygon",
      "scale": 10000,
      "phase": "QHDD",
      "source": "TT16/2025/TT-BXD - Phụ lục I"
    }
  },
  "geometry": {}
}
```

## API

```js
const player = await TT16Player.mount("#tt16-map", options);

player.load(geojson);
player.getGeoJSON();
player.download("do-an-quy-hoach.geojson");
player.setScale(2000);
player.setEditable(false);
player.destroy();
```

### Sự kiện

```js
document.querySelector("#tt16-map")
  .addEventListener("tt16:change", (e) => {
    console.log(e.detail.geojson);
  });
```

## Cấu trúc

```text
TT16/
├─ tt16-player.js              # file nhúng duy nhất
├─ catalog/
│  └─ tt16-symbols.json        # catalog ký hiệu/layer có thể mở rộng
├─ examples/
│  └─ embed.html               # ví dụ nhúng tối thiểu
├─ index.html                  # demo đầy đủ
├─ package.json
├─ LICENSE
└─ README.md
```

## Lưu ý kỹ thuật

Player này là **trình biên tập WebGIS và lớp metadata TT16**. Màu hiển thị web là màu xem nhanh; chỉ số màu AutoCAD (ACI) vẫn được lưu trong thuộc tính `aci` để phục vụ xuất/chuyển đổi sang CAD sau này. Các hatch/block CAD chuyên ngành nên được bổ sung ở tầng exporter CAD/DXF hoặc plugin QGIS/AutoCAD tương ứng, không nên coi màu CSS trên trình duyệt là thay thế cho tiêu chuẩn CAD.

Các tên phân lớp và chỉ số màu trong catalog được tổ chức để có thể cập nhật độc lập mà không phải sửa player.

## Mở rộng nhanh

Bạn có thể truyền catalog riêng:

```js
TT16Player.mount("#tt16-map", {
  catalogUrl: "./my-tt16-symbols.json"
});
```

Hoặc truyền trực tiếp:

```js
TT16Player.mount("#tt16-map", {
  catalog: [
    {
      "id": "MY_LAYER",
      "label": "Lớp riêng",
      "geometry": "polygon",
      "aci": 7,
      "scales": [500, 2000, 5000, 10000],
      "category": "Tùy chỉnh"
    }
  ]
});
```

## Giấy phép

MIT © 2026 Long Ngo.
