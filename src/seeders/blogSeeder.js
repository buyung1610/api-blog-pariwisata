const fs = require("fs");
const path = require("path");
const Blog = require("../models/blogModel");

async function seedBlogs() {
  const uploadDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const blogs = [
    {
      userId: "689c5192c77ff67f025ceaf7",
      image: "banda-neira.png",
      title: "Banda Neira",
      date: "2022-01-01",
      description: `Banda Tangah atau Banda Naira adalah salah satu pulau di Kepulauan Banda, dan merupakan pusat administratif Kecamatan Banda, Kabupaten Maluku Tengah, Maluku, Indonesia. Secara administratif, Banda Neira terbagi dalam 12 desa, yakni Dwiwarna, Kampung Baru, Merdeka, Nusantara, Rajawali,Tanah Rata, Lonthoir, Walang, Katoro, Kumber, Selamon, Dender, Waer dan Pulau Hatta.
        \nTopografi pulau ini cenderung datar, sehingga memungkinkan didirikannya kota kecil. Pulau Banda Neira memiliki kantor pemerintahan, toko, dermaga, dan bandara. Penduduk pulau ini berjumlah 14.000.
        \nBanda Neira pernah menjadi pusat perdagangan pala dan fuli (bunga pala) dunia, karena Kep. Banda adalah satu-satunya sumber rempah-rempah yang bernilai tinggi itu hingga pertengahan abad ke-19. Kota modernnya didirikan oleh anggota VOC, yang membantai penduduk Banda untuk mendapatkan palanya pada tahun 1621 dan membawa yang tersisa ke Batavia (kini Jakarta) untuk dijadikan budak.
        \nPulau ini juga terkenal sebagai tempat pembuangan tahanan politik pada masa Pemerintahan Kolonial Hindia Belanda. Beberapa tokoh perjuangan nasional yang pernah merasakan tinggal di pulau ini di antaranya Mohammad Hatta, Sutan Syahrir, dan Cipto Mangunkusumo. Pada 2016, rumah tempat Sutan Syahrir dan Mohammad Hatta tinggal telah dijadikan museum sedangkan rumah Cipto Mangkusumo masih dibiarkan kosong.
        `,
    },
    {
      userId: "689c5192c77ff67f025ceaf7",
      image: "borobudur.png",
      title: "Candi Borobudur",
      date: "2022-02-01",
      description: `Candi Borobudur adalah sebuah candi Buddha yang terletak di Borobudur, Magelang, Jawa Tengah, Indonesia. Candi ini terletak kurang lebih 100 km di sebelah barat daya Semarang, 86 km di sebelah barat Surakarta, dan 40 km di sebelah barat laut Yogyakarta. Candi dengan banyak stupa ini didirikan oleh para penganut agama Buddha Mahayana sekitar tahun 800-an Masehi pada masa pemerintahan wangsa Syailendra. Borobudur adalah candi atau kuil Buddha terbesar di dunia, sekaligus salah satu monumen Buddha terbesar di dunia.
        \nMonumen ini terdiri atas enam teras berbentuk bujur sangkar yang di atasnya terdapat tiga pelataran melingkar, pada dindingnya dihiasi dengan 2.672 panel relief dan aslinya terdapat 504 arca Buddha. Borobudur memiliki koleksi relief Buddha terlengkap dan terbanyak di dunia. Stupa utama terbesar terletak di tengah sekaligus memahkotai bangunan ini, dikelilingi oleh tiga barisan melingkar 72 stupa berlubang yang di dalamnya terdapat arca Buddha tengah duduk bersila dalam posisi teratai sempurna dengan mudra (sikap tangan) Dharmachakra mudra (memutar roda dharma).
        \nMonumen ini merupakan model alam semesta dan dibangun sebagai tempat suci untuk memuliakan Buddha sekaligus berfungsi sebagai tempat ziarah untuk menuntun umat manusia beralih dari alam nafsu duniawi menuju pencerahan dan kebijaksanaan sesuai ajaran Buddha.Para peziarah masuk melalui sisi timur dan memulai ritual di dasar candi dengan berjalan melingkari bangunan suci ini searah jarum jam, sambil terus naik ke undakan berikutnya melalui tiga tingkatan ranah dalam kosmologi Buddha. Ketiga tingkatan itu adalah Kāmadhātu (ranah hawa nafsu), Rupadhatu (ranah berwujud), dan Arupadhatu (ranah tak berwujud). Dalam perjalanannya para peziarah berjalan melalui serangkaian lorong dan tangga dengan menyaksikan tak kurang dari 1.460 panel relief indah yang terukir pada dinding dan pagar langkan.
        \nMenurut bukti-bukti sejarah, Borobudur ditinggalkan pada abad ke-10 seiring dipindahkannya pusat Kerajaan Mataram Kuno ke Jawa Timur oleh Mpu Sindok.Dunia mulai menyadari keberadaan bangunan ini sejak ditemukan 1814 oleh Sir Thomas Stamford Raffles, yang saat itu menjabat sebagai Gubernur Jenderal Inggris atas Jawa. Sejak saat itu Borobudur telah mengalami serangkaian upaya penyelamatan dan pemugaran (perbaikan kembali). Proyek pemugaran terbesar digelar pada kurun waktu 1975 hingga 1982 atas upaya Pemerintah Republik Indonesia dan UNESCO, kemudian situs bersejarah ini masuk dalam daftar Situs Warisan Dunia.
        `,
    },
    {
      userId: "689c5192c77ff67f025ceaf7",
      image: "bromo.png",
      title: "Gunung Bromo",
      date: "2022-03-01",
      description: `Indonesia, negara kepulauan yang kaya akan keindahan alamnya, memiliki sejumlah gunung berapi yang menakjubkan, salah satunya adalah Gunung Bromo. Terletak di Taman Nasional Bromo Tengger Semeru, Jawa Timur, Gunung Bromo telah menjadi daya tarik utama bagi wisatawan domestik dan mancanegara. Dengan ketinggian sekitar 2.329 meter di atas permukaan laut, Gunung Bromo adalah salah satu gunung berapi paling aktif di Indonesia. Pemandangan kawah yang luas dengan latar belakang langit biru dan awan putih telah menjadi pemandangan ikonik yang memikat banyak pengunjung. Tidak hanya terbatas pada kawahnya, kawasan sekitarnya juga menawarkan panorama alam yang memukau, termasuk lautan pasir serta dikelilingi oleh pegunungan hijau yang menjulang.
        \nTaman Nasional Bromo Tengger Semeru juga dikenal karena keberadaan masyarakat Tengger yang menjalankan tradisi dan ritual unik. Salah satunya adalah upacara Kasada yang dilakukan setiap tahun pada bulan purnama di tengah-tengah kawah Gunung Bromo. Dalam upacara ini, masyarakat Tengger memberikan persembahan kepada Sang Hyang Widhi (Tuhan Yang Maha Esa) sebagai tanda syukur atas panen yang melimpah. Ritual ini menarik perhatian banyak wisatawan yang ingin menyaksikan keunikan budaya lokal.
        \nSelain pendakian, terdapat beragam kegiatan wisata lain yang dapat dinikmati di sekitar Gunung Bromo. Wisatawan dapat menikmati perjalanan menunggang kuda melintasi lautan pasir, mengunjungi Pura Luhur Poten yang berada di kaki Gunung Bromo, atau sekedar menikmati matahari terbit yang memukau dari puncak Penanjakan. Tidak ketinggalan untuk Anda yang gemar berswafoto, Gunung Bromo memiliki berbagai tempat dan pemandangan menakjubkan yang layak untuk diabadikan.
        `,
    },
    {
      userId: "689c5192c77ff67f025ceaf7",
      image: "nusa-penida.png",
      title: "Nusa Penida",
      date: "2022-04-01",
      description: `Nusa Penida adalah sebuah pulau bagian dari Kabupaten Klungkung, Bali, Indonesia yang terletak di sebelah tenggara Bali yang dipisahkan oleh Selat Badung. Di dekat pulau ini terdapat juga pulau-pulau kecil lainnya yaitu Nusa Ceningan dan Nusa Lembongan. Perairan pulau Nusa Penida terkenal dengan kawasan selamnya di antaranya terdapat di Crystal Bay, Manta Point, Batu Meling, Batu Lumbung, Batu Abah, Toyapakeh dan Malibu Point.
        \nSejarah pulau Nusa Penida di Bali dimulai pada abad ke-10. Tulisan-tulisan paling awal tentang Nusa Penida memang telah ditemukan di Pilar Belanjong, yang berasal dari tahun 914 M. Pilar ini memuat prasasti yang menyebutkan ekspedisi militer Raja Bali pertama, Sri Kesari Warmadewa, menaklukan Nusa Penida.
        \nMasyarakat Nusa Penida sudah lama mampu melawan raja-raja Bali yang banyak mengorganisir ekspedisi militer lainnya. Namun, pada paruh kedua abad ke-17, pulau Nusa Penida pasti ditaklukkan oleh ekspedisi Dinasti Gelgel. Raja terakhir Nusa Penida, Dalem Bungkut, tewas dalam pertempuran.
        \nNusa Penida kemudian menjadi bagian dari istana Klungkung, salah satu dari sembilan kerajaan di Bali. Setelah integrasi Bali ke Hindia Belanda pada tahun 1908 yang kemudian menjadi Indonesia kemudian, Nusa Penida tetap melekat pada Kabupaten Klungkung.
        \nSebuah peta Belanda yang dibuat pada tahun 1900 menyebut Nusa Penida sebagai Pulau Bandit Karena dulu Kerajaan Klungkung pernah mendeportasi penjahat, lawan politik dan ahli ilmu hitam ke Nusa Penida.
        `,
    },
    {
      userId: "689c5192c77ff67f025ceaf7",
      image: "ranu-gumbolo.png",
      title: "Ranu Gumbolo",
      date: "2022-05-01",
      description: `Ranu Kumbolo (bahasa Indonesia: Danau Kumbolo) adalah sebuah danau kawah (maar) yang terletak di dalam Taman Nasional Bromo Tengger Semeru (TNBTS), Jawa Timur, Indonesia. Danau ini merupakan bagian dari rute termudah pendakian yang berawal dari Ranu Pani menuju puncak Gunung Semeru. Dengan luas 12 hektare, Ranu Kumbolo menjadi danau terbesar dan terindah dari semua danau dalam kawasan TNBTS.
        \nRanu Kumbolo merupakan sebuah danau vulkanik, tepatnya bekas kawah letusan gunung yang digenangi air (disebut maar) yang merupakan bagian dari kompleks pegunungan vulkanik Tengger-Semeru. Pegunungan ini terdiri atas beberapa kaldera dan kerucut-kerucut vulkanik (gunung), yang membentang sepanjang sumbu utara-selatan sejauh lk. 25 km di tengah-tengah daratan Jawa Timur. Berderet mulai dari sebelah utara adalah Kaldera Tengger, Kaldera Jambangan, Kaldera Ajek-Ajek, Gunung Kepolo, dan paling selatan adalah kerucut vulkanik ganda Mahameru-Semeru.
        \nRanu Kumbolo, yang terletak di sudut Kaldera Jambangan, adalah satu dari empat buah danau kawah yang tersebar terpencar-pencar di kompleks pegunungan tersebut; tiga yang lain adalah Ranu Pani, Ranu Regulo, dan Ranu Darungan.Kompleks vulkanik ini diperkirakan terbangun selama kala Oligosen hingga Miosen.
        `,
    },
    {
      userId: "689c5192c77ff67f025ceaf7",
      image: "raja-ampat.jpg",
      title: "Raja Ampat",
      date: "2022-06-01",
      description: `Kabupaten Raja Ampat adalah salah satu kabupaten di provinsi Papua Barat Daya, Indonesia. Ibukota kabupaten ini terletak di Waisai, di mana Waisai menjadi pusat pemerintahan Kabupaten Raja Ampat. Kabupaten ini memiliki 610 pulau, termasuk kepulauan Raja Ampat. Empat di antaranya, yakni Pulau Misool, Salawati, Batanta dan Waigeo, merupakan pulau-pulau besar. Dari seluruh pulau hanya 35 pulau yang berpenghuni sedangkan pulau lainnya tidak berpenghuni dan sebagian besar belum memiliki nama. Kabupaten ini memiliki total luas 67.379,60 km² dengan rincian luas daratan 7.559,60 km² dan luas lautan 59.820,00 km².
        \nMenurut cerita mitos masyarakat asli Raja Ampat, pada suatu hari seorang wanita menemukan tujuh telur, empat diantaranya berubah menjadi pangeran dan tiga sisanya menjadi seorang wanita, hantu, dan sebuah batu. Keempat pangeran tadi berpisah lalu masing-masing berkuasa di Waigeo (Wawiyai), Salawati (Samate), Misool Barat (Waigama) dan Misool Timur (Lilinta). Sedangkan kerajaan di Salawati selatan di Sailolof didirikan oleh fun Mo, seorang suku Moi yang juga berasal dari telur burung baikole, menikah dengan putri raja Waigeo, Pinfun Libit.
        \nDilihat dari sisi sejarah, Kepulauan Raja Ampat di abad ke-15 merupakan bagian dari kekuasaan Kesultanan Tidore, sebuah kerajaan besar yang berpusat di Kepulauan Maluku setelah sebelumnya wilayah ini berhubungan dengan Kesultanan Bacan. Setelah ekspansi melalui hubungannya dengan Gurabesi, Sultan Tidore menjalankan pemerintahan dan memungut upeti dari wilayah ini melalui raja-raja lokal yang berkuasa di Waigeo, Salawati, Misool, dan Waigama. Sedangkan Sailolof yang pendirinya tidak memiliki hubungan darah dengan kerajaan lain juga memiliki hubungan yang sama dengan Tidore.
        \nIstilah 4 orang Raja (Waigama jika menurut sudut pandang Tidore atau Sailolof jika menurut sudut pandang lokal) dalam yang memerintah di gugusan kepulauan itulah yang menjadi awal dari nama Kalana Fat atau Raja Ampat.
        `,
    },
    {
      userId: "689c5192c77ff67f025ceaf7",
      image: "kawah-ijen.jpg",
      title: "Kawah Ijen",
      date: "2022-07-01",
      description: `Gunung Ijen adalah sebuah gunung berapi yang terletak di perbatasan Kabupaten Banyuwangi dan Kabupaten Bondowoso, Jawa Timur, Indonesia. Gunung ini memiliki ketinggian 2.386 mdpl. Gunung Ijen terakhir meletus pada tahun 1999. Salah satu fenomena alam yang paling terkenal dari Gunung Ijen adalah blue fire (api biru) di dalam kawah yang terletak di puncak gunung tersebut. Blue fire ini hanya dapat ditemukan di dunia negara didunia ini yaitu salah satunya bertepatan Banyuwangi. Pendakian gunung ini bisa dimulai dari dua tempat, yakni dari Banyuwangi atau dari Bondowoso.
        \nKawah Ijen adalah sebuah danau kawah yang bersifat asam yang berada di puncak Gunung Ijen dengan kedalaman danau 200 meter dan luas kawah mencapai 5.466 Hektar. Danau kawah Ijen dikenal merupakan danau air asam kuat terbesar di dunia. Kawah Ijen berada dalam wilayah Cagar Alam Taman Wisata Ijen Kabupaten Bondowoso dan Kabupaten Banyuwangi, Jawa Timur. Fenomena eternal blue fire atau api biru abadi berada di dalam kawah Ijen, dan pemandangan alami ini hanya terjadi di dua tempat di dunia yaitu Etiopia (gunung Dallol) dan Ijen. 
        \nBlue fire hanya dapat dilihat oleh mata manusia saat tidak ada cahaya, karenanya waktu ideal untuk melihatnya adalah jam 2 hingga jam 4 dini hari, karena pendakian Gunung Ijen baru mulai dibuka jam 2 dini hari. Dari Kawah Ijen, kita dapat melihat pemandangan gunung lain yang ada di kompleks Pegunungan Ijen, di antaranya adalah puncak Gunung Marapi yang berada di timur Kawah Ijen, Gunung Raung, Gunung Suket, dan Gunung Rante.
        \nKawah Ijen menunjukkan jenis fitur vulkanik khusus yang umum di Indonesia, dengan diameter sekitar 1 kilometer dan kedalaman 175 meter. Lantainya ditutupi sepenuhnya oleh danau yang hangat, berwarna hijau biru susu yang ditahan oleh bendungan yang dibangun bertahun-tahun yang lalu oleh Belanda, untuk menjaga air panas yang sarat mineral dari hujan tanah tanaman di bawahnya. Suhu turun pada malam hari, di dekat bibir kawah bisa turun menjadi sekitar 5 ° Celcius. Jalan tersebut berakhir di Jampit, di mana tersedia tempat berlindung yang sangat mendasar. Dimungkinkan juga untuk tidur di stasiun vulkanologi tua di atas bukit, sekarang digunakan oleh pengumpul belerang, tetapi izin harus diperoleh sebelumnya.
      `,
    },
    {
      userId: "689c5192c77ff67f025ceaf7",
      image: "danau-toba.jpg",
      title: "Danau Toba",
      date: "2022-08-01",
      description: `Danau Toba adalah danau alami terbesar di Sumatera Utara, Indonesia yang terletak di kaldera gunung supervulkan. Danau ini memiliki panjang 100 kilometer (62 mil), lebar 30 kilometer (19 mi), dan kedalaman 508 meter (1.667 ft). Danau ini terletak di tengah pulau Sumatra bagian utara dengan ketinggian permukaan sekitar 900 meter (2.953 ft). Danau ini membentang dari. Danau Toba merupakan danau terbesar di Indonesia sekaligus danau vulkanik terbesar di dunia.
        \nDanau Toba terbentuk akibat dari letusan gunung berapi super masif berkekuatan VEI 8 sekitar 69.000 hingga 77.000 tahun yang lalu hal ini kemudian memicu perubahan iklim global. Metode penanggalan terkini yang berakurat menetapkan letusan tersebut terjadi sekitar 74.000 tahun yang lalu. Letusan ini merupakan letusan eksplosif terbesar di Bumi dalam 25 juta tahun terakhir. Menurut teori bencana Toba, letusan ini berdampak besar bagi populasi manusia di seluruh dunia; dampak letusan menewaskan sebagian besar manusia yang hidup waktu itu dan diyakini menyebabkan penyusutan populasi di Afrika Timur-Tengah dan India sehingga memengaruhi genetika populasi manusia di seluruh dunia sampai sekarang.
        \nPara ilmuwan sepakat bahwa letusan Toba memicu musim dingin vulkanik yang menyebabkan jatuhnya suhu dunia antara 3 hingga 5 °C (5,4 hingga 9,0 °F), dan hingga 15 °C (27 °F) di daerah lintang atas. Penelitian lanjutan di Danau Malawi, Afrika Timur, menemukan endapan debu letusan Toba, tetapi tidak menemukan bukti perubahan iklim besar di Afrika Timur.[7]
      `,
    },
    {
      userId: "689c5192c77ff67f025ceaf7",
      image: "gua-jomblang.jpg",
      title: "Goa Jomblang",
      date: "2022-09-01",
      description: `Gua Jomblang merupakan gua vertikal yang bertipe collapse doline yang juga menjadi objek wisata di Kabupaten Gunungkidul, Daerah Istimewa Yogyakarta. Gua ini terbentuk akibat proses geologi amblasnya tanah beserta vegetasi yang ada di atasnya ke dasar bumi yang terjadi ribuan tahun lalu. Runtuhan ini membentuk sinkhole atau sumuran yang dalam bahasa Jawa dikenal dengan istilah luweng. Itulah yang membuat unik karena di dalam gua terdapat luas mulut gua sekitar 50 meter ini sering disebut dengan nama Luweng Jomblang.
        \nSaat ini Gua Jomblang merupakan tempat konservasi tumbuhan purba dan dikembangkan menjadi tempat wisata minat khusus yang mana dikelola oleh penduduk atau warga setempat. Untuk menuruni gua vertikal ini pihak pengelola sudah menyediakan perlengkapan lengkap sesuai standar keselamatan caving di gua vertikal.
        \nSinar matahari yang menerobos masuk dari Luweng Grubug setinggi 90 meter membentuk satu tiang cahaya, menyinari flowstone yang indah serta kedalaman gua yang gelap gulita. Air yang menetes dari ketinggian turut mempercantik pemandangan. Tidak salah jika banyak fotografer yang berburu foto di dalam goa ini.
      `,
    },
    {
      userId: "689c5192c77ff67f025ceaf7",
      image: "gunung-rinjani.jpg",
      title: "Gunung Rinjani",
      date: "2022-10-01",
      description: `Gunung Rinjani adalah gunung yang berlokasi di Pulau Lombok, Nusa Tenggara Barat. Gunung ini merupakan gunung berapi kedua tertinggi di Indonesia dengan ketinggian 3.726 mdpl serta terletak pada lintang 8º25' LS dan 116º28' BT ini merupakan gunung favorit bagi pendaki Indonesia karena keindahan pemandangannya. Gunung ini merupakan bagian dari Taman Nasional Gunung Rinjani yang memiliki luas sekitar 41.330 ha dan diusulkan penambahannya sehingga menjadi 76.000 ha ke arah barat dan timur.
        \nGunung Rinjani merupakan penerus dari Gunung Samalas yang pernah meletus tahun 1257 pada masa Holosen di Indonesia, yang mengakibatkan penurunan suhu global, gagal panen dan hancurnya kerajaan pamatan di wilayah Pulau Lombok. Secara administratif gunung ini berada dalam wilayah tiga kabupaten: Lombok Timur, Lombok Tengah, dan Lombok Utara.
        \nGunung Rinjani memiliki titik tertinggi 3.726 mdpl, mendominasi sebagian besar pemandangan Pulau Lombok bagian utara.Di sebelah barat kerucut Rinjani terdapat kaldera dengan luas sekitar 3.500 m × 4.800 m, memanjang kearah timur dan barat. Di kaldera ini terdapat Segara Anak (segara dalam Bahasa Sasak berarti laut atau danau) seluas 11.000.000 m persegi dengan kedalaman 230 m. Air yang mengalir dari danau ini membentuk air terjun yang mengalir melewati jurang yang curam. Di Segara Anak banyak terdapat ikan mas dan mujair sehingga sering digunakan untuk memancing. Bagian selatan danau ini disebut dengan Segara Endut.
        \nDi sisi timur kaldera terdapat Gunung Baru (atau Gunung Barujari) yang memiliki kawah berukuran 170m×200 m dengan ketinggian 2.296 – 2376 m dpl. Gunung kecil ini terakhir meletus pada tanggal 25 Oktober 2015 dan 3 November 2015,setelah sebelumnya tercatat meletus Mei 2009 dan pada tahun 2004. Letusan tahun 2009 ini memakan korban jiwa tidak langsung 31 orang, karena banjir bandang pada Kokok (Sungai) Tanggek akibat desakan lava ke Segara Anak. Sebelumnya, Gunung Barujari pernah tercatat meletus pada tahun 1944 (sekaligus pembentukannya), 1966, dan 1994.
      `,
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
    const defaultPath = path.join(__dirname, "../default_images", b.image);

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
