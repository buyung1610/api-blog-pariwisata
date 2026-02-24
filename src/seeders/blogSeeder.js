const fs = require("fs");
const path = require("path");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function seedBlogs() {
  const uploadDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  await User.deleteMany({ name: { $in: ["Budi", "Ani", "Beni", "Edo"] } });

  const hashedPasswordBudi = await bcrypt.hash("passwordBudi2", 10);
  const hashedPasswordAni = await bcrypt.hash("passwordAni2", 10);
  const hashedPasswordBeni = await bcrypt.hash("passwordBeni2", 10);
  const hashedPasswordEdo = await bcrypt.hash("passwordEdo2", 10);

  const users = await User.insertMany([
    {
      name: "Budi",
      username: "budi",
      appSource: "pariwisata",
      password: hashedPasswordBudi,
    },
    {
      name: "Ani",
      username: "ani",
      appSource: "pariwisata",
      password: hashedPasswordAni,
    },
    {
      name: "Beni",
      username: "beni",
      appSource: "kesehatan",
      password: hashedPasswordBeni,
    },
    {
      name: "Edo",
      username: "edo",
      appSource: "kesehatan",
      password: hashedPasswordEdo,
    },
  ]);

  const blogs = [
    // Artikel Wisata
    {
      userId: users[0]._id,
      image: "banda-neira.png",
      title: "Banda Neira",
      date: "2022-01-01",
      type: "pariwisata",
      description: `Banda Tangah atau Banda Naira adalah salah satu pulau di Kepulauan Banda, dan merupakan pusat administratif Kecamatan Banda, Kabupaten Maluku Tengah, Maluku, Indonesia. Secara administratif, Banda Neira terbagi dalam 12 desa, yakni Dwiwarna, Kampung Baru, Merdeka, Nusantara, Rajawali,Tanah Rata, Lonthoir, Walang, Katoro, Kumber, Selamon, Dender, Waer dan Pulau Hatta.
        \nTopografi pulau ini cenderung datar, sehingga memungkinkan didirikannya kota kecil. Pulau Banda Neira memiliki kantor pemerintahan, toko, dermaga, dan bandara. Penduduk pulau ini berjumlah 14.000.
        \nBanda Neira pernah menjadi pusat perdagangan pala dan fuli (bunga pala) dunia, karena Kep. Banda adalah satu-satunya sumber rempah-rempah yang bernilai tinggi itu hingga pertengahan abad ke-19. Kota modernnya didirikan oleh anggota VOC, yang membantai penduduk Banda untuk mendapatkan palanya pada tahun 1621 dan membawa yang tersisa ke Batavia (kini Jakarta) untuk dijadikan budak.
        \nPulau ini juga terkenal sebagai tempat pembuangan tahanan politik pada masa Pemerintahan Kolonial Hindia Belanda. Beberapa tokoh perjuangan nasional yang pernah merasakan tinggal di pulau ini di antaranya Mohammad Hatta, Sutan Syahrir, dan Cipto Mangunkusumo. Pada 2016, rumah tempat Sutan Syahrir dan Mohammad Hatta tinggal telah dijadikan museum sedangkan rumah Cipto Mangkusumo masih dibiarkan kosong.
        `,
    },
    {
      userId: users[0]._id,
      image: "borobudur.png",
      title: "Candi Borobudur",
      date: "2022-02-01",
      type: "pariwisata",
      description: `Candi Borobudur adalah sebuah candi Buddha yang terletak di Borobudur, Magelang, Jawa Tengah, Indonesia. Candi ini terletak kurang lebih 100 km di sebelah barat daya Semarang, 86 km di sebelah barat Surakarta, dan 40 km di sebelah barat laut Yogyakarta. Candi dengan banyak stupa ini didirikan oleh para penganut agama Buddha Mahayana sekitar tahun 800-an Masehi pada masa pemerintahan wangsa Syailendra. Borobudur adalah candi atau kuil Buddha terbesar di dunia, sekaligus salah satu monumen Buddha terbesar di dunia.
        \nMonumen ini terdiri atas enam teras berbentuk bujur sangkar yang di atasnya terdapat tiga pelataran melingkar, pada dindingnya dihiasi dengan 2.672 panel relief dan aslinya terdapat 504 arca Buddha. Borobudur memiliki koleksi relief Buddha terlengkap dan terbanyak di dunia. Stupa utama terbesar terletak di tengah sekaligus memahkotai bangunan ini, dikelilingi oleh tiga barisan melingkar 72 stupa berlubang yang di dalamnya terdapat arca Buddha tengah duduk bersila dalam posisi teratai sempurna dengan mudra (sikap tangan) Dharmachakra mudra (memutar roda dharma).
        \nMonumen ini merupakan model alam semesta dan dibangun sebagai tempat suci untuk memuliakan Buddha sekaligus berfungsi sebagai tempat ziarah untuk menuntun umat manusia beralih dari alam nafsu duniawi menuju pencerahan dan kebijaksanaan sesuai ajaran Buddha.Para peziarah masuk melalui sisi timur dan memulai ritual di dasar candi dengan berjalan melingkari bangunan suci ini searah jarum jam, sambil terus naik ke undakan berikutnya melalui tiga tingkatan ranah dalam kosmologi Buddha. Ketiga tingkatan itu adalah Kāmadhātu (ranah hawa nafsu), Rupadhatu (ranah berwujud), dan Arupadhatu (ranah tak berwujud). Dalam perjalanannya para peziarah berjalan melalui serangkaian lorong dan tangga dengan menyaksikan tak kurang dari 1.460 panel relief indah yang terukir pada dinding dan pagar langkan.
        \nMenurut bukti-bukti sejarah, Borobudur ditinggalkan pada abad ke-10 seiring dipindahkannya pusat Kerajaan Mataram Kuno ke Jawa Timur oleh Mpu Sindok.Dunia mulai menyadari keberadaan bangunan ini sejak ditemukan 1814 oleh Sir Thomas Stamford Raffles, yang saat itu menjabat sebagai Gubernur Jenderal Inggris atas Jawa. Sejak saat itu Borobudur telah mengalami serangkaian upaya penyelamatan dan pemugaran (perbaikan kembali). Proyek pemugaran terbesar digelar pada kurun waktu 1975 hingga 1982 atas upaya Pemerintah Republik Indonesia dan UNESCO, kemudian situs bersejarah ini masuk dalam daftar Situs Warisan Dunia.
        `,
    },
    {
      userId: users[0]._id,
      image: "bromo.png",
      title: "Gunung Bromo",
      date: "2022-03-01",
      type: "pariwisata",
      description: `Indonesia, negara kepulauan yang kaya akan keindahan alamnya, memiliki sejumlah gunung berapi yang menakjubkan, salah satunya adalah Gunung Bromo. Terletak di Taman Nasional Bromo Tengger Semeru, Jawa Timur, Gunung Bromo telah menjadi daya tarik utama bagi wisatawan domestik dan mancanegara. Dengan ketinggian sekitar 2.329 meter di atas permukaan laut, Gunung Bromo adalah salah satu gunung berapi paling aktif di Indonesia. Pemandangan kawah yang luas dengan latar belakang langit biru dan awan putih telah menjadi pemandangan ikonik yang memikat banyak pengunjung. Tidak hanya terbatas pada kawahnya, kawasan sekitarnya juga menawarkan panorama alam yang memukau, termasuk lautan pasir serta dikelilingi oleh pegunungan hijau yang menjulang.
        \nTaman Nasional Bromo Tengger Semeru juga dikenal karena keberadaan masyarakat Tengger yang menjalankan tradisi dan ritual unik. Salah satunya adalah upacara Kasada yang dilakukan setiap tahun pada bulan purnama di tengah-tengah kawah Gunung Bromo. Dalam upacara ini, masyarakat Tengger memberikan persembahan kepada Sang Hyang Widhi (Tuhan Yang Maha Esa) sebagai tanda syukur atas panen yang melimpah. Ritual ini menarik perhatian banyak wisatawan yang ingin menyaksikan keunikan budaya lokal.
        \nSelain pendakian, terdapat beragam kegiatan wisata lain yang dapat dinikmati di sekitar Gunung Bromo. Wisatawan dapat menikmati perjalanan menunggang kuda melintasi lautan pasir, mengunjungi Pura Luhur Poten yang berada di kaki Gunung Bromo, atau sekedar menikmati matahari terbit yang memukau dari puncak Penanjakan. Tidak ketinggalan untuk Anda yang gemar berswafoto, Gunung Bromo memiliki berbagai tempat dan pemandangan menakjubkan yang layak untuk diabadikan.
        `,
    },
    {
      userId: users[0]._id,
      image: "nusa-penida.png",
      title: "Nusa Penida",
      date: "2022-04-01",
      type: "pariwisata",
      description: `Nusa Penida adalah sebuah pulau bagian dari Kabupaten Klungkung, Bali, Indonesia yang terletak di sebelah tenggara Bali yang dipisahkan oleh Selat Badung. Di dekat pulau ini terdapat juga pulau-pulau kecil lainnya yaitu Nusa Ceningan dan Nusa Lembongan. Perairan pulau Nusa Penida terkenal dengan kawasan selamnya di antaranya terdapat di Crystal Bay, Manta Point, Batu Meling, Batu Lumbung, Batu Abah, Toyapakeh dan Malibu Point.
        \nSejarah pulau Nusa Penida di Bali dimulai pada abad ke-10. Tulisan-tulisan paling awal tentang Nusa Penida memang telah ditemukan di Pilar Belanjong, yang berasal dari tahun 914 M. Pilar ini memuat prasasti yang menyebutkan ekspedisi militer Raja Bali pertama, Sri Kesari Warmadewa, menaklukan Nusa Penida.
        \nMasyarakat Nusa Penida sudah lama mampu melawan raja-raja Bali yang banyak mengorganisir ekspedisi militer lainnya. Namun, pada paruh kedua abad ke-17, pulau Nusa Penida pasti ditaklukkan oleh ekspedisi Dinasti Gelgel. Raja terakhir Nusa Penida, Dalem Bungkut, tewas dalam pertempuran.
        \nNusa Penida kemudian menjadi bagian dari istana Klungkung, salah satu dari sembilan kerajaan di Bali. Setelah integrasi Bali ke Hindia Belanda pada tahun 1908 yang kemudian menjadi Indonesia kemudian, Nusa Penida tetap melekat pada Kabupaten Klungkung.
        \nSebuah peta Belanda yang dibuat pada tahun 1900 menyebut Nusa Penida sebagai Pulau Bandit Karena dulu Kerajaan Klungkung pernah mendeportasi penjahat, lawan politik dan ahli ilmu hitam ke Nusa Penida.
        `,
    },
    {
      userId: users[0]._id,
      image: "ranu-gumbolo.png",
      title: "Ranu Gumbolo",
      date: "2022-05-01",
      type: "pariwisata",
      description: `Ranu Kumbolo (bahasa Indonesia: Danau Kumbolo) adalah sebuah danau kawah (maar) yang terletak di dalam Taman Nasional Bromo Tengger Semeru (TNBTS), Jawa Timur, Indonesia. Danau ini merupakan bagian dari rute termudah pendakian yang berawal dari Ranu Pani menuju puncak Gunung Semeru. Dengan luas 12 hektare, Ranu Kumbolo menjadi danau terbesar dan terindah dari semua danau dalam kawasan TNBTS.
        \nRanu Kumbolo merupakan sebuah danau vulkanik, tepatnya bekas kawah letusan gunung yang digenangi air (disebut maar) yang merupakan bagian dari kompleks pegunungan vulkanik Tengger-Semeru. Pegunungan ini terdiri atas beberapa kaldera dan kerucut-kerucut vulkanik (gunung), yang membentang sepanjang sumbu utara-selatan sejauh lk. 25 km di tengah-tengah daratan Jawa Timur. Berderet mulai dari sebelah utara adalah Kaldera Tengger, Kaldera Jambangan, Kaldera Ajek-Ajek, Gunung Kepolo, dan paling selatan adalah kerucut vulkanik ganda Mahameru-Semeru.
        \nRanu Kumbolo, yang terletak di sudut Kaldera Jambangan, adalah satu dari empat buah danau kawah yang tersebar terpencar-pencar di kompleks pegunungan tersebut; tiga yang lain adalah Ranu Pani, Ranu Regulo, dan Ranu Darungan.Kompleks vulkanik ini diperkirakan terbangun selama kala Oligosen hingga Miosen.
        `,
    },
    {
      userId: users[1]._id,
      image: "raja-ampat.jpg",
      title: "Raja Ampat",
      date: "2022-06-01",
      type: "pariwisata",
      description: `Kabupaten Raja Ampat adalah salah satu kabupaten di provinsi Papua Barat Daya, Indonesia. Ibukota kabupaten ini terletak di Waisai, di mana Waisai menjadi pusat pemerintahan Kabupaten Raja Ampat. Kabupaten ini memiliki 610 pulau, termasuk kepulauan Raja Ampat. Empat di antaranya, yakni Pulau Misool, Salawati, Batanta dan Waigeo, merupakan pulau-pulau besar. Dari seluruh pulau hanya 35 pulau yang berpenghuni sedangkan pulau lainnya tidak berpenghuni dan sebagian besar belum memiliki nama. Kabupaten ini memiliki total luas 67.379,60 km² dengan rincian luas daratan 7.559,60 km² dan luas lautan 59.820,00 km².
        \nMenurut cerita mitos masyarakat asli Raja Ampat, pada suatu hari seorang wanita menemukan tujuh telur, empat diantaranya berubah menjadi pangeran dan tiga sisanya menjadi seorang wanita, hantu, dan sebuah batu. Keempat pangeran tadi berpisah lalu masing-masing berkuasa di Waigeo (Wawiyai), Salawati (Samate), Misool Barat (Waigama) dan Misool Timur (Lilinta). Sedangkan kerajaan di Salawati selatan di Sailolof didirikan oleh fun Mo, seorang suku Moi yang juga berasal dari telur burung baikole, menikah dengan putri raja Waigeo, Pinfun Libit.
        \nDilihat dari sisi sejarah, Kepulauan Raja Ampat di abad ke-15 merupakan bagian dari kekuasaan Kesultanan Tidore, sebuah kerajaan besar yang berpusat di Kepulauan Maluku setelah sebelumnya wilayah ini berhubungan dengan Kesultanan Bacan. Setelah ekspansi melalui hubungannya dengan Gurabesi, Sultan Tidore menjalankan pemerintahan dan memungut upeti dari wilayah ini melalui raja-raja lokal yang berkuasa di Waigeo, Salawati, Misool, dan Waigama. Sedangkan Sailolof yang pendirinya tidak memiliki hubungan darah dengan kerajaan lain juga memiliki hubungan yang sama dengan Tidore.
        \nIstilah 4 orang Raja (Waigama jika menurut sudut pandang Tidore atau Sailolof jika menurut sudut pandang lokal) dalam yang memerintah di gugusan kepulauan itulah yang menjadi awal dari nama Kalana Fat atau Raja Ampat.
        `,
    },
    {
      userId: users[1]._id,
      image: "kawah-ijen.jpg",
      title: "Kawah Ijen",
      date: "2022-07-01",
      type: "pariwisata",
      description: `Gunung Ijen adalah sebuah gunung berapi yang terletak di perbatasan Kabupaten Banyuwangi dan Kabupaten Bondowoso, Jawa Timur, Indonesia. Gunung ini memiliki ketinggian 2.386 mdpl. Gunung Ijen terakhir meletus pada tahun 1999. Salah satu fenomena alam yang paling terkenal dari Gunung Ijen adalah blue fire (api biru) di dalam kawah yang terletak di puncak gunung tersebut. Blue fire ini hanya dapat ditemukan di dunia negara didunia ini yaitu salah satunya bertepatan Banyuwangi. Pendakian gunung ini bisa dimulai dari dua tempat, yakni dari Banyuwangi atau dari Bondowoso.
        \nKawah Ijen adalah sebuah danau kawah yang bersifat asam yang berada di puncak Gunung Ijen dengan kedalaman danau 200 meter dan luas kawah mencapai 5.466 Hektar. Danau kawah Ijen dikenal merupakan danau air asam kuat terbesar di dunia. Kawah Ijen berada dalam wilayah Cagar Alam Taman Wisata Ijen Kabupaten Bondowoso dan Kabupaten Banyuwangi, Jawa Timur. Fenomena eternal blue fire atau api biru abadi berada di dalam kawah Ijen, dan pemandangan alami ini hanya terjadi di dua tempat di dunia yaitu Etiopia (gunung Dallol) dan Ijen. 
        \nBlue fire hanya dapat dilihat oleh mata manusia saat tidak ada cahaya, karenanya waktu ideal untuk melihatnya adalah jam 2 hingga jam 4 dini hari, karena pendakian Gunung Ijen baru mulai dibuka jam 2 dini hari. Dari Kawah Ijen, kita dapat melihat pemandangan gunung lain yang ada di kompleks Pegunungan Ijen, di antaranya adalah puncak Gunung Marapi yang berada di timur Kawah Ijen, Gunung Raung, Gunung Suket, dan Gunung Rante.
        \nKawah Ijen menunjukkan jenis fitur vulkanik khusus yang umum di Indonesia, dengan diameter sekitar 1 kilometer dan kedalaman 175 meter. Lantainya ditutupi sepenuhnya oleh danau yang hangat, berwarna hijau biru susu yang ditahan oleh bendungan yang dibangun bertahun-tahun yang lalu oleh Belanda, untuk menjaga air panas yang sarat mineral dari hujan tanah tanaman di bawahnya. Suhu turun pada malam hari, di dekat bibir kawah bisa turun menjadi sekitar 5 ° Celcius. Jalan tersebut berakhir di Jampit, di mana tersedia tempat berlindung yang sangat mendasar. Dimungkinkan juga untuk tidur di stasiun vulkanologi tua di atas bukit, sekarang digunakan oleh pengumpul belerang, tetapi izin harus diperoleh sebelumnya.
      `,
    },
    {
      userId: users[1]._id,
      image: "danau-toba.jpg",
      title: "Danau Toba",
      date: "2022-08-01",
      type: "pariwisata",
      description: `Danau Toba adalah danau alami terbesar di Sumatera Utara, Indonesia yang terletak di kaldera gunung supervulkan. Danau ini memiliki panjang 100 kilometer (62 mil), lebar 30 kilometer (19 mi), dan kedalaman 508 meter (1.667 ft). Danau ini terletak di tengah pulau Sumatra bagian utara dengan ketinggian permukaan sekitar 900 meter (2.953 ft). Danau ini membentang dari. Danau Toba merupakan danau terbesar di Indonesia sekaligus danau vulkanik terbesar di dunia.
        \nDanau Toba terbentuk akibat dari letusan gunung berapi super masif berkekuatan VEI 8 sekitar 69.000 hingga 77.000 tahun yang lalu hal ini kemudian memicu perubahan iklim global. Metode penanggalan terkini yang berakurat menetapkan letusan tersebut terjadi sekitar 74.000 tahun yang lalu. Letusan ini merupakan letusan eksplosif terbesar di Bumi dalam 25 juta tahun terakhir. Menurut teori bencana Toba, letusan ini berdampak besar bagi populasi manusia di seluruh dunia; dampak letusan menewaskan sebagian besar manusia yang hidup waktu itu dan diyakini menyebabkan penyusutan populasi di Afrika Timur-Tengah dan India sehingga memengaruhi genetika populasi manusia di seluruh dunia sampai sekarang.
        \nPara ilmuwan sepakat bahwa letusan Toba memicu musim dingin vulkanik yang menyebabkan jatuhnya suhu dunia antara 3 hingga 5 °C (5,4 hingga 9,0 °F), dan hingga 15 °C (27 °F) di daerah lintang atas. Penelitian lanjutan di Danau Malawi, Afrika Timur, menemukan endapan debu letusan Toba, tetapi tidak menemukan bukti perubahan iklim besar di Afrika Timur.[7]
      `,
    },
    {
      userId: users[1]._id,
      image: "gua-jomblang.jpg",
      title: "Goa Jomblang",
      date: "2022-09-01",
      type: "pariwisata",
      description: `Gua Jomblang merupakan gua vertikal yang bertipe collapse doline yang juga menjadi objek wisata di Kabupaten Gunungkidul, Daerah Istimewa Yogyakarta. Gua ini terbentuk akibat proses geologi amblasnya tanah beserta vegetasi yang ada di atasnya ke dasar bumi yang terjadi ribuan tahun lalu. Runtuhan ini membentuk sinkhole atau sumuran yang dalam bahasa Jawa dikenal dengan istilah luweng. Itulah yang membuat unik karena di dalam gua terdapat luas mulut gua sekitar 50 meter ini sering disebut dengan nama Luweng Jomblang.
        \nSaat ini Gua Jomblang merupakan tempat konservasi tumbuhan purba dan dikembangkan menjadi tempat wisata minat khusus yang mana dikelola oleh penduduk atau warga setempat. Untuk menuruni gua vertikal ini pihak pengelola sudah menyediakan perlengkapan lengkap sesuai standar keselamatan caving di gua vertikal.
        \nSinar matahari yang menerobos masuk dari Luweng Grubug setinggi 90 meter membentuk satu tiang cahaya, menyinari flowstone yang indah serta kedalaman gua yang gelap gulita. Air yang menetes dari ketinggian turut mempercantik pemandangan. Tidak salah jika banyak fotografer yang berburu foto di dalam goa ini.
      `,
    },
    {
      userId: users[1]._id,
      image: "gunung-rinjani.jpg",
      title: "Gunung Rinjani",
      date: "2022-10-01",
      type: "pariwisata",
      description: `Gunung Rinjani adalah gunung yang berlokasi di Pulau Lombok, Nusa Tenggara Barat. Gunung ini merupakan gunung berapi kedua tertinggi di Indonesia dengan ketinggian 3.726 mdpl serta terletak pada lintang 8º25' LS dan 116º28' BT ini merupakan gunung favorit bagi pendaki Indonesia karena keindahan pemandangannya. Gunung ini merupakan bagian dari Taman Nasional Gunung Rinjani yang memiliki luas sekitar 41.330 ha dan diusulkan penambahannya sehingga menjadi 76.000 ha ke arah barat dan timur.
        \nGunung Rinjani merupakan penerus dari Gunung Samalas yang pernah meletus tahun 1257 pada masa Holosen di Indonesia, yang mengakibatkan penurunan suhu global, gagal panen dan hancurnya kerajaan pamatan di wilayah Pulau Lombok. Secara administratif gunung ini berada dalam wilayah tiga kabupaten: Lombok Timur, Lombok Tengah, dan Lombok Utara.
        \nGunung Rinjani memiliki titik tertinggi 3.726 mdpl, mendominasi sebagian besar pemandangan Pulau Lombok bagian utara.Di sebelah barat kerucut Rinjani terdapat kaldera dengan luas sekitar 3.500 m × 4.800 m, memanjang kearah timur dan barat. Di kaldera ini terdapat Segara Anak (segara dalam Bahasa Sasak berarti laut atau danau) seluas 11.000.000 m persegi dengan kedalaman 230 m. Air yang mengalir dari danau ini membentuk air terjun yang mengalir melewati jurang yang curam. Di Segara Anak banyak terdapat ikan mas dan mujair sehingga sering digunakan untuk memancing. Bagian selatan danau ini disebut dengan Segara Endut.
        \nDi sisi timur kaldera terdapat Gunung Baru (atau Gunung Barujari) yang memiliki kawah berukuran 170m×200 m dengan ketinggian 2.296 – 2376 m dpl. Gunung kecil ini terakhir meletus pada tanggal 25 Oktober 2015 dan 3 November 2015,setelah sebelumnya tercatat meletus Mei 2009 dan pada tahun 2004. Letusan tahun 2009 ini memakan korban jiwa tidak langsung 31 orang, karena banjir bandang pada Kokok (Sungai) Tanggek akibat desakan lava ke Segara Anak. Sebelumnya, Gunung Barujari pernah tercatat meletus pada tahun 1944 (sekaligus pembentukannya), 1966, dan 1994.
      `,
    },
    // Artikel Kesehatan
    {
      userId: users[2]._id,
      image: "minum-air-putih.jpg",
      title: "Pentingnya Minum Air Putih yang Cukup Setiap Hari",
      date: "2022-09-12",
      type: "kesehatan",
      category: "Gaya Hidup Sehat",
      description: `Air putih memiliki peran penting dalam menjaga keseimbangan cairan tubuh dan mendukung fungsi organ vital seperti ginjal, jantung, dan otak. Tubuh manusia sebagian besar terdiri dari air, sehingga kebutuhan cairan harus terpenuhi agar sistem tubuh dapat bekerja dengan optimal. Kekurangan cairan dapat menyebabkan dehidrasi yang ditandai dengan pusing, kelelahan, kulit kering, dan menurunnya konsentrasi.
        \nSelain menjaga fungsi organ, air putih juga membantu proses metabolisme dan pembuangan racun dari dalam tubuh. Ginjal memerlukan cukup cairan untuk menyaring limbah dan mengeluarkannya melalui urin. Hidrasi yang baik juga berperan dalam menjaga suhu tubuh tetap stabil, terutama saat beraktivitas fisik atau berada di lingkungan yang panas.
        \nKebiasaan minum air putih yang cukup setiap hari dapat meningkatkan energi, menjaga kesehatan kulit, serta membantu mengontrol nafsu makan. Disarankan untuk mengonsumsi minimal delapan gelas air per hari, namun kebutuhan ini dapat berbeda tergantung aktivitas, kondisi kesehatan, dan cuaca. Membiasakan diri membawa botol minum dapat menjadi langkah sederhana untuk menjaga hidrasi sepanjang hari.`,
    },
    {
      userId: users[2]._id,
      image: "manfaat-olahraga-pagi.jpg",
      title: "Manfaat Olahraga Ringan di Pagi Hari",
      date: "2022-10-14",
      type: "kesehatan",
      category: "Kebugaran",
      description: `Olahraga ringan di pagi hari merupakan kebiasaan sehat yang dapat memberikan banyak manfaat bagi tubuh. Aktivitas seperti berjalan kaki, peregangan, atau bersepeda santai membantu melancarkan peredaran darah dan meningkatkan suplai oksigen ke seluruh tubuh. Hal ini membuat tubuh terasa lebih segar dan siap menjalani aktivitas harian.
        \nSelain manfaat fisik, olahraga pagi juga berdampak positif pada kesehatan mental. Aktivitas fisik merangsang pelepasan hormon endorfin yang dapat meningkatkan suasana hati dan mengurangi stres. Dengan rutin berolahraga di pagi hari, seseorang dapat merasa lebih rileks, percaya diri, dan fokus dalam menjalani pekerjaan atau belajar.
        \nMelakukan olahraga ringan selama 15–30 menit setiap pagi juga membantu menjaga berat badan ideal dan meningkatkan kualitas tidur. Kebiasaan ini dapat menjadi bagian dari gaya hidup sehat yang mudah diterapkan. Konsistensi adalah kunci untuk merasakan manfaat jangka panjang dari aktivitas fisik yang`,
    },
    {
      userId: users[2]._id,
      image: "menjaga-kesehatan-mata.jpg",
      title: "Tips Menjaga Kesehatan Mata di Era Digital",
      date: "2022-10-06",
      type: "kesehatan",
      category: "Kesehatan Mata",
      description: `Di era digital, penggunaan perangkat elektronik seperti smartphone, komputer, dan tablet menjadi bagian dari kehidupan sehari-hari. Paparan layar yang terlalu lama dapat menyebabkan ketegangan mata digital, yang ditandai dengan mata kering, penglihatan kabur, dan sakit kepala. Kondisi ini terjadi karena mata terus-menerus fokus pada jarak dekat tanpa istirahat yang cukup.
        \nSalah satu cara efektif untuk menjaga kesehatan mata adalah dengan menerapkan aturan 20-20-20. Setiap 20 menit menatap layar, alihkan pandangan ke objek sejauh 20 kaki selama 20 detik untuk memberi waktu istirahat bagi otot mata. Selain itu, penting untuk mengatur kecerahan layar sesuai pencahayaan ruangan dan menjaga jarak pandang yang ideal.
        \nKonsumsi makanan yang kaya vitamin A dan antioksidan, seperti wortel, bayam, dan ikan, juga dapat membantu menjaga kesehatan mata. Mengurangi penggunaan gadget sebelum tidur dapat mencegah kelelahan mata dan membantu meningkatkan kualitas tidur. Dengan kebiasaan yang tepat, kesehatan mata dapat tetap terjaga meskipun sering menggunakan perangkat digital.`,
    },
    {
      userId: users[2]._id,
      image: "pola-tidur-sehat.jpg",
      title: "Pola Tidur Sehat untuk Produktivitas Maksimal",
      date: "2022-11-17",
      type: "kesehatan",
      category: "Kesehatan Mental",
      description: `Tidur yang berkualitas merupakan kebutuhan dasar yang penting bagi kesehatan tubuh dan keseimbangan mental. Saat tidur, tubuh melakukan proses pemulihan, memperbaiki sel yang rusak, serta memperkuat sistem imun. Kurang tidur dapat menyebabkan kelelahan, penurunan konsentrasi, dan gangguan suasana hati.
        \nKebiasaan tidur yang tidak teratur juga dapat meningkatkan risiko penyakit kronis seperti hipertensi, diabetes, dan obesitas. Oleh karena itu, penting untuk memiliki jadwal tidur yang konsisten setiap hari. Menciptakan lingkungan tidur yang nyaman, gelap, dan tenang dapat membantu tubuh lebih mudah beristirahat.
        \nMenghindari penggunaan gadget sebelum tidur juga sangat disarankan karena cahaya biru dapat mengganggu produksi hormon melatonin. Orang dewasa dianjurkan tidur selama 7–9 jam setiap malam untuk menjaga kesehatan dan produktivitas. Dengan tidur yang cukup, tubuh akan lebih siap menghadapi aktivitas keesokan harinya.`,
    },
    {
      userId: users[2]._id,
      image: "pentingnya-sarapan-seimbang.jpg",
      title: "Pentingnya Sarapan Seimbang Setiap Pagi",
      date: "2022-10-16",
      type: "kesehatan",
      category: "Nutrisi",
      description: `Sarapan merupakan sumber energi pertama bagi tubuh setelah berpuasa semalaman. Mengonsumsi sarapan yang sehat dan seimbang dapat membantu menjaga kadar gula darah tetap stabil serta meningkatkan konsentrasi. Tanpa sarapan, tubuh cenderung merasa lemas dan sulit fokus saat beraktivitas.
        \nMenu sarapan yang baik sebaiknya mengandung karbohidrat kompleks, protein, serat, dan lemak sehat. Contohnya adalah oatmeal dengan buah, roti gandum dengan telur, atau yogurt dengan granola. Kombinasi nutrisi ini membantu memberikan energi yang tahan lama dan mendukung fungsi otak.
        \nMembiasakan sarapan setiap pagi juga dapat membantu mengontrol nafsu makan sepanjang hari. Orang yang rutin sarapan cenderung memiliki pola makan yang lebih sehat dan risiko obesitas yang lebih rendah. Dengan memilih menu yang tepat, sarapan dapat menjadi langkah awal menuju gaya hidup sehat.`,
    },
    {
      userId: users[3]._id,
      image: "mengelola-stres.jpg",
      title: "Cara Mengelola Stres dengan Teknik Pernapasan",
      date: "2022-10-01",
      type: "kesehatan",
      category: "Kesehatan Mental",
      description: `Stres merupakan respons alami tubuh terhadap tekanan atau tantangan dalam kehidupan sehari-hari. Namun, stres yang berkepanjangan dapat berdampak buruk bagi kesehatan fisik dan mental, seperti gangguan tidur, menurunnya sistem imun, dan meningkatnya risiko penyakit jantung. Oleh karena itu, penting untuk mengelola stres dengan cara yang sehat.
        \nSalah satu metode yang efektif dan mudah dilakukan adalah teknik pernapasan dalam. Teknik ini membantu menenangkan sistem saraf, menurunkan detak jantung, dan mengurangi ketegangan otot. Pernapasan yang teratur juga membantu meningkatkan suplai oksigen ke otak sehingga pikiran menjadi lebih jernih.
        \nMetode pernapasan 4-7-8 dapat dicoba sebagai latihan sederhana untuk meredakan stres. Tarik napas selama 4 detik, tahan selama 7 detik, lalu hembuskan perlahan selama 8 detik. Dengan latihan rutin, teknik ini dapat membantu meningkatkan ketenangan dan kualitas hidup secara keseluruhan.`,
    },
    {
      userId: users[3]._id,
      image: "bahaya-duduk-terlalu-lama.jpg",
      title: "Bahaya Duduk Terlalu Lama bagi Kesehatan",
      date: "2022-10-04",
      type: "kesehatan",
      category: "Gaya Hidup Sehat",
      description: `Gaya hidup modern membuat banyak orang menghabiskan waktu berjam-jam dalam posisi duduk, terutama saat bekerja di depan komputer. Duduk terlalu lama dapat memperlambat metabolisme tubuh dan menyebabkan penumpukan lemak. Kondisi ini meningkatkan risiko obesitas dan gangguan kesehatan lainnya.
        \nSelain itu, duduk dalam waktu lama dapat menyebabkan nyeri punggung, leher, dan bahu akibat postur tubuh yang kurang baik. Sirkulasi darah juga dapat terganggu, yang berpotensi meningkatkan risiko penyakit jantung dan pembekuan darah. Dampak ini sering kali tidak disadari hingga menimbulkan keluhan serius.
        \nUntuk mengurangi risiko tersebut, disarankan untuk berdiri dan melakukan peregangan setiap 30–60 menit. Menggunakan meja kerja yang dapat diatur ketinggiannya dan rutin berjalan kaki juga dapat membantu. Perubahan kecil dalam rutinitas harian dapat memberikan manfaat besar bagi kesehatan jangka panjang.`,
    },
    {
      userId: users[3]._id,
      image: "manfaat-konsumsi-buah-dan-sayur.jpg",
      title: "Manfaat Konsumsi Buah dan Sayur Setiap Hari",
      date: "2022-09-20",
      type: "kesehatan",
      category: "Nutrisi",
      description: `Buah dan sayur merupakan sumber nutrisi penting yang kaya akan vitamin, mineral, serat, dan antioksidan. Nutrisi ini berperan dalam menjaga sistem kekebalan tubuh dan membantu tubuh melawan infeksi. Konsumsi buah dan sayur secara rutin juga dapat meningkatkan energi dan menjaga kesehatan kulit.
        \nSerat dalam sayuran hijau membantu melancarkan sistem pencernaan dan menjaga keseimbangan bakteri baik dalam usus. Antioksidan dalam buah-buahan seperti jeruk dan apel membantu melawan radikal bebas yang dapat merusak sel tubuh. Kombinasi nutrisi ini berperan penting dalam mencegah berbagai penyakit kronis.
        \nDisarankan untuk mengonsumsi setidaknya lima porsi buah dan sayur setiap hari. Variasikan jenis dan warna buah serta sayuran untuk mendapatkan manfaat nutrisi yang beragam. Dengan kebiasaan ini, tubuh akan lebih sehat dan terlindungi dari berbagai penyakit.`,
    },
    {
      userId: users[3]._id,
      image: "menjaga-kesehatan-jantung.jpg",
      title: "Pentingnya Menjaga Kesehatan Jantung Sejak Dini",
      date: "2022-10-25",
      type: "kesehatan",
      category: "Penyakit & Pencegahan",
      description: `Jantung merupakan organ vital yang berfungsi memompa darah dan oksigen ke seluruh tubuh. Menjaga kesehatan jantung sejak dini sangat penting untuk mencegah penyakit kardiovaskular di masa depan. Gaya hidup tidak sehat seperti merokok, kurang olahraga, dan konsumsi makanan tinggi lemak dapat meningkatkan risiko gangguan jantung.
        \nPola makan sehat yang kaya serat, rendah lemak jenuh, dan rendah garam dapat membantu menjaga kesehatan jantung. Selain itu, aktivitas fisik yang teratur dapat memperkuat otot jantung dan meningkatkan sirkulasi darah. Mengelola stres juga penting karena stres berlebih dapat memengaruhi tekanan darah.
        \nPemeriksaan kesehatan secara berkala dapat membantu mendeteksi risiko penyakit jantung lebih awal. Dengan menerapkan gaya hidup sehat dan kebiasaan yang baik, kesehatan jantung dapat terjaga hingga usia lanjut. Pencegahan sejak dini adalah langkah terbaik untuk hidup yang lebih sehat.`,
    },
    {
      userId: users[3]._id,
      image: "menjaga-sistem-imun.jpg",
      title: "Cara Menjaga Sistem Imun Agar Tetap Kuat",
      date: "2022-10-27",
      type: "kesehatan",
      category: "Imunitas",
      description: `Sistem imun berfungsi melindungi tubuh dari serangan bakteri, virus, dan patogen lainnya. Sistem kekebalan yang kuat membantu tubuh melawan infeksi dan mempercepat proses pemulihan saat sakit. Oleh karena itu, menjaga sistem imun merupakan bagian penting dari gaya hidup sehat.
        \nKonsumsi makanan bergizi yang kaya vitamin C, vitamin D, zinc, dan protein sangat penting untuk meningkatkan daya tahan tubuh. Tidur yang cukup dan olahraga teratur juga berperan dalam memperkuat sistem imun. Selain itu, menjaga kebersihan diri seperti mencuci tangan secara rutin dapat mencegah penyebaran penyakit.
        \nMengelola stres dan menjaga kesehatan mental juga berpengaruh terhadap sistem kekebalan tubuh. Stres berkepanjangan dapat menurunkan respons imun dan membuat tubuh lebih rentan terhadap penyakit. Dengan menerapkan pola hidup sehat secara konsisten, tubuh akan lebih siap melawan berbagai ancaman kesehatan.`,
    },
  ];

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return console.error("Gagal membaca folder:", err);
    }

    files.forEach((file) => {
      const filePath = path.join(uploadDir, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Gagal menghapus file ${file}:`, err);
        } else {
          console.log(`File ${file} berhasil dihapus`);
        }
      });
    });
  });

  const result = await Blog.deleteMany({});
  console.log(`Semua artikel berhasil dihapus. Total: ${result.deletedCount}`);

  for (const b of blogs) {
    var defaultPath = path.join(__dirname, "../default_images/pariwisata", b.image);
    if (b.type === "kesehatan") {
      defaultPath = path.join(__dirname, "../default_images/kesehatan", b.image);
    }

    const formattedName = `${Date.now()}-${b.image}`;
    const uploadPath = path.join(uploadDir, formattedName);

    fs.copyFileSync(defaultPath, uploadPath);

    await Blog.create({
      ...b,
      image: formattedName,
    });
  }

  console.log("Seeder artikel default berhasil dijalankan");
}

module.exports = seedBlogs;
