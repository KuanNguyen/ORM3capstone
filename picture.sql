CREATE DATABASE picture; 

use picture;

CREATE TABLE nguoi_dung(
	nguoi_dung_id INT PRIMARY KEY AUTO_INCREMENT,
    email  VARCHAR(255),
    mat_khau VARCHAR(255),
    ho_ten VARCHAR(255),
    tuoi INT,
    anh_dai_dien VARCHAR(255)
);

DROP TABLE users;

CREATE TABLE hinh_anh(
	hinh_id INT PRIMARY KEY AUTO_INCREMENT,
    ten_hinh VARCHAR(255),
    duong_dan VARCHAR(255),
    mo_ta VARCHAR(255),
    nguoi_dung_id INT, 
    
     FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id)
    
);

CREATE TABLE binh_luan (
	nguoi_dung_id INT ,
    hinh_id INT ,
    ngay_binh_luan DATE,
    noi_dung VARCHAR(255),
    
    PRIMARY KEY (nguoi_dung_id,hinh_id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id)
);

CREATE TABLE luu_anh (
	nguoi_dung_id INT,
    hinh_id INT,
    ngay_luu DATE,
    
    PRIMARY KEY (nguoi_dung_id,hinh_id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id)
);


INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`,`ho_ten`,`tuoi`,`anh_dai_dien`) VALUES
( 1, 'quan@gmail.com', '1234', 'QuanNguyen', 23, NULL ),
( 2, 'quan2@gmail.com', '12345', 'QuanNguyenTran', 24, NULL ),
( 3, 'quan3@gmail.com', '12346qw', 'QuanNguyenLam', 23, NULL );

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(1, 'hinh a', 'https://picsum.photos/id/1/500/400.jpg', NULL, 1);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(2, 'hinh ba', 'https://picsum.photos/id/2/500/400.jpg', NULL, 1);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(3, 'hinh cde', 'https://picsum.photos/id/3/500/400.jpg', NULL, 2);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(4, 'hinh def', 'https://picsum.photos/id/4/500/400.jpg', NULL, 3);

INSERT INTO `binh_luan` (`nguoi_dung_id`, `hinh_id`, `noi_dung`, `ngay_binh_luan`) VALUES
(1, 1, 'ảnh đẹp', '2022-12-01');
INSERT INTO `binh_luan` (`nguoi_dung_id`, `hinh_id`, `noi_dung`, `ngay_binh_luan`) VALUES
(1, 2, 'quá đẹp', '2022-12-01');
INSERT INTO `binh_luan` (`nguoi_dung_id`, `hinh_id`, `noi_dung`, `ngay_binh_luan`) VALUES
(2, 1, 'tuyệt vời', '2022-11-02');

INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(1, 3, '2022-12-01');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(2, 4, '2022-12-01');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(3, 1, '2022-12-01');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(3, 2, '2022-12-01'),
(3, 3, '2022-11-02');